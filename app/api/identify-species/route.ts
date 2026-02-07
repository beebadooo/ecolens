import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { GROQ_CONFIG, getSpeciesIdentificationPrompt } from '@/lib/groq-config'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json()

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured' },
        { status: 500 }
      )
    }

    // Get the species identification prompt from config
    const prompt = getSpeciesIdentificationPrompt()

    // Call Groq API to identify species
    const message = await groq.messages.create({
      model: GROQ_CONFIG.model,
      max_tokens: GROQ_CONFIG.speciesIdentification.maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse the JSON response
    let speciesData
    try {
      // Remove any markdown code blocks if present
      const cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      speciesData = JSON.parse(cleanedResponse)
    } catch (e) {
      // If parsing fails, return a structured error
      console.error('Failed to parse Groq response:', responseText)
      return NextResponse.json(
        {
          error: 'Failed to identify species',
          details: 'Could not parse AI response',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(speciesData)
  } catch (error) {
    console.error('Error in species identification:', error)

    return NextResponse.json(
      {
        error: 'Failed to identify species',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

import { Groq } from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { GROQ_CONFIG, getSpeciesIdentificationPrompt } from '@/lib/groq-config'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

/**
 * Detect image format from base64 string signature
 */
function detectImageMediaType(base64String: string): 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' {
  try {
    // Decode first few bytes to check signature
    const binaryString = Buffer.from(base64String, 'base64').toString('binary')
    
    // Check file signatures (magic numbers)
    if (binaryString.charCodeAt(0) === 0xff && binaryString.charCodeAt(1) === 0xd8) {
      return 'image/jpeg'
    }
    if (binaryString.charCodeAt(0) === 0x89 && 
        binaryString.charCodeAt(1) === 0x50 &&
        binaryString.charCodeAt(2) === 0x4e &&
        binaryString.charCodeAt(3) === 0x47) {
      return 'image/png'
    }
    if (binaryString.charCodeAt(0) === 0x47 &&
        binaryString.charCodeAt(1) === 0x49 &&
        binaryString.charCodeAt(2) === 0x46) {
      return 'image/gif'
    }
    if (binaryString.charCodeAt(0) === 0x52 &&
        binaryString.charCodeAt(1) === 0x49 &&
        binaryString.charCodeAt(2) === 0x46 &&
        binaryString.charCodeAt(3) === 0x46) {
      return 'image/webp'
    }
  } catch (e) {
    console.log('[v0] Could not detect image type from signature, defaulting to JPEG')
  }
  
  // Default to JPEG if detection fails
  return 'image/jpeg'
}

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

    // Validate and clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/[^;]+;base64,/, '').trim()
    
    if (!cleanBase64) {
      return NextResponse.json(
        { error: 'Invalid image data format' },
        { status: 400 }
      )
    }

    // Detect image format from base64 signature
    const mediaType = detectImageMediaType(cleanBase64)
    console.log('[v0] Detected media type:', mediaType)

    // Get the species identification prompt from config
    const prompt = getSpeciesIdentificationPrompt()

    // Call Groq API to identify species with the actual image
    const message = await groq.messages.create({
      model: GROQ_CONFIG.model,
      max_tokens: GROQ_CONFIG.speciesIdentification.maxTokens,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: cleanBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
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
      console.error('[v0] Failed to parse Groq response:', responseText)
      console.error('[v0] Parse error details:', e)
      return NextResponse.json(
        {
          error: 'Failed to identify species',
          details: 'Could not parse AI response',
        },
        { status: 500 }
      )
    }

    console.log('[v0] Species identification successful:', speciesData.species_name)
    return NextResponse.json(speciesData)
  } catch (error) {
    console.error('[v0] Error in species identification:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = error instanceof Error ? error.stack : String(error)
    
    console.error('[v0] Full error details:', errorDetails)

    return NextResponse.json(
      {
        error: 'Failed to identify species',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

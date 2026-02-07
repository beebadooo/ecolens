import { NextRequest, NextResponse } from 'next/server'

/**
 * Species identification database (mock data for testing)
 * In production, this would call an actual vision API like Claude, Gemini, or OpenAI Vision
 */
const speciesDatabase = [
  {
    species_name: 'Bengal Tiger',
    scientific_name: 'Panthera tigris tigris',
    type: 'Mammal',
    description:
      'The Bengal tiger is the most common tiger subspecies found in the Indian subcontinent. Known for their distinctive orange coat with black stripes, they are apex predators in their ecosystem.',
    habitat: 'Tropical forests, mangrove swamps, grasslands, and riverine areas',
    conservation_status: 'Endangered',
    population_trend: 'Increasing',
    estimated_population: 'Approximately 2,600 in the wild',
    threats: ['Habitat loss', 'Poaching', 'Human-wildlife conflict', 'Prey depletion'],
    confidence: 95,
  },
  {
    species_name: 'African Elephant',
    scientific_name: 'Loxodonta africana',
    type: 'Mammal',
    description:
      'The African elephant is the largest land animal on Earth. They are highly intelligent, social animals that play a crucial role in their ecosystem by dispersing seeds.',
    habitat: 'Savannas, grasslands, woodlands, and forests',
    conservation_status: 'Vulnerable',
    population_trend: 'Decreasing',
    estimated_population: 'Approximately 415,000 in the wild',
    threats: ['Poaching for ivory', 'Habitat loss', 'Human-elephant conflict', 'Climate change'],
    confidence: 92,
  },
  {
    species_name: 'Giant Panda',
    scientific_name: 'Ailuropoda melanoleuca',
    type: 'Mammal',
    description:
      'The giant panda is one of the most recognizable and endangered animals in the world. Endemic to China, they have become a symbol of wildlife conservation efforts.',
    habitat: 'Bamboo forests in mountainous regions',
    conservation_status: 'Vulnerable',
    population_trend: 'Increasing',
    estimated_population: 'Approximately 1,864 in the wild',
    threats: ['Habitat fragmentation', 'Low birth rate', 'Poaching', 'Bamboo shortage'],
    confidence: 88,
  },
  {
    species_name: 'Blue Whale',
    scientific_name: 'Balaenoptera musculus',
    type: 'Mammal',
    description:
      'The blue whale is the largest animal ever known to have existed. Despite their massive size, they feed on tiny krill, making them fascinating marine creatures.',
    habitat: 'Open oceans, polar and temperate waters',
    conservation_status: 'Endangered',
    population_trend: 'Increasing',
    estimated_population: 'Approximately 10,000-25,000 in the wild',
    threats: ['Ship strikes', 'Ocean noise pollution', 'Fishing nets', 'Climate change'],
    confidence: 90,
  },
  {
    species_name: 'Scarlet Macaw',
    scientific_name: 'Ara macao',
    type: 'Bird',
    description:
      'The scarlet macaw is one of the largest flying parrot species, known for its vibrant red, yellow, and blue plumage. They are social birds that mate for life.',
    habitat: 'Tropical rainforests and woodland areas',
    conservation_status: 'Least Concern',
    population_trend: 'Stable',
    estimated_population: 'Unknown - presumed abundant',
    threats: ['Habitat loss', 'Illegal pet trade', 'Deforestation'],
    confidence: 93,
  },
  {
    species_name: 'Poison Dart Frog',
    scientific_name: 'Dendrobatidae',
    type: 'Amphibian',
    description:
      'Poison dart frogs are small, brightly colored frogs that use their toxins as a defense mechanism. Their vibrant colors serve as a warning to predators.',
    habitat: 'Tropical rainforests, primarily on the forest floor',
    conservation_status: 'Vulnerable',
    population_trend: 'Decreasing',
    estimated_population: 'Unknown - declining',
    threats: ['Habitat loss', 'Climate change', 'Fungal diseases', 'Pet trade'],
    confidence: 85,
  },
]

/**
 * Analyze image hash to return consistent identification
 */
function analyzeImageHash(imageBase64: string): (typeof speciesDatabase)[0] {
  // Create a simple hash from the image data for testing consistency
  let hash = 0
  for (let i = 0; i < Math.min(imageBase64.length, 100); i++) {
    const char = imageBase64.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  const index = Math.abs(hash) % speciesDatabase.length
  return speciesDatabase[index]
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

    // Validate and clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/[^;]+;base64,/, '').trim()

    if (!cleanBase64) {
      return NextResponse.json(
        { error: 'Invalid image data format' },
        { status: 400 }
      )
    }

    console.log('[v0] Processing image for species identification, size:', cleanBase64.length)

    // For now, use image hash to select a species from database
    // In production, replace this with actual vision API call (Claude, Gemini, OpenAI Vision, etc.)
    const speciesData = analyzeImageHash(cleanBase64)

    console.log('[v0] Species identified:', speciesData.species_name)

    return NextResponse.json(speciesData)
  } catch (error) {
    console.error('[v0] Error in species identification:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Failed to identify species',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

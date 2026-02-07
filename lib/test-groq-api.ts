/**
 * Groq API Testing Utility
 * Use this file to test the species identification API
 */

export async function testSpeciesIdentificationAPI(
  imageBase64: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    console.log('[v0] Testing species identification API...')

    const response = await fetch('/api/identify-species', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[v0] API Error:', errorData)
      return {
        success: false,
        error: errorData.error || 'API request failed',
      }
    }

    const data = await response.json()
    console.log('[v0] API Response:', data)

    // Validate response structure
    const requiredFields = [
      'species_name',
      'scientific_name',
      'type',
      'description',
      'habitat',
      'conservation_status',
      'population_trend',
      'estimated_population',
      'threats',
      'confidence',
    ]

    const missingFields = requiredFields.filter((field) => !(field in data))

    if (missingFields.length > 0) {
      console.warn('[v0] Missing fields in response:', missingFields)
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[v0] Test failed:', errorMessage)
    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Test API connectivity and configuration
 */
export async function testAPIConnectivity(): Promise<{
  connected: boolean
  apiKeyConfigured: boolean
  error?: string
}> {
  try {
    // Try to make a simple request to check if API is working
    const response = await fetch('/api/identify-species', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64: '', // Empty for connectivity test
      }),
    })

    // Check if we get a 400 (bad request) which means API is running
    // or 500 which might mean missing API key
    if (response.status === 400) {
      return {
        connected: true,
        apiKeyConfigured: true,
      }
    }

    if (response.status === 500) {
      const data = await response.json()
      if (data.error?.includes('GROQ_API_KEY')) {
        return {
          connected: true,
          apiKeyConfigured: false,
          error: 'GROQ_API_KEY is not configured',
        }
      }
    }

    return {
      connected: false,
      apiKeyConfigured: false,
      error: 'Unable to connect to API',
    }
  } catch (error) {
    return {
      connected: false,
      apiKeyConfigured: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Load and convert image file to base64
 */
export async function imageFileToBase64(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Format species data for display
 */
export function formatSpeciesData(data: any): string {
  const lines = [
    `Species: ${data.species_name}`,
    `Scientific Name: ${data.scientific_name}`,
    `Type: ${data.type}`,
    `Confidence: ${data.confidence}%`,
    `Conservation Status: ${data.conservation_status}`,
    `Population Trend: ${data.population_trend}`,
    `Estimated Population: ${data.estimated_population}`,
    `Habitat: ${data.habitat}`,
    `Description: ${data.description}`,
    `Threats: ${data.threats.join(', ')}`,
  ]
  return lines.join('\n')
}

/**
 * Groq Configuration
 * Centralized configuration for Groq API integration
 */

export const GROQ_CONFIG = {
  // Model selection
  model: 'mixtral-8x7b-32768',
  
  // Available models with their characteristics
  availableModels: {
    'mixtral-8x7b-32768': {
      name: 'Mixtral 8x7B',
      type: 'Fast & Powerful',
      maxTokens: 32768,
      bestFor: 'General tasks, detailed analysis',
    },
    'llama-2-70b-chat': {
      name: 'Llama 2 70B Chat',
      type: 'Large & Accurate',
      maxTokens: 4096,
      bestFor: 'Conversational, detailed responses',
    },
    'llama-2-13b-chat': {
      name: 'Llama 2 13B Chat',
      type: 'Fast & Efficient',
      maxTokens: 4096,
      bestFor: 'Quick responses, cost-effective',
    },
    'gemma-7b-it': {
      name: 'Gemma 7B',
      type: 'Lightweight',
      maxTokens: 8192,
      bestFor: 'Simple tasks, fast inference',
    },
  },

  // Species identification specific settings
  speciesIdentification: {
    maxTokens: 1024,
    temperature: 0.7,
    topP: 1,
    stop: null,
  },

  // API timeouts (in milliseconds)
  timeouts: {
    request: 30000, // 30 seconds
    connection: 5000, // 5 seconds
  },

  // Response parsing
  parsing: {
    removeMarkdown: true, // Remove markdown code blocks from response
    validateJSON: true, // Validate response is valid JSON
    strictMode: true, // Require all fields in response
  },
}

/**
 * Get the species identification prompt
 */
export function getSpeciesIdentificationPrompt(): string {
  return `You are an expert wildlife biologist and species identifier. Analyze the provided image and identify the species present.

Return ONLY a valid JSON object (no markdown, no code blocks) with the following structure:
{
  "species_name": "Common name of the species",
  "scientific_name": "Scientific binomial name",
  "type": "Animal/Plant/Insect/Bird/Reptile/Amphibian/Fish/Fungi/etc",
  "description": "A 2-3 sentence description of the species",
  "habitat": "Primary habitats where this species is found",
  "conservation_status": "Least Concern / Vulnerable / Endangered / Critically Endangered / Extinct in the Wild",
  "population_trend": "Increasing / Stable / Decreasing / Unknown",
  "estimated_population": "Estimated global population or 'Unknown'",
  "threats": ["Threat 1", "Threat 2", "Threat 3"],
  "confidence": 85
}

Important:
- If you cannot identify a species, return confidence: 0
- If the image doesn't contain a living organism, return confidence: 0 with species_name: "Not Identifiable"
- Threats should be an array of 2-4 main threats to the species
- Return ONLY the JSON object, nothing else`
}

/**
 * Format the species data for display
 */
export interface SpeciesIdentificationResult {
  species_name: string
  scientific_name: string
  type: string
  description: string
  habitat: string
  conservation_status: string
  population_trend: string
  estimated_population: string
  threats: string[]
  confidence: number
}

/**
 * Get default/fallback species data structure
 */
export function getDefaultSpeciesData(): SpeciesIdentificationResult {
  return {
    species_name: 'Unknown Species',
    scientific_name: 'Unknown',
    type: 'Unknown',
    description: 'Unable to identify species from the provided image.',
    habitat: 'Unknown',
    conservation_status: 'Unknown',
    population_trend: 'Unknown',
    estimated_population: 'Unknown',
    threats: [],
    confidence: 0,
  }
}

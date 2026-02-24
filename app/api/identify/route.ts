import { NextRequest, NextResponse } from 'next/server';
import { identifySpeciesWithHuggingFace } from '@/lib/huggingface';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type;

        // Call the Hugging Face-based function
        const hfResult = await identifySpeciesWithHuggingFace(buffer, mimeType);

        // Map Hugging Face result fields to the shape expected by the client
        const result = {
            name: hfResult.species_name || 'Unknown',
            scientificName: hfResult.scientific_name || 'Unknown',
            description: hfResult.description || 'No description available',
            habitat: hfResult.habitat || 'Unknown',
            conservation: hfResult.conservation_status || 'Unknown',
            population: hfResult.estimated_population || hfResult.population_trend || 'Unknown',
            threats: Array.isArray(hfResult.threats) ? hfResult.threats : [],
            confidence: typeof hfResult.confidence === 'number' ? hfResult.confidence : 0,
        };

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to identify species' },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { identifySpecies } from '@/lib/gemini';

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

        // Call the Gemini function
        const result = await identifySpecies(buffer, mimeType);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to identify species' },
            { status: 500 }
        );
    }
}

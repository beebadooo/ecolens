import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function identifySpecies(
    imageBuffer: Buffer,
    mimeType: string
) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest",
        });

        const prompt = `
Analyze this image and identify the animal or plant species.
Return a strict JSON object with these exact keys:
{
    "species_name": "Common Name",
    "scientific_name": "Scientific Name",
    "description": "A 2-sentence summary of what this species is.",
    "habitat": "Short list of habitats",
    "conservation_status": "e.g. Endangered",
    "population": "e.g. Approximately 2,600 in the wild",
    "threats": ["Threat 1", "Threat 2", "Threat 3"]
}
`;

        // ✅ THIS WAS MISSING
        const imagePart = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType,
            },
        };

        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [
                    { text: prompt },
                    imagePart
                ]
            }]
        });
        const response = await result.response;
        const text = response.text();

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini error:", error);
        throw error;
    }
}

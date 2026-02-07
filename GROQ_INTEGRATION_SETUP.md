# Groq API Integration Guide

## Overview
EcoLens now integrates with **Groq's powerful AI models** to identify species from images with detailed information including scientific names, conservation status, habitat, threats, and population trends.

## Setup Instructions

### 1. Get Your Groq API Key
- Visit [console.groq.com](https://console.groq.com)
- Sign up or log in to your Groq account
- Navigate to API Keys section
- Create a new API key
- Copy the key (you'll need it in the next step)

### 2. Add Environment Variables
Add the following environment variable to your project:

```bash
GROQ_API_KEY=your_api_key_here
```

**Where to add it:**
- **Local Development**: Create or update `.env.local` file in your project root
- **Vercel Deployment**: Add it in Vercel dashboard → Settings → Environment Variables

### 3. Install Dependencies
The `groq-sdk` package has been added to `package.json`. Install it:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 4. Verify the Integration

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the **Recognize** page (`/recognize`)

3. Upload or take a photo of a species

4. Click "Identify Species" to test the API integration

## API Endpoint

**Route**: `/api/identify-species`
**Method**: `POST`
**Content-Type**: `application/json`

### Request Body
```json
{
  "imageBase64": "base64_encoded_image_data"
}
```

### Response Format
```json
{
  "species_name": "Bengal Tiger",
  "scientific_name": "Panthera tigris tigris",
  "type": "Animal",
  "description": "The Bengal tiger is a tiger population native to the Indian subcontinent...",
  "habitat": "Tropical forests, mangrove swamps, grasslands",
  "conservation_status": "Endangered",
  "population_trend": "Stable",
  "estimated_population": "Approximately 2,600 in the wild",
  "threats": ["Habitat loss", "Poaching", "Human-wildlife conflict"],
  "confidence": 85
}
```

## Groq Model Used

**Current Model**: `mixtral-8x7b-32768`
- Fast inference
- Good for detailed text generation
- Cost-effective

**Alternative Models Available**:
- `llama-2-70b-chat`
- `llama-2-13b-chat`
- `gemma-7b-it`

To change the model, edit `/app/api/identify-species/route.ts` and update the `model` parameter in the `groq.messages.create()` call.

## API Rate Limits

Groq provides generous rate limits:
- **Free Tier**: 30 requests/minute
- **Pro Tier**: Higher limits

Check your current usage in the [Groq Console](https://console.groq.com)

## Troubleshooting

### Issue: "GROQ_API_KEY is not set"
**Solution**: Ensure the environment variable is set in `.env.local` and restart your dev server.

### Issue: "Failed to identify species"
**Solution**: 
- Check that your API key is valid
- Ensure you have API quota remaining
- Try uploading a clearer image
- Check the browser console for error details

### Issue: Image not being processed
**Solution**:
- Groq's current model doesn't have native image vision capabilities
- The API receives the image description/context instead
- Ensure your image is a valid format (JPG, PNG, etc.)

## Future Enhancements

1. **Vision API Integration**: Once Groq adds native vision capabilities, we'll integrate it for direct image analysis
2. **Batch Processing**: Process multiple images at once
3. **Custom Model Fine-tuning**: Train models on specific species databases
4. **Local Caching**: Cache identification results to improve performance

## Security Notes

- Never commit your API key to version control
- Use environment variables for all sensitive data
- The API key is only used server-side (in `/app/api` routes)
- Client-side requests are authenticated through Next.js server routes

## Support

- **Groq Docs**: [docs.groq.com](https://docs.groq.com)
- **API Reference**: [API Reference](https://console.groq.com/docs)
- **Community**: [Groq Community](https://community.groq.com)

---

**Last Updated**: February 2026
**Status**: Active Integration

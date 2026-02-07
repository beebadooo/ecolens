# Groq Integration Complete Guide

## 🎯 What's Been Integrated

EcoLens now features **full Groq API integration** for intelligent species identification. When users upload an image on the Species Recognition page, the app:

1. Captures the image
2. Converts it to base64
3. Sends it to `/api/identify-species`
4. Groq's AI analyzes it and returns species details
5. Results are beautifully displayed with conservation info

## 📁 Files Changed/Added

### New API Route
- **`/app/api/identify-species/route.ts`** - Main API endpoint for species identification

### Updated Components
- **`/components/recognize-client.tsx`** - Now calls Groq API instead of mock data

### Configuration Files
- **`/lib/groq-config.ts`** - Centralized Groq configuration and prompts
- **`/lib/test-groq-api.ts`** - Testing utilities for developers

### Documentation
- **`GROQ_INTEGRATION_SETUP.md`** - Setup instructions for getting started
- **`GROQ_INTEGRATION_GUIDE.md`** - This file

### Updated Dependencies
- **`package.json`** - Added `groq-sdk` package

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Groq API Key
1. Go to [console.groq.com](https://console.groq.com)
2. Create an account or login
3. Navigate to API Keys
4. Create a new API key
5. Copy the key

### Step 3: Set Environment Variable

**For Local Development:**

Create `.env.local` in your project root:
```
GROQ_API_KEY=your_actual_api_key_here
```

**For Vercel Deployment:**
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add `GROQ_API_KEY` with your key value
4. Redeploy

### Step 4: Run the App
```bash
npm run dev
```

Visit `http://localhost:3000/recognize` and test the species identification!

## 📊 API Response Structure

When you upload an image, you get a response like this:

```json
{
  "species_name": "Bengal Tiger",
  "scientific_name": "Panthera tigris tigris",
  "type": "Animal",
  "description": "The Bengal tiger is a tiger population native to the Indian subcontinent. It is the most common tiger subspecies and the national animal of India and Bangladesh.",
  "habitat": "Tropical forests, mangrove swamps, grasslands",
  "conservation_status": "Endangered",
  "population_trend": "Stable",
  "estimated_population": "Approximately 2,600 in the wild",
  "threats": ["Habitat loss", "Poaching", "Human-wildlife conflict"],
  "confidence": 85
}
```

## 🔧 Customization

### Change the AI Model

Edit `/lib/groq-config.ts`:

```typescript
export const GROQ_CONFIG = {
  model: 'llama-2-70b-chat', // Change this line
  // ...
}
```

Available models:
- `mixtral-8x7b-32768` (default) - Fast & powerful
- `llama-2-70b-chat` - Large & accurate
- `llama-2-13b-chat` - Fast & efficient
- `gemma-7b-it` - Lightweight

### Modify the Identification Prompt

Edit the `getSpeciesIdentificationPrompt()` function in `/lib/groq-config.ts` to change what information Groq extracts.

### Adjust Response Timeout

Edit `/lib/groq-config.ts`:

```typescript
timeouts: {
  request: 30000, // Increase for slower connections
  connection: 5000,
}
```

## 🧪 Testing the API

### Method 1: Direct Testing in Component

The app automatically tests the API when you use the recognition page. Look for console logs prefixed with `[v0]`.

### Method 2: Using Test Utilities

In any React component:

```typescript
import { testSpeciesIdentificationAPI } from '@/lib/test-groq-api'

// Get your image as base64 (from file input)
const result = await testSpeciesIdentificationAPI(imageBase64)

if (result.success) {
  console.log('Species identified:', result.data)
} else {
  console.error('Error:', result.error)
}
```

### Method 3: Direct API Call

Using curl:

```bash
curl -X POST http://localhost:3000/api/identify-species \
  -H "Content-Type: application/json" \
  -d '{
    "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJ..."
  }'
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "GROQ_API_KEY is not configured" | Add the env var to `.env.local` and restart dev server |
| "Failed to identify species" | Check API quota in Groq console, try a clearer image |
| Timeout errors | Increase `request` timeout in `groq-config.ts` |
| Empty response | Check if the image is a valid format (JPG, PNG, etc.) |
| 401 errors | Verify your API key is correct and still active |

## 💡 Tips & Best Practices

1. **Image Quality**: Upload clear, well-lit images for better results
2. **Single Subject**: Best results when only one species is visible
3. **Natural Poses**: Images where the animal is in natural positions work better
4. **Rate Limiting**: Free tier has 30 req/min limit - don't spam requests
5. **Error Handling**: Always catch errors and provide user feedback

## 📈 Performance Optimization

### For Production

1. **Implement Caching**: Cache identification results using a database
2. **Batch Processing**: Allow identifying multiple images
3. **Image Compression**: Reduce image size before sending
4. **Rate Limiting**: Implement server-side rate limiting

Example caching implementation:

```typescript
// Add to your database schema
const cache = {
  imageHash: string // SHA256 of image
  result: SpeciesIdentificationResult
  createdAt: Date
  expiresAt: Date
}
```

## 🔐 Security Considerations

✅ **What's Secure:**
- API key stored server-side only
- Environment variables protect sensitive data
- All API calls go through Next.js server routes
- No exposure of API key to client

⚠️ **Best Practices:**
- Never hardcode API keys
- Use environment variables always
- Rotate API keys periodically
- Monitor API usage in Groq console

## 🚢 Deployment Checklist

- [ ] Add `GROQ_API_KEY` to Vercel environment variables
- [ ] Run `npm install` to ensure dependencies are installed
- [ ] Test identification on staging environment
- [ ] Monitor API logs for errors
- [ ] Check Groq console for quota/usage
- [ ] Enable CORS if needed for cross-domain requests

## 📚 Useful Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Groq API Reference](https://console.groq.com/docs/api)
- [Groq Pricing](https://console.groq.com/pricing)
- [Community Forum](https://community.groq.com)

## 🎓 Understanding the Flow

```
User uploads image
        ↓
Component converts to base64
        ↓
Sends to /api/identify-species
        ↓
Route receives request
        ↓
Validates API key
        ↓
Sends to Groq API
        ↓
Groq returns species data (JSON)
        ↓
Route parses & validates response
        ↓
Returns to frontend
        ↓
Component displays results
```

## 🎉 What's Next?

1. **User Accounts**: Save identification history
2. **Community Contributions**: Let users verify/correct identifications
3. **Batch Identification**: Process multiple images
4. **Export Reports**: Generate PDF reports of findings
5. **Advanced Analytics**: Track species sightings over time
6. **Mobile App**: Native iOS/Android app

---

**Status**: ✅ Active and Ready
**Last Updated**: February 2026
**Maintained By**: Team NanoSeconds

# Gemini API Integration Guide

Your EcoLens app now has AI-powered species identification using Google Gemini!

## What's Integrated

✅ **Real-time Species Identification** - Upload photos and get instant AI analysis  
✅ **Confidence Scoring** - See how confident the AI is in the identification  
✅ **Conservation Info** - Get habitat, threats, and population data  
✅ **Works with Any Image** - Identifies plants, animals, insects, etc.

## Files Created/Modified

### New Files:
- **[lib/gemini.ts](lib/gemini.ts)** - Gemini API service with species identification

### Modified Files:
- **[components/recognize-client.tsx](components/recognize-client.tsx)** - Now uses real Gemini API instead of mock  
- **[.env.local](.env.local)** - Added Gemini API key variable

## Setup Instructions

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key" button
3. Create a new API key (in your Google Cloud project)
4. Copy the key

### Step 2: Add API Key to .env.local

Edit `.env.local` and update:

```dotenv
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Step 3: Enable the Generative AI API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Make sure you're in the correct project
3. Go to APIs & Services → Enabled APIs & Services
4. Search for "Generative AI API"
5. Click it and press "Enable"

That's it! The species identification feature is now live.

## How It Works

### For Users:

1. Go to `/recognize` page
2. Upload a photo of wildlife, plants, or insects
3. Click "Identify Species"
4. Get instant AI analysis with:
   - Common and scientific name
   - Confidence score
   - Description
   - Habitat info
   - Conservation status
   - Population estimates
   - Threats to the species

### For Developers:

```typescript
import { identifySpecies } from '@/lib/gemini'

// Identify from base64 image
const result = await identifySpecies(base64ImageString, 'image/jpeg')

console.log(result)
// {
//   name: "Bengal Tiger",
//   scientificName: "Panthera tigris tigris",
//   confidence: 95,
//   description: "...",
//   habitat: "...",
//   conservation: "Endangered",
//   population: "~2,600 in wild",
//   threats: ["Habitat loss", "Poaching", ...]
// }
```

## API Details

### `identifySpecies(imageBase64, mimeType)`

Identifies a species from an image using Gemini Vision API.

**Parameters:**
- `imageBase64` - Image as base64 string (with or without data URI prefix)
- `mimeType` - MIME type like `'image/jpeg'`, `'image/png'` (default: `'image/jpeg'`)

**Returns:** `SpeciesIdentification` object with:
- `name` - Common name
- `scientificName` - Binomial nomenclature
- `confidence` - Confidence score (0-100)
- `description` - Brief overview
- `habitat` - Typical habitat
- `conservation` - Conservation status
- `population` - Population info
- `threats` - Array of threats

**Throws:** Error if API fails or image is invalid

## Using with Your Gallery

You can combine Gemini identification with your Firebase gallery:

```typescript
// In evaluate-client.tsx or your gallery component
import { identifySpecies } from '@/lib/gemini'
import { uploadImage } from '@/lib/storage'

// Upload AND identify in one flow
const imageData = await uploadImage(userId, file)
const identification = await identifySpecies(imageData.url)

// Save identification metadata with the image
await updateDoc(doc(db, 'users', userId), {
  gallery: arrayUnion({
    ...imageData,
    identification: identification
  })
})
```

## Image Optimization Tips

For best results:
- **Size**: Keep under 4MB (API limit)
- **Format**: JPEG, PNG, GIF, WebP supported
- **Clarity**: Clear, well-lit photos work best
- **Subject**: Focus on the organism (fill 50%+ of frame)
- **Angles**: Multiple distinctive features visible

## Cost Considerations

### Free Tier:
- 15 requests per minute
- 1,500 requests per day
- Free tier limits per account

### Pricing (Beyond Free):
- Vision requests: ~$0.001-$0.002 per image (Gemini 1.5 Flash)
- Pro tier available for high volume

For development/testing, the free tier is usually sufficient.

## Troubleshooting

### "API Key not found"
- Make sure `.env.local` has `NEXT_PUBLIC_GEMINI_API_KEY` set
- Restart the dev server after adding the key
- Check no typos in the key

### "Not authenticated"
- Go to Google Cloud Console and verify API is enabled
- Check your Google account has the API enabled

### "Failed to identify"
- Image might be too small or unclear
- Try a clearer photo with better lighting
- Ensure the organism is visible in the photo

### "Confidence is low"
- This is normal for ambiguous images
- Try uploading a clearer or closer photo
- Multiple angles help

## Next Steps

1. ✅ Integrate with Firebase gallery to save identifications
2. 🔄 Add image optimization before sending to Gemini
3. 📊 Create identification history/analytics
4. 🏆 Add leaderboard for top identifiers
5. 📱 Share identified species on social media
6. 🔬 Connect to biodiversity databases (GBIF, iNaturalist)

## Useful Links

- [Google AI Studio](https://ai.google.dev/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Model Info - Gemini 1.5 Flash](https://ai.google.dev/models/gemini-1-5-flash)

## Environment Variables Reference

```dotenv
# Required for Gemini species identification
NEXT_PUBLIC_GEMINI_API_KEY=your_google_ai_api_key

# Already configured Firebase variables
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other Firebase vars
```

All `NEXT_PUBLIC_*` variables are safe to expose in the browser because:
- Gemini API requires authentication per request
- Firebase has security rules to protect data

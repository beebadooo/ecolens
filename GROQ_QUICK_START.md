# 🚀 Groq Integration - Quick Start (5 Minutes)

## TL;DR Setup

### 1️⃣ Get API Key (2 min)
```
Visit: https://console.groq.com
→ Create Account
→ Copy API Key
```

### 2️⃣ Add to Environment (1 min)
Create `.env.local`:
```
GROQ_API_KEY=your_key_here
```

### 3️⃣ Install & Run (2 min)
```bash
npm install
npm run dev
```

### 4️⃣ Test (1 min)
Visit: `http://localhost:3000/recognize`
Upload any animal/plant image → Click "Identify Species"

## 📝 Response Example

Upload a tiger image, get:
```json
{
  "species_name": "Bengal Tiger",
  "scientific_name": "Panthera tigris tigris",
  "type": "Animal",
  "confidence": 85,
  "conservation_status": "Endangered",
  "habitat": "Tropical forests, mangrove swamps",
  "threats": ["Habitat loss", "Poaching", "Human-wildlife conflict"]
}
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `/app/api/identify-species/route.ts` | API endpoint (do not edit) |
| `/components/recognize-client.tsx` | UI component (uses API) |
| `/lib/groq-config.ts` | Configuration (customize here) |
| `.env.local` | Your API key (keep secret) |

## ⚙️ Common Customizations

### Change AI Model
Edit `/lib/groq-config.ts`:
```typescript
model: 'llama-2-70b-chat' // Was 'mixtral-8x7b-32768'
```

### Change Prompt/Output
Edit `/lib/groq-config.ts` function `getSpeciesIdentificationPrompt()`

### Handle Errors
Errors logged as `[v0]` in browser console. Check:
- Is API key set? → Check `.env.local`
- API quota? → Check Groq console
- Image valid? → Try PNG or JPG

## 🚨 Common Issues

| Issue | Fix |
|-------|-----|
| "GROQ_API_KEY not set" | Restart dev server after adding `.env.local` |
| "Failed to identify" | Check image quality, API quota |
| Timeout | Increase timeout in `groq-config.ts` |

## 📊 API Endpoint

**POST** `/api/identify-species`

Request:
```json
{"imageBase64": "data:image/jpeg;base64,..."}
```

Response:
```json
{
  "species_name": "...",
  "scientific_name": "...",
  "type": "...",
  "description": "...",
  "habitat": "...",
  "conservation_status": "...",
  "population_trend": "...",
  "estimated_population": "...",
  "threats": ["..."],
  "confidence": 85
}
```

## 🌐 For Vercel Deployment

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add: `GROQ_API_KEY=your_key`
4. Redeploy

## 📱 Test in Browser Console

```javascript
// Check if API key is configured
fetch('/api/identify-species', {
  method: 'POST',
  body: JSON.stringify({imageBase64: ''})
})
.then(r => r.json())
.then(d => console.log(d))
```

## ✅ Verification Checklist

- [ ] API key obtained from console.groq.com
- [ ] `.env.local` created with API key
- [ ] `npm install` completed
- [ ] Dev server running (`npm run dev`)
- [ ] Can upload image on `/recognize` page
- [ ] Identification works without errors

## 🎓 Next Steps

1. ✅ Basic setup (you are here)
2. Read `GROQ_INTEGRATION_GUIDE.md` for advanced usage
3. Check `GROQ_INTEGRATION_SETUP.md` for troubleshooting
4. Customize in `/lib/groq-config.ts`

---

**Need Help?**
- Groq Docs: https://console.groq.com/docs
- Check `.env.local` is in root directory
- Restart dev server after env changes
- Check browser console for `[v0]` logs

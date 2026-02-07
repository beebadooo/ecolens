# ✅ EcoLens Groq Integration - Setup Checklist

## Phase 1: Pre-Setup ✓

- [ ] Node.js installed (`node --version` should show v18+)
- [ ] Project downloaded or cloned
- [ ] Internet connection available
- [ ] Terminal/Command prompt open
- [ ] Text editor ready (VS Code recommended)

**Estimated Time**: 2 minutes | **Status**: Ready to proceed

---

## Phase 2: API Key Setup ✓

### Get Your Groq API Key

- [ ] Open https://console.groq.com in browser
- [ ] Sign up or log in
- [ ] Click on API Keys section
- [ ] Create new API key
- [ ] Copy the key (you'll use it next)
- [ ] Save it somewhere safe (don't share!)

**Estimated Time**: 3 minutes | **Status**: API key obtained

---

## Phase 3: Environment Configuration ✓

### Add API Key to Project

**Step 1: Create Environment File**
- [ ] Navigate to project root directory
- [ ] Create new file named: `.env.local`

**Step 2: Add API Key**
- [ ] Open `.env.local`
- [ ] Add this line: `GROQ_API_KEY=your_api_key_here`
- [ ] Replace `your_api_key_here` with actual key
- [ ] Save the file

**Step 3: Verify**
- [ ] `.env.local` is in project root (same folder as `package.json`)
- [ ] File contains exactly: `GROQ_API_KEY=...`
- [ ] No spaces before/after `=`
- [ ] File is saved

**Estimated Time**: 2 minutes | **Status**: Environment configured

---

## Phase 4: Installation ✓

### Install Dependencies

**In Terminal/Command Prompt:**

```bash
# Make sure you're in project root
cd /path/to/ecolens

# Install dependencies
npm install
```

- [ ] `npm install` completed without errors
- [ ] You see "added X packages" message
- [ ] New `node_modules` folder appeared
- [ ] No red error messages

**If you get errors:**
- [ ] Delete `node_modules` folder
- [ ] Delete `package-lock.json`
- [ ] Run `npm install` again
- [ ] Check internet connection

**Estimated Time**: 3 minutes | **Status**: Dependencies installed

---

## Phase 5: Start Development Server ✓

### Run the App

**In Terminal:**

```bash
npm run dev
```

- [ ] Server started successfully
- [ ] You see: "Local: http://localhost:3000"
- [ ] No red error messages
- [ ] Terminal shows "ready - started server"

**If port 3000 is busy:**
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

**Estimated Time**: 1 minute | **Status**: Server running

---

## Phase 6: Browser Testing ✓

### Test in Your Browser

**Step 1: Open Browser**
- [ ] Open web browser (Chrome, Firefox, Safari, Edge)
- [ ] Visit: `http://localhost:3000`

**Step 2: Navigate to Recognition Page**
- [ ] Click "Recognize" in navigation
- [ ] OR visit: `http://localhost:3000/recognize`
- [ ] Page loads without errors

**Step 3: Upload Test Image**
- [ ] Click "Choose File" or drag image
- [ ] Select any animal or plant photo
- [ ] Preview appears in the upload area

**Step 4: Identify Species**
- [ ] Click "Identify Species" button
- [ ] Wait for loading animation
- [ ] Results card appears (usually <5 seconds)

**Step 5: Verify Results**
- [ ] Shows "Species Identified"
- [ ] Shows species name (e.g., "Bengal Tiger")
- [ ] Shows scientific name (e.g., "Panthera tigris tigris")
- [ ] Shows confidence score (%)
- [ ] Shows conservation status
- [ ] Shows habitat information
- [ ] Shows threats

**If you see all this, SUCCESS! ✅**

**Estimated Time**: 3 minutes | **Status**: Tested successfully

---

## Phase 7: Troubleshooting ✓

### If Something Goes Wrong

#### Error: "GROQ_API_KEY is not set"
- [ ] Check `.env.local` exists in project root
- [ ] Check it contains `GROQ_API_KEY=...`
- [ ] Stop dev server (Ctrl+C)
- [ ] Run `npm run dev` again
- [ ] Restart browser

#### Error: "Failed to identify species"
- [ ] Check image is a real photo (not text/screenshot)
- [ ] Try different image
- [ ] Check API key is valid in Groq console
- [ ] Check if you have API quota remaining
- [ ] Check browser console (F12) for [v0] logs

#### Error: "Cannot find module 'groq-sdk'"
- [ ] Delete `node_modules` folder
- [ ] Delete `package-lock.json`
- [ ] Run `npm install` again
- [ ] Run `npm run dev` again

#### Page Won't Load
- [ ] Is dev server running? (Should see "Local: http://localhost:3000")
- [ ] Try different port: `npm run dev -- -p 3001`
- [ ] Check browser console for errors (F12)
- [ ] Clear browser cache (Ctrl+Shift+Delete)

#### Still Stuck?
- [ ] Read: `GROQ_QUICK_START.md`
- [ ] Check: `GROQ_INTEGRATION_SETUP.md` troubleshooting
- [ ] See: `GROQ_DOCS_INDEX.md` for specific issues

**Estimated Time**: Varies | **Status**: Issue resolved

---

## Phase 8: Customization (Optional) ✓

### Make It Your Own

#### Change AI Model
1. [ ] Open `/lib/groq-config.ts`
2. [ ] Find line: `model: 'mixtral-8x7b-32768'`
3. [ ] Change to: `model: 'llama-2-70b-chat'`
4. [ ] Save file
5. [ ] Dev server reloads automatically

#### Modify Identification Prompt
1. [ ] Open `/lib/groq-config.ts`
2. [ ] Find `getSpeciesIdentificationPrompt()` function
3. [ ] Edit the prompt text
4. [ ] Save file
5. [ ] Test with new prompt

#### Adjust Timeout
1. [ ] Open `/lib/groq-config.ts`
2. [ ] Find `timeouts:` section
3. [ ] Change `request: 30000` to `request: 60000`
4. [ ] Save file
5. [ ] Test with slower connections

**Estimated Time**: 5-15 minutes | **Status**: Customized

---

## Phase 9: Deployment (When Ready) ✓

### Deploy to Vercel

**Step 1: Prepare Code**
- [ ] Test everything works locally
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Commit code to GitHub

**Step 2: Connect to Vercel**
- [ ] Go to https://vercel.com
- [ ] Sign up or log in
- [ ] Create new project
- [ ] Connect GitHub repository

**Step 3: Add Environment Variable**
- [ ] In Vercel dashboard → Settings
- [ ] Go to Environment Variables
- [ ] Add: `GROQ_API_KEY=your_key`
- [ ] Save

**Step 4: Deploy**
- [ ] Click "Deploy" button
- [ ] Wait for deployment (2-3 minutes)
- [ ] Get production URL
- [ ] Test on production URL

**Step 5: Verify Production**
- [ ] Visit production URL + `/recognize`
- [ ] Upload image
- [ ] Verify results appear

**Estimated Time**: 10 minutes | **Status**: Deployed

---

## Phase 10: Monitoring ✓

### Keep Track of Everything

**Daily Checks:**
- [ ] Check API usage in Groq console
- [ ] Verify no errors in browser console
- [ ] Test species identification works

**Weekly Checks:**
- [ ] Review API logs
- [ ] Check quota usage
- [ ] Verify performance metrics

**Monthly Checks:**
- [ ] Review statistics
- [ ] Plan optimizations
- [ ] Update documentation

**Estimated Time**: 5 minutes/day | **Status**: Monitoring active

---

## 🎯 Success Indicators

### You've Succeeded When:

✅ `.env.local` created with API key
✅ `npm install` completed without errors
✅ `npm run dev` shows "ready - started server"
✅ Browser shows `/recognize` page
✅ Can upload image without errors
✅ Clicking "Identify Species" shows results
✅ Results include all species information
✅ Console shows [v0] logs, no red errors

---

## ⏱️ Total Time Estimate

| Phase | Time |
|-------|------|
| Pre-Setup | 2 min |
| API Key | 3 min |
| Environment | 2 min |
| Installation | 3 min |
| Dev Server | 1 min |
| Browser Test | 3 min |
| Troubleshooting | 0 min (if all goes well) |
| **TOTAL** | **17 minutes** |

**If everything works on first try: 15 minutes**
**Including small issues: 20-30 minutes**
**Including troubleshooting: 30-60 minutes**

---

## 📋 Quick Checklist (Copy & Paste)

```
Phase 1: Pre-Setup
☐ Node.js installed
☐ Project downloaded
☐ Terminal open

Phase 2: API Key
☐ Visited console.groq.com
☐ Got API key
☐ Saved safely

Phase 3: Environment
☐ Created .env.local
☐ Added GROQ_API_KEY
☐ Saved file

Phase 4: Installation
☐ Ran npm install
☐ No errors

Phase 5: Start Server
☐ Ran npm run dev
☐ Server running

Phase 6: Browser Test
☐ Visited /recognize
☐ Uploaded image
☐ Got results

Phase 7: Troubleshooting
☐ Fixed any issues
☐ All working

Phase 8: Customization
☐ Customized (optional)

Phase 9: Deployment
☐ Deployed to Vercel (optional)

Phase 10: Monitoring
☐ Monitoring active (optional)
```

---

## 🎉 You're Ready!

When all items are checked, you're ready to:
- ✅ Use the app locally
- ✅ Share with team
- ✅ Deploy to production
- ✅ Customize features
- ✅ Build on top

---

## 📞 Need Help?

| Issue | Solution |
|-------|----------|
| Stuck on setup | Read GROQ_QUICK_START.md |
| API key issues | Visit console.groq.com and verify |
| Installation errors | Delete node_modules, run npm install again |
| App not loading | Check dev server is running |
| Results not showing | Check API key, image quality, internet |
| Deployment issues | Read GROQ_INTEGRATION_GUIDE.md |

---

## 🚀 Next Steps After Completion

1. **Immediate**: Explore the app
2. **Today**: Try with different species photos
3. **This Week**: Deploy to Vercel
4. **This Month**: Add custom features
5. **Later**: Build advanced features

---

**Status**: Ready to start
**Start Date**: Today
**Deadline**: 30 minutes
**Difficulty**: Easy

**Let's go! 🌿**

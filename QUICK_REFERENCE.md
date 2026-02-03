# EcoLens Frontend - Quick Reference Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000
```

## 📖 Page URLs & Descriptions

| URL | Component | Purpose |
|-----|-----------|---------|
| `/` | Homepage | Landing page with overview |
| `/recognize` | RecognitionClient | AI species identification |
| `/gallery` | Gallery | Species database browser |
| `/about` | About | Company info & team |
| `/impact` | Impact | Conservation outcomes |
| `/login` | Login | User authentication |
| `/signup` | SignUp | Account creation |

## 🎨 Color Quick Reference

```
Primary:   #0a5a3c (Teal)   - Main brand color
Accent:    #f4e04d (Golden) - Highlights
Background: #0a1929 (Navy)  - Dark background
Secondary: #153d56 (Blue)   - Supporting color
```

Use in Tailwind: `text-primary`, `bg-accent`, `hover:bg-primary/90`

## 📁 Add a New Page in 30 Seconds

```bash
# 1. Create folder
mkdir -p app/your-page

# 2. Create file
touch app/your-page/page.tsx

# 3. Add this code:
```

```tsx
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function YourPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Your content here */}
        </div>
      </div>
      <Footer />
    </main>
  )
}
```

```tsx
// 4. Update Header navigation in components/header.tsx
<Link href="/your-page" className="text-sm text-foreground/70 hover:text-foreground">
  Your Page
</Link>
```

## 🔧 Common Tasks

### Change Primary Color
Edit `/app/globals.css`:
```css
--primary: 142 60% 48%;  /* Change these HSL values */
```

### Add Navigation Link
Edit `/components/header.tsx`:
```tsx
<Link href="/new-page">New Page</Link>
```

### Update Footer Links
Edit `/components/footer.tsx` - Update the navigation sections

### Change Species Data
Edit `/app/gallery/page.tsx` - Update `speciesData` array

### Modify Hero Text
Edit `/components/hero.tsx` - Update text content

### Add Team Member
Edit `/app/about/page.tsx` - Add to `team` array

## 💾 Component Imports

```tsx
// Buttons and basic UI
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Icons
import { Leaf, Camera, Upload, Loader2 } from 'lucide-react'

// Next.js utilities
import Link from 'next/link'
import Image from 'next/image'
```

## 🎯 CSS Class Patterns

### Spacing
```tsx
// Padding
<div className="p-4">      {/* All sides */}
<div className="px-6">     {/* Horizontal */}
<div className="py-8">     {/* Vertical */}

// Margin
<div className="m-4">      {/* All sides */}
<div className="mb-6">     {/* Bottom only */}

// Gap (for flex containers)
<div className="flex gap-4">
```

### Responsive Design
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col on mobile, 2 on tablet, 3 on desktop */}

<div className="text-lg sm:text-xl lg:text-2xl">
  {/* Different text sizes at breakpoints */}

<div className="hidden md:block">
  {/* Hidden on mobile, visible on tablet+ */}
```

### Colors
```tsx
// Text
<div className="text-foreground">        {/* Normal text */}
<div className="text-foreground/70">     {/* 70% opacity */}
<div className="text-primary">           {/* Primary color */}
<div className="text-accent">            {/* Accent color */}

// Backgrounds
<div className="bg-background">          {/* Default bg */}
<div className="bg-secondary/10">        {/* Secondary at 10% */}
<div className="bg-primary/20">          {/* Primary at 20% */}

// Gradients
<div className="bg-gradient-to-r from-primary to-accent">
<div className="bg-gradient-to-b from-background to-secondary/20">
```

### Flexbox
```tsx
<div className="flex items-center justify-between">
  {/* Center vertically, space between horizontally */}

<div className="flex flex-col gap-4">
  {/* Column layout with spacing */}

<div className="flex-1">
  {/* Take remaining space */}
```

## 📱 Responsive Breakpoints

```
Mobile:  < 640px    (no prefix)
Tablet:  640-1024px (md: prefix)
Desktop: > 1024px   (lg: prefix)
```

## 🎬 Animations

```tsx
// Built-in Tailwind animations
<div className="animate-pulse">           {/* Fade in/out */}
<div className="animate-spin">            {/* Spin */}
<div className="transition-all duration-300">  {/* Smooth transition */}

// Hover effects
<div className="hover:text-foreground">
<div className="hover:bg-primary/90">
<div className="hover:shadow-lg">
```

## 🧩 Creating a Card

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card className="border-border/40 bg-background/50">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

## 📝 Forms

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input 
      id="email"
      type="email"
      placeholder="you@example.com"
      className="bg-secondary/20 border-border/40"
    />
  </div>
</div>
```

## 🔗 File Paths

- Page files: `/app/pagename/page.tsx`
- Components: `/components/filename.tsx`
- UI components: `/components/ui/componentname.tsx`
- Styles: `/app/globals.css`
- Config: `/tailwind.config.ts`
- Public assets: `/public/filename.ext`

## 🚨 Common Issues & Fixes

### Page Not Found (404)
- Check folder structure matches URL
- Ensure `page.tsx` exists in folder
- Page must be inside `/app` directory

### Styles Not Applied
- Check Tailwind class spelling
- Make sure class exists in tailwind.config.ts
- Rebuild with `npm run dev`

### Components Not Loading
- Check import path (use `@/components/...`)
- Verify file exists
- Check for typos in component name

### Mobile Not Responsive
- Add responsive prefixes: `sm:`, `md:`, `lg:`
- Test with mobile DevTools (Ctrl+Shift+M)
- Check viewport meta tag in layout

## 📦 Useful npm Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check code quality
npm install          # Install dependencies
```

## 🔐 Environment Variables

Create `.env.local` for local development:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=EcoLens
```

For production, add in Vercel dashboard.

## 📊 Form Validation Example

```tsx
const [error, setError] = useState<string | null>(null)

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)
  
  if (!email) {
    setError('Email is required')
    return
  }
  
  // Process form
}

{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
```

## 🎨 Dark Mode

Everything is dark mode by default. No need to switch themes. The design tokens are set for dark theme in `/app/globals.css`.

## 📚 Component Library Docs

- [Shadcn/ui](https://ui.shadcn.com) - Component documentation
- [Lucide Icons](https://lucide.dev) - Icon reference
- [Tailwind CSS](https://tailwindcss.com) - Styling docs
- [Next.js](https://nextjs.org/docs) - Framework docs

## ✅ Deployment Checklist

- [ ] All links working
- [ ] Forms validate
- [ ] Images optimize
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Accessibility checked
- [ ] SEO metadata updated
- [ ] Environment variables set

## 🆘 Getting Help

1. Check `/IMPLEMENTATION_GUIDE.md` for detailed instructions
2. Review component code for examples
3. Look at similar pages for patterns
4. Check framework documentation
5. Review the `/PROJECT_SUMMARY.md` for overview

---

**Quick Links**
- [README.md](/README.md) - Getting started
- [IMPLEMENTATION_GUIDE.md](/IMPLEMENTATION_GUIDE.md) - Detailed guide
- [PROJECT_SUMMARY.md](/PROJECT_SUMMARY.md) - Project overview

Happy coding! 🌿

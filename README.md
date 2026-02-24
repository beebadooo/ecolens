# EcoLens - AI-Powered Species Recognition & Biodiversity Monitoring

A modern, full-featured web application for species identification using artificial intelligence. EcoLens enables conservation professionals, researchers, and citizen scientists to identify species and contribute to global biodiversity monitoring efforts. This project advances **SDG 15: Life on Land** through technology-enabled conservation.

<!-- ## 🌿 Features

### Core Functionality
- **🎯 AI Species Recognition** - 98% accuracy species identification from photos
- **📱 Mobile-Friendly** - Responsive design optimized for field research
- **⚡ Real-time Results** - Get identification results in under 1 second
- **🌍 Global Database** - Access information on 10,000+ species worldwide
- **📊 Community Features** - Share findings and contribute to conservation data
- **🔒 Secure & Private** - Encrypted data handling with user privacy controls -->

<!-- ### Pages & Components

#### Public Pages
- **Home** - Landing page with hero, features, how-it-works, testimonials
- **Recognize** - Interactive species identification interface with upload/camera capture
- **Gallery** - Searchable and filterable species database with community stats
- **About** - Project mission, team, technology, and values
- **Impact** - Conservation outcomes, partnerships, and global reach
- **Login** - Secure authentication interface

#### Components
- **Header** - Navigation bar with logo and CTA buttons
- **Hero** - Compelling headline with statistics and call-to-action
- **Features** - 6 key features with icons and descriptions
- **How-It-Works** - 4-step process visualization
- **Testimonials** - User reviews and success stories
- **Footer** - Links, copyright, and social media

## 🚀 Getting Started -->

<!-- ### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Modern web browser -->
### Installation

1. **Clone or download the project**
```bash
git clone <repository>
cd ecolens
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

<!-- ## 📁 Project Structure

```
ecolens/
├── app/
│   ├── globals.css           # Global styles with design tokens
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Homepage
│   ├── recognize/
│   │   └── page.tsx          # Species recognition page
│   ├── gallery/
│   │   └── page.tsx          # Species gallery page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── impact/
│   │   └── page.tsx          # Impact page
│   └── login/
│       └── page.tsx          # Login page
├── components/
│   ├── header.tsx            # Navigation header
│   ├── hero.tsx              # Hero section
│   ├── features.tsx          # Features showcase
│   ├── how-it-works.tsx      # Process steps
│   ├── testimonials.tsx      # User testimonials
│   ├── footer.tsx            # Footer
│   ├── recognize-client.tsx  # Recognition interface
│   └── ui/                   # shadcn/ui components
├── public/
│   └── hero-species.jpg      # Hero image
├── tailwind.config.ts        # Tailwind configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep teal (`#0a5a3c`) - Nature and trust
- **Accent**: Golden yellow (`#f4e04d`) - Energy and growth
- **Background**: Navy (`#0a1929`) - Professional dark theme
- **Neutral**: Grays for text and borders

### Typography
- **Headings**: Geist (Bold, 400-700 weights)
- **Body**: Geist Sans (Regular, 400 weight)

### Components
Built with **shadcn/ui** for consistent, accessible UI components:
- Button, Card, Input, Label, Badge, Alert
- Custom animations and transitions
- Responsive design patterns -->

## 🔧 Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Language**: TypeScript
- **Image classification**: Hugging face API

<!-- ## 📝 Key Files

### Theme Configuration
- `/app/globals.css` - Design tokens (colors, spacing, radius)
- `/tailwind.config.ts` - Tailwind theme extensions

### Pages
- `/app/page.tsx` - Homepage with all sections
- `/app/recognize/page.tsx` - AI recognition interface
- `/app/gallery/page.tsx` - Species browser
- `/app/about/page.tsx` - Project information
- `/app/impact/page.tsx` - Conservation outcomes
- `/app/login/page.tsx` - Authentication

## 🌟 Features Breakdown

### Species Recognition Page
- Drag-and-drop or click-to-upload interface
- Mobile camera capture support
- Simulated AI identification with detailed results
- Species information cards with conservation status
- Save and share functionality
- Tips for best results

### Gallery Page
- Searchable species database
- Filter by category (Mammals, Birds, Marine, etc.)
- Conservation status badges
- Community statistics (identification counts)
- Responsive grid layout

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Responsive mobile design
- Accessibility features (ARIA labels, semantic HTML)
- Dark theme optimized for outdoor use

## 🚀 Customization

### Adding New Species
Edit the mock data in `/app/gallery/page.tsx`:
```tsx
const speciesData = [
  {
    id: 1,
    name: 'Species Name',
    scientific: 'Scientific name',
    // ... other properties
  },
]
```

### Changing Colors
Update design tokens in `/app/globals.css`:
```css
:root {
  --primary: 142 60% 48%;  /* Adjust HSL values */
  --accent: 47 90% 53%;
}
```

### Adding Pages
1. Create new folder in `/app`
2. Add `page.tsx` with content
3. Import Header and Footer components
4. Update navigation in Header component

## 🔐 Security & Privacy

The frontend is designed with privacy-first principles:
- No sensitive data stored in localStorage
- HTTPS ready for deployment
- User consent for data sharing
- Privacy policy and terms templates included

## 📱 Responsive Design

Optimized for all screen sizes:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Use `sm:`, `md:`, `lg:` prefixes in Tailwind for responsive styles.

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

This is a frontend showcase for the EcoLens project. To contribute:

1. Create feature branches for new pages/components
2. Follow the existing component structure
3. Maintain consistent styling using design tokens
4. Test responsive design on multiple devices
5. Ensure accessibility standards are met

## 📄 License

MIT License - Feel free to use this template for your projects.

## 🎯 Next Steps for Production

1. **Backend Integration**
   - Connect to actual species identification API
   - Setup database for storing identifications
   - Implement user authentication

2. **Mobile App**
   - Build native iOS/Android apps using React Native
   - Add offline functionality

3. **Analytics**
   - Track user behavior and identification patterns
   - Monitor model performance

4. **Community**
   - User profiles and contribution tracking
   - Leaderboards and achievements
   - Messaging system

5. **Deployment**
   - Deploy to Vercel for production
   - Setup CDN for image assets
   - Configure environment variables

## 🙌 Credits

**Team**: Pakhi Kumar and the NanoSeconds team from BVCOE

Built for advancing **SDG 15: Life on Land** through AI-powered conservation technology.

---

**Happy coding! 🌿** Help us protect biodiversity through technology. -->

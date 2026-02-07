import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/30 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">EcoLens</span>
            </div>
            <p className="text-foreground/70 text-sm">
              AI-powered biodiversity monitoring for conservation efforts advancing SDG 15.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h3 className="font-semibold">Product</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/recognize" className="text-foreground/70 hover:text-foreground transition-colors block">
                Recognize Species
              </Link>
              <Link href="/gallery" className="text-foreground/70 hover:text-foreground transition-colors block">
                Species Gallery
              </Link>
              <Link href="/api" className="text-foreground/70 hover:text-foreground transition-colors block">
                API Docs
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold">Company</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors block">
                About Us
              </Link>
              <Link href="/impact" className="text-foreground/70 hover:text-foreground transition-colors block">
                Impact
              </Link>
              <Link href="/blog" className="text-foreground/70 hover:text-foreground transition-colors block">
                Blog
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="font-semibold">Legal</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors block">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-foreground/70 hover:text-foreground transition-colors block">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors block">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <div>© {currentYear} EcoLens. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}

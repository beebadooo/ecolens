import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Leaf } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:inline">EcoLens</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/recognize" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Recognize
            </Link>
            <Link href="/gallery" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Gallery
            </Link>
            <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/impact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              Impact
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/recognize">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

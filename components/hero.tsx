'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-8 text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance">
          Identify Species,{' '}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Protect Biodiversity
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto text-balance">
          EcoLens uses advanced AI to instantly recognize and identify species from photographs. Contribute to conservation efforts and advance Sustainable Development Goal 15 with every identification.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/recognize">
            <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90">
              Start Identifying <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

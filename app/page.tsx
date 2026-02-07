import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Leaf, Microscope, Zap, Globe, Users, BadgeCheck } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import HowItWorks from '@/components/how-it-works'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}

function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-4xl">Ready to Make a Difference?</CardTitle>
            <CardDescription className="text-lg mt-4">
              Join thousands of conservationists using AI to protect biodiversity
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recognize">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                Start Identifying <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                Learn More <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

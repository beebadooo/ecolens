import { Card, CardContent } from '@/components/ui/card'
import { Camera, Brain, Database, Share2 } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Camera,
      title: 'Capture',
      description: 'Take a photo of any species you encounter in nature',
      number: '01',
    },
    {
      icon: Brain,
      title: 'Analyze',
      description: 'Our AI analyzes the image to identify the species instantly',
      number: '02',
    },
    {
      icon: Database,
      title: 'Learn',
      description: 'Access detailed information about the species and its habitat',
      number: '03',
    },
    {
      icon: Share2,
      title: 'Contribute',
      description: 'Share your findings and contribute to conservation data',
      number: '04',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">How EcoLens Works</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A simple four-step process to identify species and contribute to conservation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">

                <Card className="border-border/40 bg-gradient-to-br from-background to-secondary/10 h-full">
                  <CardContent className="pt-8 pb-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="text-5xl font-bold text-primary/10 absolute -top-2 -left-2">{step.number}</div>
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center relative z-10">
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-foreground/70">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-border/40">
          <div className="space-y-3 text-center md:text-left">
            <div className="text-3xl font-bold text-primary">Free</div>
            <p className="text-foreground/70">No subscription required to get started with species identification</p>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="text-3xl font-bold text-primary">Fast</div>
            <p className="text-foreground/70">Get results in under a second with our optimized AI models</p>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="text-3xl font-bold text-primary">Impactful</div>
            <p className="text-foreground/70">Every identification contributes to global biodiversity monitoring</p>
          </div>
        </div>
      </div>
    </section>
  )
}

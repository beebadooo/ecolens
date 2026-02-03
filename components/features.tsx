import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Microscope, Zap, Globe, Users, BarChart3, Shield } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Microscope,
      title: 'AI Species Recognition',
      description: 'Instantly identify species from photos with 98% accuracy using advanced machine learning',
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Get instant identification results and detailed species information in seconds',
    },
    {
      icon: Globe,
      title: 'Global Database',
      description: 'Access information on over 10,000 species from ecosystems worldwide',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of conservationists and contribute to citizen science initiatives',
    },
    {
      icon: BarChart3,
      title: 'Impact Tracking',
      description: 'Monitor your conservation contributions and see the real-world impact of your work',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and private. Share only what you want with the community',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Powerful Features for Conservation</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Everything you need to identify species and contribute to biodiversity monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="border-border/40 bg-background/50 hover:bg-background hover:border-primary/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-foreground/70">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

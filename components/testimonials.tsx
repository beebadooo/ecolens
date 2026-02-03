import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Conservation Biologist',
      content: 'EcoLens has revolutionized how we collect field data. The accuracy and speed are impressive.',
      avatar: '👩‍🔬',
      rating: 5,
    },
    {
      name: 'James Rodriguez',
      role: 'Wildlife Photographer',
      content: 'Finally, a tool that helps me identify rare species instantly. Perfect for documentation.',
      avatar: '📷',
      rating: 5,
    },
    {
      name: 'Emily Okonkwo',
      role: 'Environmental Educator',
      content: 'My students love using EcoLens on our nature walks. It makes learning interactive and fun.',
      avatar: '🌍',
      rating: 5,
    },
    {
      name: 'Marcus Thompson',
      role: 'Park Ranger',
      content: 'This app has become an essential part of our monitoring program. Highly recommended!',
      avatar: '🌲',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Trusted by Conservationists</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join thousands of users making a real difference in biodiversity conservation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/40 bg-background/50 flex flex-col">
              <CardContent className="pt-6 flex flex-col flex-1">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-foreground/70 mb-6 flex-1">{testimonial.content}</p>

                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-foreground/60">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

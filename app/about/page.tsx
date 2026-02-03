import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Award, Users, Globe, Target } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const team = [
    {
      name: 'Pakhi Kumar',
      role: 'Founder & Lead AI Engineer',
      bio: 'Ph.D. in Machine Learning from BVCOE, specialized in computer vision for biodiversity.',
    },
    {
      name: 'Dr. Rajesh Singh',
      role: 'Conservation Advisor',
      bio: 'Wildlife biologist with 20+ years of experience in biodiversity monitoring.',
    },
    {
      name: 'Priya Sharma',
      role: 'Product Designer',
      bio: 'UX designer passionate about creating intuitive tools for conservation.',
    },
    {
      name: 'Amit Patel',
      role: 'Full Stack Developer',
      bio: 'Engineer focused on scalable systems for scientific research platforms.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Hero */}
          <section className="space-y-6 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold">About EcoLens</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Using artificial intelligence to protect biodiversity and advance conservation efforts worldwide.
            </p>
          </section>

          {/* Mission */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  EcoLens is dedicated to leveraging artificial intelligence to accelerate species identification and
                  biodiversity monitoring. We believe that accessible technology can democratize conservation, enabling
                  scientists, educators, and citizen scientists to contribute meaningfully to protecting our planet's
                  incredible biodiversity.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  We envision a world where AI-powered tools help governments, NGOs, and communities monitor and protect
                  ecosystems effectively. By advancing SDG 15 (Life on Land), we work toward sustainable development that
                  preserves biodiversity for future generations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, title: 'Accurate', desc: '98% identification accuracy' },
                { icon: Globe, title: 'Global', desc: '10,000+ species supported' },
                { icon: Award, title: 'Trusted', desc: 'By conservationists worldwide' },
                { icon: Users, title: 'Community', desc: '50,000+ active users' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <Card key={i} className="border-border/40 bg-background/50">
                    <CardContent className="pt-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Technology */}
          <section className="space-y-8 bg-secondary/10 rounded-xl p-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
              <p className="text-foreground/70 text-lg mb-6">
                EcoLens uses state-of-the-art deep learning models trained on millions of species images to achieve
                industry-leading accuracy in species identification. Our system is designed for:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Real-time Processing',
                  desc: 'Get species identification results in under 1 second',
                },
                {
                  title: 'Mobile First',
                  desc: 'Works seamlessly on smartphones for field research',
                },
                {
                  title: 'Continuous Learning',
                  desc: 'Model improves with every identification',
                },
              ].map((tech, i) => (
                <Card key={i} className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{tech.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{tech.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team */}
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-foreground/70 text-lg">
                Founded by a team of AI researchers and conservation experts from BVCOE
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {team.map((member, i) => (
                <Card key={i} className="border-border/40 bg-background/50">
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Accuracy', desc: 'We prioritize precision in every identification' },
                { title: 'Accessibility', desc: 'Tools should be available to everyone' },
                { title: 'Transparency', desc: 'We share our data and methodology openly' },
                { title: 'Impact', desc: 'Everything we do serves conservation' },
              ].map((value, i) => (
                <Card key={i} className="border-border/40 bg-background/50 text-center">
                  <CardContent className="pt-8">
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-foreground/70 text-sm">{value.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Join Us?</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Start identifying species and contributing to global biodiversity monitoring today.
            </p>
            <Link href="/recognize">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}

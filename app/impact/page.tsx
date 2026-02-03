import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, MapPin, Award } from 'lucide-react'

export default function ImpactPage() {
  const stats = [
    {
      icon: BarChart3,
      value: '1.2M',
      label: 'Species Identifications',
      description: 'Total identifications contributed to conservation',
    },
    {
      icon: MapPin,
      value: '150+',
      label: 'Countries',
      description: 'EcoLens used across continents',
    },
    {
      icon: Award,
      value: '$5M+',
      label: 'Conservation Funding',
      description: 'Research enabled by our data',
    },
    {
      icon: TrendingUp,
      value: '50K+',
      label: 'Active Users',
      description: 'Citizen scientists contributing daily',
    },
  ]

  const projects = [
    {
      title: 'Amazon Rainforest Monitoring',
      org: 'WWF Brazil',
      impact: 'Identified 2,847 species in remote areas, helping track biodiversity changes',
      year: '2024',
    },
    {
      title: 'African Wildlife Census',
      org: 'African Conservation Foundation',
      impact: 'Used EcoLens to monitor elephant populations across 5 countries',
      year: '2024',
    },
    {
      title: 'Marine Species Tracking',
      org: 'Ocean Conservation International',
      impact: 'Documented 156 new species sightings, contributing to ocean health research',
      year: '2023',
    },
    {
      title: 'Urban Biodiversity Project',
      org: 'City Environmental Coalition',
      impact: 'Mapped urban species diversity across 20 major cities',
      year: '2023',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Hero */}
          <section className="space-y-6 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold">Our Impact</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Real-world conservation outcomes enabled by EcoLens technology and our community
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <Card key={i} className="border-border/40 bg-background/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">{stat.value}</div>
                        <CardTitle className="text-lg">{stat.label}</CardTitle>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </section>

          {/* SDG Impact */}
          <section className="bg-secondary/10 rounded-xl p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Advancing SDG 15: Life on Land</h2>
              <p className="text-foreground/70 text-lg max-w-3xl">
                EcoLens directly supports the United Nations Sustainable Development Goal 15 by enabling more effective
                biodiversity monitoring, species conservation, and ecosystem protection worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  goal: 'Protect Ecosystems',
                  desc: 'Accurate species data enables better habitat protection decisions',
                },
                {
                  goal: 'Combat Poaching',
                  desc: 'Real-time monitoring helps identify endangered species in danger',
                },
                {
                  goal: 'Support Research',
                  desc: 'Open data contributes to peer-reviewed conservation studies',
                },
              ].map((item, i) => (
                <Card key={i} className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.goal}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Conservation Projects */}
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Conservation Projects</h2>
              <p className="text-foreground/70">Organizations using EcoLens for real conservation work</p>
            </div>

            <div className="space-y-4">
              {projects.map((project, i) => (
                <Card key={i} className="border-border/40 bg-background/50 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.org}</CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded">{project.year}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{project.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Community */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-secondary/10 rounded-xl p-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Powered by Community</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">50,000+ Active Researchers</h3>
                  <p className="text-foreground/70">
                    From professional biologists to citizen scientists contributing daily identifications
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">1.2 Million+ Identifications</h3>
                  <p className="text-foreground/70">Collectively helping us understand global biodiversity patterns</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">20+ Research Publications</h3>
                  <p className="text-foreground/70">
                    Peer-reviewed studies based on EcoLens data and identifications
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Scientists', value: '5,000+' },
                { title: 'Educators', value: '8,000+' },
                { title: 'Students', value: '25,000+' },
                { title: 'Citizen Scientists', value: '12,000+' },
              ].map((group, i) => (
                <Card key={i} className="border-border/40 bg-background/50 text-center">
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-primary mb-1">{group.value}</div>
                    <p className="text-sm text-foreground/70">{group.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Future Goals */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">2025+ Goals</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  goal: 'Expand Database',
                  desc: 'Add 5,000 more species to our identification model',
                },
                {
                  goal: 'Mobile App',
                  desc: 'Launch native iOS and Android applications for field work',
                },
                {
                  goal: 'Research Partnerships',
                  desc: 'Collaborate with 50+ universities on conservation research',
                },
                {
                  goal: 'Climate Integration',
                  desc: 'Add climate change impact assessments to all species profiles',
                },
              ].map((item, i) => (
                <Card key={i} className="border-border/40 bg-background/50">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.goal}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}

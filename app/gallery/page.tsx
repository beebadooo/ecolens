'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Users } from 'lucide-react'
import { Metadata } from 'next'

const speciesData = [
  {
    id: 1,
    name: 'Bengal Tiger',
    scientific: 'Panthera tigris tigris',
    category: 'Mammals',
    region: 'India',
    identifications: 1243,
    status: 'Endangered',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    name: 'Giant Panda',
    scientific: 'Ailuropoda melanoleuca',
    category: 'Mammals',
    region: 'China',
    identifications: 892,
    status: 'Vulnerable',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 3,
    name: 'African Elephant',
    scientific: 'Loxodonta africana',
    category: 'Mammals',
    region: 'Africa',
    identifications: 2156,
    status: 'Vulnerable',
    color: 'from-gray-600 to-gray-800',
  },
  {
    id: 4,
    name: 'Blue Whale',
    scientific: 'Balaenoptera musculus',
    category: 'Marine',
    region: 'Oceans',
    identifications: 456,
    status: 'Endangered',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 5,
    name: 'Scarlet Macaw',
    scientific: 'Ara macao',
    category: 'Birds',
    region: 'Central America',
    identifications: 1567,
    status: 'Least Concern',
    color: 'from-red-500 to-yellow-500',
  },
  {
    id: 6,
    name: 'Mountain Gorilla',
    scientific: 'Gorilla beringei',
    category: 'Mammals',
    region: 'Africa',
    identifications: 634,
    status: 'Endangered',
    color: 'from-gray-800 to-black',
  },
]

export default function GalleryPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = speciesData.filter(
    (species) =>
      (search === '' || species.name.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCategory === null || species.category === selectedCategory),
  )

  const categories = ['Mammals', 'Birds', 'Marine', 'Reptiles', 'Amphibians']

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Endangered':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Vulnerable':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Least Concern':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold">Species Gallery</h1>
            <p className="text-lg text-foreground/70">
              Explore species from around the world that have been identified with EcoLens
            </p>
          </div>

          <Card className="mb-8 border-border/40 bg-background/50">
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <Input
                    placeholder="Search species..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-secondary/20 border-border/40"
                  />
                </div>
                <Button variant="outline">Filters</Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((species) => (
                <Card
                  key={species.id}
                  className="border-border/40 bg-background/50 hover:border-primary/40 hover:bg-background transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-br ${species.color} opacity-20`} />

                  <CardHeader className="-mt-16 relative">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-2xl">{species.name}</CardTitle>
                        <CardDescription className="italic">{species.scientific}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(species.status)} variant="outline">
                        {species.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{species.category}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <MapPin className="w-4 h-4 text-primary" />
                        {species.region}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground/70">
                        <Users className="w-4 h-4 text-primary" />
                        {species.identifications.toLocaleString()} identifications
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">Learn More</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-foreground/70">No species found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

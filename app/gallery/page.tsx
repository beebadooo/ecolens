'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, MapPin, Users, Upload, Trash2, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { auth } from '@/lib/firebase'
import { signOut as firebaseSignOut } from 'firebase/auth'

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
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [userGallery, setUserGallery] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  // Fetch user's gallery
  useEffect(() => {
    const fetchUserGallery = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setUserGallery(userData.gallery || [])
          }
        } catch (error) {
          console.error('Error fetching gallery:', error)
        }
      }
    }

    fetchUserGallery()
  }, [user])

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    setUploadError(null)
    setUploadSuccess(false)

    try {
      const newImage = await uploadImage(user.uid, file)
      setUserGallery([newImage, ...userGallery])
      setUploadSuccess(true)
      
      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error: any) {
      setUploadError(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    if (!user) return

    try {
      await deleteImage(user.uid, imageId, imageUrl)
      setUserGallery(userGallery.filter((img) => img.id !== imageId))
    } catch (error: any) {
      setUploadError(error.message || 'Failed to delete image')
    }
  }

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth)
      router.push('/login')
    } catch (error: any) {
      setUploadError(error.message || 'Failed to logout')
    }
  }

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

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col items-center justify-center">
        <p className="text-foreground/70">Loading...</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return null // Redirect is happening in useEffect
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* User Header & Logout */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold">Species Gallery</h1>
              <p className="text-lg text-foreground/70 mt-2">
                Welcome, {user?.displayName || user?.email}!
              </p>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Upload Section */}
          <Card className="mb-8 border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle>Upload Your Wildlife Photos</CardTitle>
              <CardDescription>
                Click to upload images of wildlife you've spotted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploadError && (
                <Alert variant="destructive">
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}
              {uploadSuccess && (
                <Alert className="bg-green-500/10 border-green-500/30 text-green-400">
                  <AlertDescription>Image uploaded successfully!</AlertDescription>
                </Alert>
              )}
              
              <div className="flex gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
                <Button
                  className="gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User's Gallery */}
          {userGallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Your Uploads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGallery.map((image) => (
                  <Card key={image.id} className="border-border/40 bg-background/50 overflow-hidden">
                    <div className="relative">
                      <img
                        src={image.url}
                        alt={image.fileName}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleDeleteImage(image.id, image.url)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-sm text-foreground/70 truncate">{image.fileName}</p>
                      <p className="text-xs text-foreground/50 mt-1">
                        {new Date(image.uploadedAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Species Gallery */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Global Species Database</h2>
              <p className="text-lg text-foreground/70 mb-8">
                Explore species from around the world that have been identified with EcoLens
              </p>
            </div>

            <Card className="border-border/40 bg-background/50">
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
      </div>

      <Footer />
    </main>
  )
}

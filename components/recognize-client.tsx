'use client'

import React from "react"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Camera, Upload, Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react'

type SpeciesIdentification = {
  name: string
  scientificName: string
  description: string
  habitat: string
  conservation: string
  population: string
  threats: string[]
  confidence: number
}

export default function RecognitionClient() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SpeciesIdentification | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = e.target?.result as string
        setImage(img)
        setError(null)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIdentify = async () => {
    if (!image) return
    setLoading(true)
    setError(null)

    try {
      // Convert base64 image to Blob
      const base64Data = image.split(',')[1]
      const mimeType = image.match(/data:([^;]+)/)?.[1] || 'image/jpeg'
      const binaryData = atob(base64Data)
      const uint8Array = new Uint8Array(binaryData.length)
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i)
      }
      const blob = new Blob([uint8Array], { type: mimeType })
      
      // Create FormData and send to API
      const formData = new FormData()
      formData.append('file', blob, 'image')
      
      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to identify species')
      }
      
      const identification = await response.json()
      setResult(identification)
    } catch (err: any) {
      setError(err.message || 'Failed to identify species. Please try a clearer image.')
      console.error('Identification error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold">Identify Species</h1>
            <p className="text-lg text-foreground/70">
              Upload or capture a photo to identify species with AI-powered recognition
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="border-border/40 bg-background/50">
              <CardHeader>
                <CardTitle>Upload Photo</CardTitle>
                <CardDescription>Choose an image of a species you want to identify</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!image ? (
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Drag and drop your image</p>
                      <p className="text-foreground/60">or click to select a file</p>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 gap-2 bg-transparent"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4" />
                        Choose File
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={() => cameraInputRef.current?.click()}>
                        <Camera className="w-4 h-4" />
                        Take Photo
                      </Button>
                    </div>

                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative w-full h-64 bg-secondary/20 rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt="Uploaded species"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <Button
                      onClick={handleIdentify}
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Identifying...
                        </>
                      ) : (
                        'Identify Species'
                      )}
                    </Button>

                    <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
                      Upload Different Image
                    </Button>
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Results Section */}
            {result && (
              <Card className="border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <CardTitle>Species Identified</CardTitle>
                  </div>
                  <CardDescription>Confidence: {result.confidence}%</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{result.name}</h3>
                    <p className="text-foreground/70 italic">{result.scientificName}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Description
                      </h4>
                      <p className="text-foreground/70 text-sm">{result.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        Habitat
                      </h4>
                      <p className="text-foreground/70 text-sm">{result.habitat}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-1 text-sm">Conservation Status</h4>
                        <p
                          className={`font-medium ${
                            result.conservation?.toLowerCase() === 'vulnerable'
                              ? 'text-red-500'
                              : 'text-primary'
                          }`}
                        >
                          {result.conservation}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-sm">Population</h4>
                        <p className="text-foreground/70 text-sm">{result.population}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Threats
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.threats.map((threat: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                            {threat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-border/40">
                    <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                      <Download className="w-4 h-4" />
                      Save Report
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={handleReset}>
                      Identify Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Section */}
            {!result && (
              <Card className="border-border/40 bg-background/50">
                <CardHeader>
                  <CardTitle>How to Get Best Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Clear Photo',
                        desc: 'Take a clear, well-lit photo of the species from a closer distance',
                      },
                      {
                        title: 'Multiple Angles',
                        desc: 'Include distinctive features like markings, colors, and body shape',
                      },
                      {
                        title: 'Good Lighting',
                        desc: 'Natural daylight provides the best results for identification',
                      },
                      {
                        title: 'Context',
                        desc: 'Include habitat context to improve accuracy and relevance',
                      },
                    ].map((tip, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">{tip.title}</h4>
                          <p className="text-foreground/70 text-sm">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card className="bg-primary/5 border-primary/20 mt-6">
                    <CardContent className="pt-4">
                      <p className="text-sm text-foreground/70">
                        <strong>💡 Tip:</strong> Your identifications contribute to a global database helping scientists
                        monitor biodiversity. Every identification counts!
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import Link from 'next/link'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!email || !password) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      if (!email.includes('@')) {
        setError('Please enter a valid email')
        setIsLoading(false)
        return
      }

      // Sign in with Firebase
      await signIn(email, password)
      
      // Redirect to gallery after successful login
      router.push('/gallery')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card className="border-border/40 bg-background/50">
            <CardHeader className="space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Welcome to EcoLens</CardTitle>
              <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/20 border-border/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-secondary/20 border-border/40 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm text-foreground/70">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>


              <div className="text-center text-sm text-foreground/70">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-foreground/60">
            <p>
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

'use client'

import React from "react"

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Leaf } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields')
      } else if (!email.includes('@')) {
        setError('Please enter a valid email')
      } else {
        setError(null)
        // In a real app, this would redirect to dashboard
      }
      setIsLoading(false)
    }, 500)
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

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/40" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-foreground/60">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h2.84c.58-1.80 2.38-3.08 4.67-3.08 3.31 0 6.31 2.63 6.31 6.26 0 .61.05 1.25.07 1.9H2.5V8h2.75c.75-1.39 2.30-2.30 4.14-2.30 1.49 0 2.84.67 3.77 1.67h1.82zm-3.05 6.59c0 .54.44.95.96.95.54 0 .96-.41.96-.95 0-.54-.41-.96-.96-.96-.52 0-.96.42-.96.96zm9.07 0c0 .54.44.95.96.95.54 0 .96-.41.96-.95 0-.54-.41-.96-.96-.96-.52 0-.96.42-.96.96z" />
                  </svg>
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  </svg>
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22.5c-5.799 0-10.5-4.701-10.5-10.5s4.701-10.5 10.5-10.5 10.5 4.701 10.5 10.5-4.701 10.5-10.5 10.5zm3.5-10.5c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5z" />
                  </svg>
                </Button>
              </div>

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

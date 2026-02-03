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
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Leaf, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions')
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      setIsLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 flex flex-col">
        <Header />

        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <Card className="border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10 text-center">
              <CardContent className="pt-12 pb-8 space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Account Created!</h2>
                  <p className="text-foreground/70">
                    Welcome to EcoLens. A verification link has been sent to your email.
                  </p>
                </div>

                <div className="bg-background/30 rounded-lg p-4 text-left">
                  <p className="text-sm text-foreground/70 mb-2">
                    <strong>Next steps:</strong>
                  </p>
                  <ul className="text-sm space-y-1 text-foreground/70 list-decimal list-inside">
                    <li>Check your email for verification link</li>
                    <li>Click the link to verify your email</li>
                    <li>Start identifying species and contributing</li>
                  </ul>
                </div>

                <Link href="/login" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">Return to Login</Button>
                </Link>

                <p className="text-sm text-foreground/60">
                  Didn't receive an email?{' '}
                  <button className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Resend verification
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </main>
    )
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
              <CardTitle className="text-center text-2xl">Create Your EcoLens Account</CardTitle>
              <CardDescription className="text-center">Join our community of conservation scientists</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Jane Researcher"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-secondary/20 border-border/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary/20 border-border/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
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
                  <p className="text-xs text-foreground/60">At least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-secondary/20 border-border/40 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="text-sm text-foreground/70 cursor-pointer">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center text-sm text-foreground/70">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-xs text-foreground/60">
            <p>By creating an account, you're helping us build a better future for biodiversity.</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

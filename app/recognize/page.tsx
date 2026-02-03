import { Metadata } from 'next'
import RecognitionClient from '@/components/recognize-client'

export const metadata: Metadata = {
  title: 'Identify Species - EcoLens',
  description: 'Upload or capture a photo to identify species using AI-powered recognition.',
}

export default function RecognizePage() {
  return <RecognitionClient />
}

import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/30 border-t border-border/40">
      <Separator className="bg-border/40" />
      <div className="flex h-14 items-center justify-center text-center text-sm text-muted-foreground">
        © {currentYear} EcoLens. All rights reserved.
      </div>
    </footer>
  )
}

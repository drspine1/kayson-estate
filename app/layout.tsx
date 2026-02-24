import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { PropertyProvider } from '@/lib/property-store'
import { Toaster } from 'sonner'

import './globals.css'

export const metadata: Metadata = {
  title: 'Kaison Estate - Premium Real Estate Platform',
  description: 'Discover luxury properties and real estate investment opportunities on Kaison Estate, the premier platform for discerning buyers, sellers, and real estate professionals.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-sans antialiased">
          <PropertyProvider>
            {children}
            <Toaster position="top-right" />
          </PropertyProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

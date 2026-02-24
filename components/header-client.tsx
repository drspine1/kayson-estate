'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { MobileMenu } from '@/components/mobile-menu'
import { UserButton, useUser } from '@clerk/nextjs'

export function HeaderClient() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="hidden sm:inline text-lg font-semibold text-foreground">
              Kaison Estate
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/properties"
              className={`text-base font-medium transition-colors ${
                pathname === '/properties' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className={`text-base font-medium transition-colors ${
                pathname === '/about' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`text-base font-medium transition-colors ${
                pathname === '/services' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className={`text-base font-medium transition-colors ${
                pathname === '/contact' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link href="/dashboard/buyer">
                  <Button variant="ghost" className="text-sm">
                    Dashboard
                  </Button>
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <MobileMenu isSignedIn={!!isSignedIn} />
        </div>
      </div>
    </header>
  )
}

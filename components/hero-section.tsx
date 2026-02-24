'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/images/hero-bg.jpg" 
          alt="Luxury penthouse with city view" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      {/* Animated background elements overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px]">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Discover Your Dream Property
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Explore premium real estate investments from trusted property professionals. Find your perfect home or investment opportunity.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-xl p-6 md:p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Location"
                  className="pl-10 bg-input text-foreground border-border"
                />
              </div>
              <Input
                placeholder="Property Type"
                className="bg-input text-foreground border-border"
              />
              <Input
                placeholder="Max Price"
                type="number"
                className="bg-input text-foreground border-border"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              <p className="text-sm text-muted-foreground">Over 5,000+ Premium Properties</p>
              <Link href="/properties">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full md:w-auto">
                  <Search className="w-4 h-4" />
                  Search Properties
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-8 text-white"
          >
            <div>
              <p className="text-2xl md:text-3xl font-bold">5000+</p>
              <p className="text-sm md:text-base text-white/80">Premium Properties</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">50k+</p>
              <p className="text-sm md:text-base text-white/80">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">100%</p>
              <p className="text-sm md:text-base text-white/80">Trusted</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

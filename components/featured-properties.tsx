'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, MapPin, Bed, Bath, Ruler } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
  tag?: string
}

const featuredProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Penthouse',
    location: 'Downtown Manhattan, NYC',
    price: 2500000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 4500,
    image: '/images/property-1.jpg',
    tag: 'Featured',
  },
  {
    id: '2',
    title: 'Waterfront Estate',
    location: 'Miami Beach, FL',
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 6800,
    image: '/images/property-2.jpg',
    tag: 'Trending',
  },
  {
    id: '3',
    title: 'Contemporary Townhouse',
    location: 'San Francisco, CA',
    price: 1800000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 5200,
    image: '/images/property-3.jpg',
  },
  {
    id: '4',
    title: 'Luxury Estate Villa',
    location: 'Los Angeles, CA',
    price: 4100000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 7500,
    image: '/images/property-1.jpg',
  },
]

export function FeaturedProperties() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hand-picked premium properties curated by our expert team for discerning investors and homeowners.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, index) => (
            <AnimateOnScroll key={property.id} delay={index * 0.1}>
              <Link href={`/properties/${property.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full cursor-pointer group">
                <div className="relative h-64 bg-muted overflow-hidden">
                  <Image 
                    src={property.image} 
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {property.tag && (
                    <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {property.tag}
                    </div>
                  )}
                  <button className="absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-foreground" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                  </div>

                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-border text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="w-4 h-4" />
                      <span>{(property.sqft / 1000).toFixed(1)}k</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Starting Price</p>
                      <p className="text-xl font-bold text-primary">
                        ${(property.price / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse All Properties
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

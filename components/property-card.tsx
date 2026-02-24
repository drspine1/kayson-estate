'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, MapPin, Bed, Bath, Ruler, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  tag?: string
  featured?: boolean
  onFavorite?: (id: string, isFavorited: boolean) => void
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  sqft,
  tag,
  featured = false,
  onFavorite,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorited(!isFavorited)
    onFavorite?.(id, !isFavorited)
  }

  return (
    <Link href={`/properties/${id}`}>
      <Card className={`overflow-hidden hover:shadow-lg transition-all h-full cursor-pointer group ${featured ? 'ring-2 ring-accent' : ''}`}>
        <div className="relative h-64 bg-muted overflow-hidden">
          <Image 
            src={`/images/listing-${(parseInt(id) % 6) + 1}.jpg`}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {tag && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {tag}
            </div>
          )}

          {featured && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Premium
            </div>
          )}

          <div className="absolute top-3 right-12 flex gap-2">
            <button
              onClick={handleFavorite}
              className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              />
            </button>
            <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="grid grid-cols-3 gap-3 py-4 border-y border-border text-sm text-muted-foreground mb-4">
            <div className="flex flex-col items-center gap-1">
              <Bed className="w-4 h-4" />
              <span className="text-xs">{bedrooms}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bath className="w-4 h-4" />
              <span className="text-xs">{bathrooms}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Ruler className="w-4 h-4" />
              <span className="text-xs">{(sqft / 1000).toFixed(1)}k</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-xl font-bold text-primary">
                ${(price / 1000000).toFixed(2)}M
              </p>
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}

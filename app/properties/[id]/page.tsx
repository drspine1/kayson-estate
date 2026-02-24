'use client'

import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Share2, MapPin, Bed, Bath, Ruler, Wifi, Wind, Zap, Droplets, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, use } from 'react'

interface PropertyDetails {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  description: string
  amenities: string[]
  yearBuilt: number
  lotSize: number
  propertyType: string
  status: string
  agent: {
    name: string
    title: string
    phone: string
    email: string
  }
  features: string[]
}

// Mock property data - in real app this would come from API
const propertyData: Record<string, PropertyDetails> = {
  '1': {
    id: '1',
    title: 'Modern Luxury Penthouse',
    location: 'Downtown Manhattan, NYC',
    price: 2500000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 4500,
    description: 'Experience luxury living in this stunning penthouse located in the heart of Manhattan. This architectural masterpiece features floor-to-ceiling windows, state-of-the-art amenities, and breathtaking city views. Perfect for the discerning buyer seeking the ultimate urban lifestyle.',
    amenities: ['Modern Kitchen', 'Smart Home System', 'Private Balcony', 'Gym Access', 'Concierge Service', 'Parking', 'Security System', 'High-Speed Internet'],
    yearBuilt: 2020,
    lotSize: 4500,
    propertyType: 'Apartment',
    status: 'Active',
    agent: {
      name: 'Sarah Mitchell',
      title: 'Senior Real Estate Agent',
      phone: '+1 (555) 123-4567',
      email: 'sarah.mitchell@kaisonestate.com',
    },
    features: ['Hardwood Floors', 'Central Heating/Cooling', 'In-Unit Laundry', 'Walk-in Closets', 'Modern Finishes'],
  },
  '2': {
    id: '2',
    title: 'Waterfront Estate',
    location: 'Miami Beach, FL',
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 6800,
    description: 'Exceptional waterfront property with direct beach access and panoramic ocean views. This luxury estate features premium finishes, resort-style amenities, and is ideal for families seeking a sophisticated coastal lifestyle.',
    amenities: ['Private Beach Access', 'Pool', 'Spa', 'Home Theater', 'Wine Cellar', 'Gourmet Kitchen', 'Guest House', 'Landscaped Gardens'],
    yearBuilt: 2018,
    lotSize: 15000,
    propertyType: 'Villa',
    status: 'Active',
    agent: {
      name: 'Michael Rodriguez',
      title: 'Luxury Property Specialist',
      phone: '+1 (555) 987-6543',
      email: 'michael.rodriguez@kaisonestate.com',
    },
    features: ['Ocean View', 'Private Dock', 'Infinity Pool', 'Marble Counters', 'Custom Architecture'],
  },
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = propertyData[id] || propertyData['1']
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 5)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 5) % 5)
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/properties">
          <Button variant="ghost" className="mb-6 text-primary hover:text-primary hover:bg-transparent">
            ← Back to Properties
          </Button>
        </Link>

        {/* Property Image Gallery */}
        <div className="relative bg-muted rounded-xl overflow-hidden mb-8">
          <div className="relative h-96 md:h-[500px] bg-muted">
            <Image 
              src={`/images/detail-${(currentImageIndex % 6) + 1}.jpg`}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Image Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all z-10 group"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all z-10 group"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2, 3, 4].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="bg-white/90 hover:bg-white p-3 rounded-full transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              />
            </button>
            <button className="bg-white/90 hover:bg-white p-3 rounded-full transition-colors">
              <Share2 className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-4">
                <MapPin className="w-5 h-5" />
                {property.location}
              </div>
              <div className="text-4xl font-bold text-primary mb-4">
                ${(property.price / 1000000).toFixed(2)}M
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-4 gap-4 bg-card border border-border rounded-lg p-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Bed className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Bath className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Ruler className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{(property.sqft / 1000).toFixed(1)}k</p>
                  <p className="text-sm text-muted-foreground">Sq Ft</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <AlertCircle className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{property.yearBuilt}</p>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">About This Property</h2>
                  <p className="text-foreground/80 leading-relaxed mb-4">{property.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 bg-muted p-3 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Property Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 bg-card border border-border p-4 rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {amenity.includes('Kitchen') ? (
                          <Zap className="w-5 h-5 text-primary" />
                        ) : amenity.includes('Wifi') ? (
                          <Wifi className="w-5 h-5 text-primary" />
                        ) : amenity.includes('Pool') ? (
                          <Droplets className="w-5 h-5 text-primary" />
                        ) : (
                          <Wind className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <span className="text-foreground font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Property Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <span className="text-foreground font-medium">Property Type</span>
                    <span className="text-muted-foreground">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <span className="text-foreground font-medium">Status</span>
                    <span className="text-green-600 font-medium">{property.status}</span>
                  </div>
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <span className="text-foreground font-medium">Year Built</span>
                    <span className="text-muted-foreground">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <span className="text-foreground font-medium">Lot Size</span>
                    <span className="text-muted-foreground">{property.lotSize.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <span className="text-foreground font-medium">Living Space</span>
                    <span className="text-muted-foreground">{property.sqft.toLocaleString()} sq ft</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Agent Info and Contact */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            <Card className="p-6 mb-6 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-4">Listing Agent</h3>

              <div className="relative w-20 h-20 rounded-full mb-4 overflow-hidden flex-shrink-0">
                <Image 
                  src={`/images/agent-${(parseInt(property.id) % 3) + 1}.jpg`}
                  alt={property.agent.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h4 className="text-lg font-bold text-foreground mb-1">{property.agent.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{property.agent.title}</p>

              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="block w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg text-center font-medium hover:bg-primary/90 transition-colors"
                >
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="block w-full border border-primary text-primary py-2 px-4 rounded-lg text-center font-medium hover:bg-primary/10 transition-colors"
                >
                  Email Agent
                </a>
              </div>

              <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                Schedule Tour
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
                  Save Property
                </Button>
                <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
                  Share Property
                </Button>
                <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted">
                  Get Mortgage Calculator
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

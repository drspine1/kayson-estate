'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

export interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  tag?: string
  featured?: boolean
  image?: string
  description?: string
  vendorId?: string
  status?: string
}

interface PropertyStore {
  properties: Property[]
  savedProperties: Property[]
  addProperty: (property: Property) => void
  removeProperty: (id: string) => void
  saveProperty: (property: Property) => void
  unsaveProperty: (id: string) => void
  isPropertySaved: (id: string) => boolean
}

const PropertyContext = createContext<PropertyStore | undefined>(undefined)

// Initial properties data
const initialProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Penthouse',
    location: 'Downtown Manhattan, NYC',
    price: 2500000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 4500,
    tag: 'Featured',
    featured: true,
    image: '/images/property-1.jpg',
    description: 'Experience luxury living in this stunning penthouse',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Waterfront Estate',
    location: 'Miami Beach, FL',
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 6800,
    tag: 'Trending',
    image: '/images/property-2.jpg',
    description: 'Stunning waterfront property with ocean views',
    status: 'Active',
  },
  {
    id: '3',
    title: 'Historic Victorian Mansion',
    location: 'San Francisco, CA',
    price: 1800000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 5200,
    image: '/images/property-3.jpg',
    description: 'Beautifully restored Victorian mansion',
    status: 'Active',
  },
  {
    id: '4',
    title: 'Contemporary Beach House',
    location: 'Malibu, CA',
    price: 4500000,
    bedrooms: 6,
    bathrooms: 5,
    sqft: 7500,
    featured: true,
    image: '/images/property-1.jpg',
    description: 'Luxurious beachfront property',
    status: 'Active',
  },
  {
    id: '5',
    title: 'Mountain Retreat',
    location: 'Aspen, CO',
    price: 2800000,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 5500,
    image: '/images/property-2.jpg',
    description: 'Secluded mountain getaway',
    status: 'Active',
  },
  {
    id: '6',
    title: 'Urban Loft',
    location: 'Brooklyn, NY',
    price: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2800,
    image: '/images/property-3.jpg',
    description: 'Modern loft in trendy neighborhood',
    status: 'Active',
  },
]

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([])
  const [savedProperties, setSavedProperties] = useState<Property[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const storedProperties = localStorage.getItem('properties')
    const storedSaved = localStorage.getItem('savedProperties')
    
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties))
    } else {
      setProperties(initialProperties)
      localStorage.setItem('properties', JSON.stringify(initialProperties))
    }
    
    if (storedSaved) {
      setSavedProperties(JSON.parse(storedSaved))
    }
  }, [])

  // Save to localStorage whenever properties change
  useEffect(() => {
    if (properties.length > 0) {
      localStorage.setItem('properties', JSON.stringify(properties))
    }
  }, [properties])

  useEffect(() => {
    localStorage.setItem('savedProperties', JSON.stringify(savedProperties))
  }, [savedProperties])

  const addProperty = (property: Property) => {
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      status: 'Active',
    }
    setProperties([newProperty, ...properties])
    toast.success('Property listed successfully!')
  }

  const removeProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id))
    setSavedProperties(savedProperties.filter(p => p.id !== id))
    toast.success('Property removed')
  }

  const saveProperty = (property: Property) => {
    if (!savedProperties.find(p => p.id === property.id)) {
      setSavedProperties([...savedProperties, property])
      toast.success('Property saved to favorites!')
    }
  }

  const unsaveProperty = (id: string) => {
    setSavedProperties(savedProperties.filter(p => p.id !== id))
    toast.success('Property removed from favorites')
  }

  const isPropertySaved = (id: string) => {
    return savedProperties.some(p => p.id === id)
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        savedProperties,
        addProperty,
        removeProperty,
        saveProperty,
        unsaveProperty,
        isPropertySaved,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export function usePropertyStore() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error('usePropertyStore must be used within a PropertyProvider')
  }
  return context
}

'use client'

import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { PropertyFilters, FilterState } from '@/components/property-filters'
import { PropertyCard } from '@/components/property-card'
import { Button } from '@/components/ui/button'
import { Grid3x3, List } from 'lucide-react'
import { useState, useMemo } from 'react'
import { usePropertyStore } from '@/lib/property-store'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export default function PropertiesPage() {
  const { properties, saveProperty, unsaveProperty, isPropertySaved } = usePropertyStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    priceRange: [100000, 5000000],
    bedrooms: null,
    bathrooms: null,
    propertyType: [],
    sortBy: 'featured',
  })

  const filteredProperties = useMemo(() => {
    let result = properties.filter(p => p.status === 'Active')

    // Filter by price
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query)
      )
    }

    // Filter by bedrooms
    if (filters.bedrooms) {
      result = result.filter((p) => p.bedrooms >= filters.bedrooms!)
    }

    // Filter by bathrooms
    if (filters.bathrooms) {
      result = result.filter((p) => p.bathrooms >= filters.bathrooms!)
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        result = result.reverse()
        break
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [properties, filters])

  const handleFavorite = (id: string, isFavorited: boolean) => {
    const property = properties.find(p => p.id === id)
    if (!property) return
    
    if (isFavorited) {
      saveProperty(property)
    } else {
      unsaveProperty(id)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <AnimateOnScroll>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Find Your Dream Property
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse {filteredProperties.length} properties available on Kaison Estate
            </p>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <PropertyFilters onFilterChange={setFilters} />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* View Toggle and Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProperties.length} properties
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No properties found matching your criteria.</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProperties.map((property, index) => (
                  <AnimateOnScroll key={property.id} delay={index * 0.05}>
                    <PropertyCard
                      {...property}
                      onFavorite={handleFavorite}
                    />
                  </AnimateOnScroll>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button variant="outline" className="border-border">Previous</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">1</Button>
                <Button variant="outline" className="border-border">2</Button>
                <Button variant="outline" className="border-border">3</Button>
                <Button variant="outline" className="border-border">Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

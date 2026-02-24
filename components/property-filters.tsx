'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface PropertyFiltersProps {
  onFilterChange?: (filters: FilterState) => void
}

export interface FilterState {
  searchQuery: string
  priceRange: [number, number]
  bedrooms: number | null
  bathrooms: number | null
  propertyType: string[]
  sortBy: string
}

export function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([100000, 5000000])
  const [bedrooms, setBedrooms] = useState<number | null>(null)
  const [bathrooms, setBathrooms] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [expandedSection, setExpandedSection] = useState<string | null>('price')

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
    notifyFilterChange()
  }

  const handlePropertyTypeChange = (type: string) => {
    const updated = propertyTypes.includes(type)
      ? propertyTypes.filter(t => t !== type)
      : [...propertyTypes, type]
    setPropertyTypes(updated)
    notifyFilterChange()
  }

  const notifyFilterChange = () => {
    onFilterChange?.({
      searchQuery,
      priceRange,
      bedrooms,
      bathrooms,
      propertyType: propertyTypes,
      sortBy,
    })
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const propertyTypeOptions = ['House', 'Apartment', 'Villa', 'Condo', 'Townhouse']
  const bedroomOptions = [1, 2, 3, 4, 5]
  const bathroomOptions = [1, 2, 3, 4]

  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Search */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Search</h3>
          <Input
            placeholder="Location, address..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              notifyFilterChange()
            }}
            className="bg-input text-foreground border-border"
          />
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between font-semibold text-foreground mb-3 hover:text-primary transition-colors"
          >
            <span>Price Range</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'price' ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSection === 'price' && (
            <div className="space-y-4">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceChange}
                min={0}
                max={10000000}
                step={50000}
                className="w-full"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                  className="bg-input text-foreground border-border text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                  className="bg-input text-foreground border-border text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Property Type */}
        <div>
          <button
            onClick={() => toggleSection('type')}
            className="w-full flex items-center justify-between font-semibold text-foreground mb-3 hover:text-primary transition-colors"
          >
            <span>Property Type</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'type' ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSection === 'type' && (
            <div className="space-y-3">
              {propertyTypeOptions.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={type}
                    checked={propertyTypes.includes(type)}
                    onCheckedChange={() => handlePropertyTypeChange(type)}
                    className="border-border"
                  />
                  <Label htmlFor={type} className="text-sm text-foreground cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bedrooms */}
        <div>
          <button
            onClick={() => toggleSection('bedrooms')}
            className="w-full flex items-center justify-between font-semibold text-foreground mb-3 hover:text-primary transition-colors"
          >
            <span>Bedrooms</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'bedrooms' ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSection === 'bedrooms' && (
            <div className="grid grid-cols-3 gap-2">
              {bedroomOptions.map((num) => (
                <Button
                  key={num}
                  variant={bedrooms === num ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setBedrooms(bedrooms === num ? null : num)
                    notifyFilterChange()
                  }}
                  className={bedrooms === num ? 'bg-primary text-primary-foreground' : ''}
                >
                  {num}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Bathrooms */}
        <div>
          <button
            onClick={() => toggleSection('bathrooms')}
            className="w-full flex items-center justify-between font-semibold text-foreground mb-3 hover:text-primary transition-colors"
          >
            <span>Bathrooms</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${expandedSection === 'bathrooms' ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSection === 'bathrooms' && (
            <div className="grid grid-cols-3 gap-2">
              {bathroomOptions.map((num) => (
                <Button
                  key={num}
                  variant={bathrooms === num ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setBathrooms(bathrooms === num ? null : num)
                    notifyFilterChange()
                  }}
                  className={bathrooms === num ? 'bg-primary text-primary-foreground' : ''}
                >
                  {num}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Sort By</h3>
          <div className="space-y-2">
            {[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
            ].map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'default' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => {
                  setSortBy(option.value)
                  notifyFilterChange()
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}

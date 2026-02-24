'use client'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Home, Eye, DollarSign, Plus, Clock, Check, X, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { RoleSwitcher } from '@/components/role-switcher'
import { useState } from 'react'
import { toast } from 'sonner'
import { usePropertyStore } from '@/lib/property-store'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function VendorDashboard() {
  const { user } = useUser()
  const { properties, addProperty, removeProperty: removeFromStore } = usePropertyStore()
  
  // Get only user's listings (in real app, filter by vendorId)
  const userListings = properties.filter(p => p.status === 'Active')
  
  // Property Listing State
  const [showListingForm, setShowListingForm] = useState(false)
  const [newProperty, setNewProperty] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
  })

  // Add New Listing
  const handleAddListing = () => {
    if (!newProperty.title || !newProperty.price) {
      toast.error('Please fill in required fields')
      return
    }

    addProperty({
      id: '',
      title: newProperty.title,
      location: newProperty.location,
      price: Number(newProperty.price),
      bedrooms: Number(newProperty.bedrooms) || 0,
      bathrooms: Number(newProperty.bathrooms) || 0,
      sqft: 0,
      image: '/images/property-1.jpg',
      description: newProperty.description,
    })

    setNewProperty({ title: '', location: '', price: '', bedrooms: '', bathrooms: '', description: '' })
    setShowListingForm(false)
  }

  // Remove Listing
  const removeListing = (id: string) => {
    removeFromStore(id)
  }

  // Offers State
  const [offers, setOffers] = useState([
    {
      id: '1',
      propertyTitle: 'Modern Luxury Penthouse',
      offerAmount: 2400000,
      buyer: 'John Smith',
      status: 'pending',
    },
    {
      id: '2',
      propertyTitle: 'Waterfront Estate',
      offerAmount: 3100000,
      buyer: 'Jane Doe',
      status: 'pending',
    },
  ])

  // Handle Offer Response
  const handleOffer = (offerId: string, action: 'accept' | 'reject') => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, status: action === 'accept' ? 'accepted' : 'rejected' } : offer
    ))
    toast.success(`Offer ${action}ed successfully!`)
  }

  const totalValue = userListings.reduce((sum, l) => sum + l.price, 0)
  const pendingOffers = offers.filter(o => o.status === 'pending').length

  const stats = [
    {
      icon: Home,
      label: 'Listed Properties',
      value: userListings.length.toString(),
      trend: 'Active listings',
      color: 'text-blue-500',
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: '0',
      trend: 'All time',
      color: 'text-green-500',
    },
    {
      icon: Clock,
      label: 'Pending Offers',
      value: pendingOffers.toString(),
      trend: 'Requires action',
      color: 'text-orange-500',
    },
    {
      icon: DollarSign,
      label: 'Portfolio Value',
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      trend: 'Total value',
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar userType="vendor" />

      <div className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Welcome, {user?.firstName || user?.username || 'Vendor'}!
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mt-1">Manage your properties and track offers</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <RoleSwitcher />
                <Dialog open={showListingForm} onOpenChange={setShowListingForm}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 whitespace-nowrap">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">List New Property</span>
                      <span className="sm:hidden">List Property</span>
                    </Button>
                  </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>List New Property</DialogTitle>
                  <DialogDescription>Add a new property to your listings</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Property Title *</Label>
                    <Input
                      id="title"
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                      placeholder="Modern Luxury Penthouse"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                      placeholder="Downtown Manhattan, NYC"
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                        placeholder="2500000"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={newProperty.bedrooms}
                        onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                        placeholder="3"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={newProperty.bathrooms}
                        onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
                        placeholder="2"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProperty.description}
                      onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                      placeholder="Describe your property..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleAddListing} className="flex-1">
                      List Property
                    </Button>
                    <Button variant="outline" onClick={() => setShowListingForm(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <AnimateOnScroll key={idx} delay={idx * 0.1}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stat.color} p-3 bg-muted rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-sm text-muted-foreground mb-2">{stat.label}</h3>
                  <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.trend}</p>
                </Card>
                </AnimateOnScroll>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Listings */}
            <AnimateOnScroll direction="left" delay={0.2}>
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Active Listings</h2>
                {userListings.length === 0 ? (
                  <div className="text-center py-12">
                    <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No active listings</p>
                    <Button onClick={() => setShowListingForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Property
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userListings.map((listing) => (
                      <div key={listing.id} className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden bg-muted">
                          <Image src={listing.image || '/images/property-1.jpg'} alt={listing.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.location}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeListing(listing.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <span className="font-bold text-primary">${(listing.price / 1000000).toFixed(2)}M</span>
                            <span className={`px-2 py-1 rounded text-xs ${listing.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                              {listing.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
            </AnimateOnScroll>

            {/* Pending Offers */}
            <AnimateOnScroll direction="right" delay={0.3}>
              <div>
                <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Pending Offers</h2>
                  {pendingOffers > 0 && (
                    <div className="w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {pendingOffers}
                    </div>
                  )}
                </div>

                {offers.filter(o => o.status === 'pending').length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No pending offers</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {offers.filter(o => o.status === 'pending').map((offer) => (
                      <div key={offer.id} className="bg-muted p-4 rounded-lg">
                        <h3 className="font-semibold text-foreground text-sm mb-1">{offer.propertyTitle}</h3>
                        <p className="text-xs text-muted-foreground mb-3">From: {offer.buyer}</p>
                        <p className="text-lg font-bold text-primary mb-4">
                          ${(offer.offerAmount / 1000000).toFixed(2)}M
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleOffer(offer.id, 'accept')}
                            className="flex-1 bg-green-500 hover:bg-green-600"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOffer(offer.id, 'reject')}
                            className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {offers.filter(o => o.status !== 'pending').length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recent Actions</h3>
                    {offers.filter(o => o.status !== 'pending').map((offer) => (
                      <div key={offer.id} className="text-xs text-muted-foreground mb-2">
                        {offer.propertyTitle} - {offer.status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  )
}

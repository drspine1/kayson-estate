'use client'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Eye, DollarSign, Calculator, TrendingUp, Home, X, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { RoleSwitcher } from '@/components/role-switcher'
import { useState } from 'react'
import { toast } from 'sonner'
import { usePropertyStore } from '@/lib/property-store'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export default function BuyerDashboard() {
  const { user } = useUser()
  const { savedProperties, unsaveProperty } = usePropertyStore()
  
  // Budget Calculator State
  const [loanAmount, setLoanAmount] = useState(2000000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  // Remove Property
  const removeProperty = (id: string) => {
    unsaveProperty(id)
  }

  // Calculate Mortgage
  const calculateMortgage = () => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    setMonthlyPayment(payment)
    toast.success('Mortgage calculated successfully!')
  }

  const stats = [
    {
      icon: Heart,
      label: 'Saved Properties',
      value: savedProperties.length.toString(),
      trend: 'Active favorites',
      color: 'text-red-500',
    },
    {
      icon: Eye,
      label: 'Property Views',
      value: '84',
      trend: '+12 this week',
      color: 'text-blue-500',
    },
    {
      icon: DollarSign,
      label: 'Budget Range',
      value: `$${(loanAmount / 1000000).toFixed(1)}M`,
      trend: 'Current budget',
      color: 'text-green-500',
    },
    {
      icon: Home,
      label: 'Active Searches',
      value: '3',
      trend: '2 new matches',
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar userType="buyer" />

      <div className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome Back, {user?.firstName || user?.username || 'User'}!
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">Manage your property search and budget</p>
            </div>
            <RoleSwitcher />
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
            {/* Mortgage Calculator */}
            <AnimateOnScroll direction="left" delay={0.2}>
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Mortgage Calculator</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateMortgage}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
                >
                  Calculate Monthly Payment
                </Button>

                {monthlyPayment > 0 && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</p>
                    <p className="text-4xl font-bold text-primary">
                      ${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Total: ${(monthlyPayment * loanTerm * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                )}
              </Card>

              {/* Saved Properties */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Saved Properties</h2>
                  <Link href="/properties">
                    <Button variant="outline">Browse More</Button>
                  </Link>
                </div>

                {savedProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No saved properties yet</p>
                    <Link href="/properties">
                      <Button className="mt-4">Explore Properties</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedProperties.map((property) => (
                      <div
                        key={property.id}
                        className="flex gap-4 pb-4 border-b border-border last:border-0 hover:bg-muted/50 p-3 rounded-lg transition-colors"
                      >
                        <div className="w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden bg-muted">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                            {property.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">{property.location}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                            <span>{property.bedrooms} bed</span>
                            <span>{property.bathrooms} bath</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">
                              ${(property.price / 1000000).toFixed(2)}M
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeProperty(property.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
            </AnimateOnScroll>

            {/* Quick Actions */}
            <AnimateOnScroll direction="right" delay={0.3}>
              <div className="space-y-6">
                <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/properties">
                    <Button className="w-full justify-start" variant="outline">
                      <Home className="w-4 h-4 mr-2" />
                      Browse Properties
                    </Button>
                  </Link>
                  <Button className="w-full justify-start" variant="outline">
                    <Calculator className="w-4 h-4 mr-2" />
                    Affordability Check
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Schedule Viewing
                    </Button>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-2">Pro Tip</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save properties to compare features and prices side-by-side
                </p>
                <Button size="sm" className="w-full">
                  Learn More
                </Button>
              </Card>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  )
}

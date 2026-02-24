'use client'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Home, Users, TrendingUp, DollarSign, Calculator, BarChart3, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { RoleSwitcher } from '@/components/role-switcher'
import { useState } from 'react'
import { toast } from 'sonner'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function RealtorDashboard() {
  const { user } = useUser()
  
  // Commission Calculator State
  const [salePrice, setSalePrice] = useState(3000000)
  const [commissionRate, setCommissionRate] = useState(3)
  const [calculatedCommission, setCalculatedCommission] = useState(0)

  // Clients State
  const [showClientForm, setShowClientForm] = useState(false)
  const [newClient, setNewClient] = useState({
    name: '',
    type: 'buyer',
    budget: '',
    phone: '',
  })
  
  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'John Smith',
      type: 'Buyer',
      budget: '$2M - $3M',
      status: 'Active',
      phone: '+1 (555) 123-4567',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      type: 'Seller',
      budget: 'Selling $2.5M',
      status: 'Active',
      phone: '+1 (555) 234-5678',
    },
    {
      id: '3',
      name: 'Michael Johnson',
      type: 'Buyer',
      budget: '$1M - $2M',
      status: 'Inactive',
      phone: '+1 (555) 345-6789',
    },
  ])

  // Recent Sales State
  const [recentSales, setRecentSales] = useState([
    {
      id: '1',
      property: 'Modern Luxury Penthouse',
      salePrice: 2400000,
      commission: 72000,
      date: '2024-01-15',
    },
    {
      id: '2',
      property: 'Contemporary Villa',
      salePrice: 4000000,
      commission: 120000,
      date: '2024-01-10',
    },
  ])

  // Calculate Commission
  const calculateCommission = () => {
    const commission = (salePrice * commissionRate) / 100
    setCalculatedCommission(commission)
    toast.success('Commission calculated!')
  }

  // Add New Client
  const handleAddClient = () => {
    if (!newClient.name || !newClient.budget) {
      toast.error('Please fill in required fields')
      return
    }

    const client = {
      id: Date.now().toString(),
      name: newClient.name,
      type: newClient.type === 'buyer' ? 'Buyer' : 'Seller',
      budget: newClient.budget,
      status: 'Active',
      phone: newClient.phone,
    }

    setClients([client, ...clients])
    setNewClient({ name: '', type: 'buyer', budget: '', phone: '' })
    setShowClientForm(false)
    toast.success('Client added successfully!')
  }

  // Remove Client
  const removeClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id))
    toast.success('Client removed')
  }

  const activeClients = clients.filter(c => c.status === 'Active').length
  const totalCommissions = recentSales.reduce((sum, s) => sum + s.commission, 0)
  const totalSalesVolume = recentSales.reduce((sum, s) => sum + s.salePrice, 0)

  const stats = [
    {
      icon: Home,
      label: 'Active Listings',
      value: '24',
      trend: '+3 this month',
      color: 'text-blue-500',
    },
    {
      icon: Users,
      label: 'Active Clients',
      value: activeClients.toString(),
      trend: 'Current clients',
      color: 'text-green-500',
    },
    {
      icon: BarChart3,
      label: 'Closed Sales',
      value: recentSales.length.toString(),
      trend: 'This year',
      color: 'text-purple-500',
    },
    {
      icon: DollarSign,
      label: 'Total Commissions',
      value: `$${(totalCommissions / 1000).toFixed(0)}K`,
      trend: 'YTD earnings',
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar userType="realtor" />

      <div className="flex-1 lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome, {user?.firstName || user?.username || 'Realtor'}!
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">Track your performance and manage clients</p>
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
            {/* Commission Calculator & Sales */}
            <AnimateOnScroll direction="left" delay={0.2}>
              <div className="lg:col-span-2 space-y-6">
                {/* Commission Calculator */}
                <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Commission Calculator</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="salePrice">Sale Price ($)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      step="0.1"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateCommission}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
                >
                  Calculate Commission
                </Button>

                {calculatedCommission > 0 && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Your Commission</p>
                    <p className="text-4xl font-bold text-primary">
                      ${calculatedCommission.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      From ${salePrice.toLocaleString('en-US')} sale at {commissionRate}%
                    </p>
                  </div>
                )}
              </Card>

              {/* Recent Sales */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent Sales</h2>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-foreground">{sale.property}</h3>
                        <p className="text-sm text-muted-foreground">{sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${(sale.salePrice / 1000000).toFixed(2)}M</p>
                        <p className="text-sm text-green-500">+${(sale.commission / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            </AnimateOnScroll>

            {/* Client Management */}
            <AnimateOnScroll direction="right" delay={0.3}>
              <div>
                <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">My Clients</h2>
                  <Dialog open={showClientForm} onOpenChange={setShowClientForm}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Client</DialogTitle>
                        <DialogDescription>Add a new client to your portfolio</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="clientName">Client Name *</Label>
                          <Input
                            id="clientName"
                            value={newClient.name}
                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            placeholder="John Smith"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clientType">Client Type *</Label>
                          <Select
                            value={newClient.type}
                            onValueChange={(value) => setNewClient({ ...newClient, type: value })}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buyer">Buyer</SelectItem>
                              <SelectItem value="seller">Seller</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="budget">Budget/Property Value *</Label>
                          <Input
                            id="budget"
                            value={newClient.budget}
                            onChange={(e) => setNewClient({ ...newClient, budget: e.target.value })}
                            placeholder="$2M - $3M"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={newClient.phone}
                            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                            className="mt-2"
                          />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button onClick={handleAddClient} className="flex-1">
                            Add Client
                          </Button>
                          <Button variant="outline" onClick={() => setShowClientForm(false)} className="flex-1">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {clients.map((client) => (
                    <div key={client.id} className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{client.name}</h3>
                          <p className="text-xs text-muted-foreground">{client.type}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeClient(client.id)}
                          className="text-destructive hover:text-destructive h-6 w-6 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{client.budget}</p>
                      {client.phone && (
                        <p className="text-xs text-muted-foreground">{client.phone}</p>
                      )}
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${client.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                          {client.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            </AnimateOnScroll>
          </div>

          {/* Performance Summary */}
          <AnimateOnScroll delay={0.4}>
            <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold text-foreground mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sales Volume</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(totalSalesVolume / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Commission</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(totalCommissions / recentSales.length / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {((recentSales.length / clients.length) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}

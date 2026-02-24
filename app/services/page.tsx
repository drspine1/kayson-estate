'use client'

import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, DollarSign, BarChart3, Shield, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderClient />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <AnimateOnScroll>
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to meet the unique needs of buyers, sellers, and investors
            </p>
          </section>
        </AnimateOnScroll>

        {/* Main Services */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Buyer Services */}
            <AnimateOnScroll direction="left">
              <Card className="p-8 hover:shadow-lg transition-shadow">
              <Home className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Buyer Services</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Expert property search and consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Market analysis and property valuation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Financing guidance and pre-approval assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Negotiation and due diligence support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Closing coordination and legal support</span>
                </li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Learn More
              </Button>
            </Card>
            </AnimateOnScroll>

            {/* Seller Services */}
            <AnimateOnScroll direction="right" delay={0.1}>
              <Card className="p-8 hover:shadow-lg transition-shadow">
              <DollarSign className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Seller Services</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Comprehensive property valuation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Professional marketing and staging guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Premium listing on all major platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Buyer qualification and negotiation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Seamless transaction management</span>
                </li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Learn More
              </Button>
            </Card>
            </AnimateOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Investment Services */}
            <AnimateOnScroll direction="left" delay={0.2}>
              <Card className="p-8 hover:shadow-lg transition-shadow">
              <BarChart3 className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Investment Services</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Investment property analysis and selection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>ROI projections and cash flow analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Portfolio diversification strategies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Tax optimization consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Property management coordination</span>
                </li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Learn More
              </Button>
            </Card>
            </AnimateOnScroll>

            {/* Realtor Services */}
            <AnimateOnScroll direction="right" delay={0.3}>
              <Card className="p-8 hover:shadow-lg transition-shadow">
              <Shield className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Realtor Services</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Advanced listing tools and analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Commission tracking and reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Client relationship management system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Market insights and trending data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Professional support and training</span>
                </li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Learn More
              </Button>
            </Card>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Additional Services */}
        <section className="mb-20">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-foreground mb-12">Additional Services</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Market Research',
                description: 'Stay informed with our comprehensive market analysis, neighborhood insights, and trend reports'
              },
              {
                icon: Clock,
                title: 'Virtual Tours',
                description: 'Explore properties from anywhere with our immersive 3D virtual tours and interactive floor plans'
              },
              {
                icon: Shield,
                title: 'Transaction Security',
                description: 'Rest assured with our secure escrow services, legal protection, and fraud prevention measures'
              }
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <AnimateOnScroll key={index} delay={index * 0.1}>
                  <Card className="p-8 hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </Card>
                </AnimateOnScroll>
              )
            })}
          </div>
        </section>

        {/* Why Choose Us */}
        <AnimateOnScroll>
          <section className="bg-primary/5 rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Kaison Estate?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Expert Professionals', description: 'Access to a network of experienced agents and specialists' },
              { title: 'Cutting-Edge Technology', description: 'Advanced tools and platforms for seamless transactions' },
              { title: 'Transparent Pricing', description: 'Clear, competitive rates with no hidden fees' },
              { title: '24/7 Support', description: 'Dedicated support team available whenever you need assistance' },
              { title: 'Global Reach', description: 'International expertise and connections for worldwide properties' },
              { title: 'Proven Track Record', description: 'Thousands of successful transactions and satisfied clients' }
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-1 bg-accent rounded flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        </AnimateOnScroll>

        {/* CTA Section */}
        <AnimateOnScroll>
          <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Experience Our Services?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our team of experts help you achieve your real estate goals with personalized, professional service.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/properties">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </section>
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  )
}

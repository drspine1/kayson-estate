'use client'

import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, Building2, Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export default function GetStartedPage() {
  const roles = [
    {
      icon: Home,
      title: 'I\'m a Buyer',
      description: 'Looking to find your dream property with expert guidance',
      features: [
        'Search & filter luxury properties',
        'Save favorite listings',
        'Schedule property viewings',
        'Get pre-approval assistance',
        'Track your offers'
      ],
      link: '/sign-up?role=buyer'
    },
    {
      icon: Building2,
      title: 'I\'m a Seller',
      description: 'Ready to sell your property and get maximum value',
      features: [
        'List your property for free',
        'Professional marketing support',
        'Reach qualified buyers',
        'Manage offers and negotiations',
        'Track viewings & inquiries'
      ],
      link: '/sign-up?role=vendor'
    },
    {
      icon: Briefcase,
      title: 'I\'m a Realtor',
      description: 'Grow your business with our platform and tools',
      features: [
        'Manage client listings',
        'Track commissions',
        'Advanced analytics dashboard',
        'Marketing tools & support',
        'Access to resources & training'
      ],
      link: '/sign-up?role=realtor'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <AnimateOnScroll>
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get Started with Kaison Estate</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your role and join thousands of satisfied clients buying, selling, and investing in premium properties.
            </p>
          </section>
        </AnimateOnScroll>

        {/* Role Selection Cards */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon
              return (
                <AnimateOnScroll key={index} delay={index * 0.15}>
                  <Card className="p-8 flex flex-col hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-accent mb-6" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">{role.title}</h2>
                  <p className="text-muted-foreground mb-8">{role.description}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">✓</span>
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={role.link} className="block">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Create Account <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
                </AnimateOnScroll>
              )
            })}
          </div>
        </section>

        {/* Already have account */}
        <AnimateOnScroll>
          <section className="text-center py-12">
          <p className="text-foreground mb-4">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-primary font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </section>
        </AnimateOnScroll>

        {/* How it works */}
        <section className="max-w-3xl mx-auto mb-20">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">How It Works</h2>
          </AnimateOnScroll>
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up for free and complete your profile to get started on your real estate journey'
              },
              {
                step: '02',
                title: 'Explore & Connect',
                description: 'Browse properties, connect with agents, or list your own property on our platform'
              },
              {
                step: '03',
                title: 'Track & Manage',
                description: 'Use your personalized dashboard to track listings, offers, and communications'
              },
              {
                step: '04',
                title: 'Complete Your Transaction',
                description: 'Close your deal with support from our team and secure escrow services'
              }
            ].map((item, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <div className="flex gap-6 pb-8 border-b border-border last:border-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-foreground font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <AnimateOnScroll>
          <section className="bg-primary/5 rounded-xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Kaison Estate?</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: '🏆', title: 'Industry Leaders', description: 'Work with the most trusted names in luxury real estate' },
              { icon: '💯', title: 'Transparent Process', description: 'Clear pricing and no hidden fees on any transaction' },
              { icon: '🔒', title: 'Secure Platform', description: 'Bank-level security to protect your personal information' },
              { icon: '⚡', title: 'Fast Transactions', description: 'Streamlined process to close deals quickly and efficiently' },
              { icon: '🌍', title: 'Global Reach', description: 'Access to international properties and opportunities' },
              { icon: '📱', title: 'Mobile App', description: 'Manage your real estate on the go with our mobile apps' }
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4">
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        </AnimateOnScroll>

        {/* CTA Section */}
        <AnimateOnScroll>
          <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the Kaison Estate community today and discover why thousands of buyers, sellers, and realtors choose us.
          </p>
          <Link href="/sign-up">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base">
              Create Free Account
            </Button>
          </Link>
        </section>
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  )
}

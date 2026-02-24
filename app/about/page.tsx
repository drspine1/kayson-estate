import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Users, Globe, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderClient />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto mb-20">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Kaison Estate</h1>
              <p className="text-xl text-muted-foreground">
                Revolutionizing luxury real estate with transparency, innovation, and excellence
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="relative h-96 rounded-xl overflow-hidden bg-muted mb-12">
              <Image
                src="/images/hero-bg.jpg"
                alt="Kaison Estate Office"
                fill
                className="object-cover"
                priority
              />
            </div>
          </AnimateOnScroll>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll direction="left">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                At Kaison Estate, we believe that finding the perfect property should be seamless, transparent, and enjoyable. Our mission is to connect discerning buyers, sellers, and real estate professionals through a platform built on trust, innovation, and expertise.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We leverage cutting-edge technology and industry knowledge to deliver exceptional results, whether you're looking to invest in a luxury penthouse, sell a family estate, or manage your property portfolio.
              </p>
              <Link href="/properties">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Explore Properties
                </Button>
              </Link>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right" delay={0.2}>
              <div className="relative h-96 rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/images/property-1.jpg"
                  alt="Luxury Property"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We set the highest standards in every aspect of our service'
              },
              {
                icon: Users,
                title: 'Integrity',
                description: 'Transparency and honesty guide all our client relationships'
              },
              {
                icon: Globe,
                title: 'Innovation',
                description: 'We embrace technology to improve the real estate experience'
              },
              {
                icon: TrendingUp,
                title: 'Growth',
                description: 'We help our clients achieve their long-term property goals'
              }
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <AnimateOnScroll key={index} delay={index * 0.1}>
                  <Card className="p-8 hover:shadow-lg transition-shadow">
                    <Icon className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                </AnimateOnScroll>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Leadership Team</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alexander Mitchell',
                title: 'Founder & CEO',
                image: '/images/agent-1.jpg',
                bio: '20+ years in luxury real estate with expertise in international markets'
              },
              {
                name: 'Victoria Chen',
                title: 'Head of Operations',
                image: '/images/agent-2.jpg',
                bio: 'Strategic leader focused on delivering exceptional client experiences'
              },
              {
                name: 'James Anderson',
                title: 'Chief Technology Officer',
                image: '/images/agent-3.jpg',
                bio: 'Tech innovator committed to digital transformation in real estate'
              }
            ].map((member, index) => (
              <AnimateOnScroll key={index} delay={index * 0.15}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-accent font-semibold mb-3">{member.title}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <AnimateOnScroll>
          <section className="bg-primary/5 rounded-xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">By The Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '15,000+', label: 'Properties Listed' },
                { number: '$50B+', label: 'Transaction Volume' },
                { number: '50,000+', label: 'Happy Clients' },
                { number: '150+', label: 'Expert Agents' }
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or investing, our team of experts is here to help you achieve your real estate goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Create Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Get in Touch</Button>
            </Link>
          </div>
          </section>
        </AnimateOnScroll>
      </main>

      <Footer />
    </div>
  )
}

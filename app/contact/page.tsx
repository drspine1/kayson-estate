'use client'

import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { AnimateOnScroll } from '@/components/animate-on-scroll'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would send to a backend
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient />

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <AnimateOnScroll>
          <section className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question about a property or our services? Our team is here to help.
            </p>
          </section>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <AnimateOnScroll direction="left">
              <Card className="p-6">
              <Phone className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
            </Card>
            </AnimateOnScroll>

            <AnimateOnScroll direction="left" delay={0.1}>
              <Card className="p-6">
              <Mail className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground">info@kaisonestate.com</p>
              <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
            </Card>
            </AnimateOnScroll>

            <AnimateOnScroll direction="left" delay={0.2}>
              <Card className="p-6">
              <MapPin className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground">
                123 Luxury Avenue<br />
                New York, NY 10001
              </p>
            </Card>
            </AnimateOnScroll>

            <AnimateOnScroll direction="left" delay={0.3}>
              <Card className="p-6">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-bold text-foreground mb-2">Hours</h3>
              <p className="text-muted-foreground text-sm">
                Monday - Friday: 9 AM - 6 PM EST<br />
                Saturday: 10 AM - 4 PM EST<br />
                Sunday: Closed
              </p>
            </Card>
            </AnimateOnScroll>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <AnimateOnScroll direction="right">
              <Card className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="buying">Buying Property</option>
                    <option value="selling">Selling Property</option>
                    <option value="investment">Investment Opportunities</option>
                    <option value="agent">Becoming an Agent</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10"
                >
                  Send Message
                </Button>
              </form>
            </Card>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Team Section */}
        <section className="mb-20">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Local Experts</h2>
          </AnimateOnScroll>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Williams',
                role: 'New York Regional Manager',
                phone: '+1 (555) 111-2222',
                image: '/images/agent-1.jpg'
              },
              {
                name: 'David Johnson',
                role: 'Miami Regional Manager',
                phone: '+1 (555) 333-4444',
                image: '/images/agent-2.jpg'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Los Angeles Regional Manager',
                phone: '+1 (555) 555-6666',
                image: '/images/agent-3.jpg'
              }
            ].map((member, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-accent text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.phone}</p>
                </div>
              </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          </AnimateOnScroll>
          <div className="space-y-6">
            {[
              {
                question: 'What are your business hours?',
                answer: 'We operate Monday through Friday from 9 AM to 6 PM EST, and Saturday from 10 AM to 4 PM EST.'
              },
              {
                question: 'How do I schedule a property viewing?',
                answer: 'You can schedule a viewing through our website, or contact one of our agents directly. We offer flexible scheduling including evenings and weekends.'
              },
              {
                question: 'What are your commission rates?',
                answer: 'Commission rates vary depending on the type of property and transaction. Contact us for a personalized quote.'
              },
              {
                question: 'Do you offer international property services?',
                answer: 'Yes, we have a global network and can assist with international real estate transactions.'
              }
            ].map((faq, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <Card className="p-6">
                <h3 className="font-bold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

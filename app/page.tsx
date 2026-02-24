import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { Footer } from '@/components/footer'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import dynamic from 'next/dynamic'

// Lazy load FeaturedProperties since it's below the fold
const FeaturedProperties = dynamic(() => import('@/components/featured-properties').then(mod => ({ default: mod.FeaturedProperties })), {
  loading: () => <div className="py-16 md:py-24 bg-background"><div className="container mx-auto px-4 text-center">Loading properties...</div></div>
})

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedProperties />
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0.1}>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-muted-foreground">Premium Properties</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Expert Realtors</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

import PublicLayout from '@/components/layout/PublicLayout'
import Hero from '@/components/home/Hero'
import StatsStrip from '@/components/home/StatsStrip'
import AboutSnapshot from '@/components/home/AboutSnapshot'
import ProductsSection from '@/components/home/ProductsSection'
import NewsCarousel from '@/components/home/NewsCarousel'
import GalleryCarousel from '@/components/home/GalleryCarousel'
import OutgrowerCTA from '@/components/home/OutgrowerCTA'
import SustainabilityHighlights from '@/components/home/SustainabilityHighlights'
import PartnersStrip from '@/components/home/PartnersStrip'
import NewsletterSignup from '@/components/home/NewsletterSignup'

export const metadata = {
  title: 'Victoria Sugar Limited — Sweetening Uganda, Powering Africa',
  description:
    'Victoria Sugar Limited is Uganda\'s premier agro-industrial company producing sugar, ethanol, extra natural alcohol and electricity from sugarcane.',
}

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <StatsStrip />
      <AboutSnapshot />
      <ProductsSection />
      <NewsCarousel />
      <GalleryCarousel />
      <OutgrowerCTA />
      <SustainabilityHighlights />
      <PartnersStrip />
      <NewsletterSignup />
    </PublicLayout>
  )
}

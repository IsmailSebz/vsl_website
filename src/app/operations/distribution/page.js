import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'Distribution Network' }
export default function DistributionPage() {
  return (
    <PublicLayout>
      <PageHero title="Distribution Network" subtitle="Getting Victoria Sugar products to consumers across Uganda and beyond." breadcrumb="Home / Operations / Distribution" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[{ v: '200+', l: 'Authorised Distributors' }, { v: '10+', l: 'Countries Served' }, { v: '5,000+', l: 'Retail Outlets' }].map(({ v, l }) => (
              <div key={l} className="card p-8 text-center">
                <div className="font-heading font-bold text-4xl text-green-700 mb-2">{v}</div>
                <div className="text-gray-500">{l}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-8">Our distribution network spans all four regions of Uganda and extends to Kenya, Tanzania, Rwanda, DRC, South Sudan, and other regional markets. We supply through authorised regional distributors who manage last-mile delivery to retail outlets, supermarkets, and food manufacturers.</p>
          <Link href="/products/where-to-buy" className="btn-primary">Find a Distributor Near You <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PublicLayout>
  )
}

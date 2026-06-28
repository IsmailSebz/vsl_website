import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = { title: 'About Us' }

const milestones = [
  { year: '1999', event: 'Victoria Sugar Limited established in Kakira, Jinja.' },
  { year: '2004', event: 'First major expansion of milling capacity to 2,500 TCD.' },
  { year: '2010', event: 'Launch of the Outgrower Programme — partnering with local farmers.' },
  { year: '2015', event: 'Commissioning of the ethanol distillery plant.' },
  { year: '2019', event: 'Co-generation plant begins supplying electricity to the national grid.' },
  { year: '2023', event: 'Capacity expanded to 6,500 TCD — largest in the region.' },
  { year: '2026', event: 'Over 5,000 outgrower farmers and 3,000+ employees.' },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        title="About Victoria Sugar Limited"
        subtitle="Decades of excellence in sugar production, community development, and sustainable agro-industry."
        image="https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg"
        breadcrumb="Home / About Us"
      />

      {/* Mission & Vision */}
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="bg-green-700 text-white rounded-2xl p-8">
              <h2 className="font-heading font-bold text-2xl mb-4 text-gold-400">Our Mission</h2>
              <p className="text-green-100 leading-relaxed">
                To produce high-quality sugar and related products in a sustainable and socially responsible manner,
                while creating value for our shareholders, employees, farmers, and the communities we serve.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
              <h2 className="font-heading font-bold text-2xl mb-4 text-green-700">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the most competitive and profitable agro-industrial company in East Africa, recognised
                for quality, sustainability, and transformative community impact.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <p className="section-label">What Guides Us</p>
            <h2 className="section-title mx-auto">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {['Integrity', 'Quality', 'Sustainability', 'Community'].map((value) => (
              <div key={value} className="card p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">{value[0]}</span>
                </div>
                <h3 className="font-heading font-bold text-green-800">{value}</h3>
              </div>
            ))}
          </div>

          {/* History timeline */}
          <div className="text-center mb-12">
            <p className="section-label">Our Journey</p>
            <h2 className="section-title mx-auto">Company History</h2>
          </div>
          <div className="relative border-l-2 border-green-200 ml-4 md:ml-8 space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative pl-8">
                <div className="absolute -left-[11px] top-1 w-5 h-5 bg-green-600 rounded-full border-2 border-white shadow" />
                <span className="text-gold-500 font-bold text-sm">{m.year}</span>
                <p className="text-gray-700 mt-1">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-green-50">
        <div className="container-main text-center">
          <h3 className="font-heading font-bold text-2xl text-green-800 mb-4">Meet Our Leadership</h3>
          <p className="text-gray-500 mb-6">Discover the experienced team guiding Victoria Sugar into the future.</p>
          <Link href="/about/leadership" className="btn-primary">View Leadership Team <ArrowRight size={18} /></Link>
        </div>
      </section>
    </PublicLayout>
  )
}

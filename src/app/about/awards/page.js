import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Award } from 'lucide-react'

export const metadata = { title: 'Awards & Certifications' }

const awards = [
  { year: '2025', title: 'National Quality Excellence Award', body: 'Uganda Manufacturers Association', type: 'Award' },
  { year: '2024', title: 'Best Agro-Industrial Company', body: 'Uganda Investment Authority', type: 'Award' },
  { year: '2023', title: 'ISO 9001:2015 Certification', body: 'Bureau Veritas', type: 'Certification' },
  { year: '2023', title: 'FSSC 22000 Food Safety', body: 'FSSC International', type: 'Certification' },
  { year: '2022', title: 'ISO 14001:2015 Environmental', body: 'Bureau Veritas', type: 'Certification' },
  { year: '2022', title: 'OHSAS 18001 Health & Safety', body: 'Bureau Veritas', type: 'Certification' },
  { year: '2021', title: 'UNBS Quality Mark', body: 'Uganda National Bureau of Standards', type: 'Certification' },
  { year: '2020', title: 'Best Employer of the Year', body: 'Uganda Employers Federation', type: 'Award' },
]

export default function AwardsPage() {
  return (
    <PublicLayout>
      <PageHero title="Awards & Certifications" subtitle="Recognition of our commitment to quality, safety and excellence." breadcrumb="Home / About / Awards & Certifications" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((item) => (
              <div key={item.title} className="card p-6 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'Award' ? 'bg-gold-100 text-gold-500' : 'bg-green-100 text-green-600'}`}>
                  <Award size={22} />
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${item.type === 'Award' ? 'bg-gold-100 text-gold-600' : 'bg-green-100 text-green-600'}`}>{item.type}</span>
                  <h3 className="font-heading font-bold text-green-800 mt-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.body}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

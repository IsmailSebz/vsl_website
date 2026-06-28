import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
export const metadata = { title: 'Health & Safety' }
export default function HealthSafetyPage() {
  return (
    <PublicLayout>
      <PageHero title="Health & Safety" subtitle="Zero harm is our goal — protecting every employee, contractor, and visitor." breadcrumb="Home / Sustainability / Health & Safety" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">Safety First</p>
              <h2 className="section-title">Zero Harm. Every Day.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Victoria Sugar is certified to OHSAS 18001 occupational health and safety standards. Our comprehensive safety management system covers all areas of operation, from field to factory.</p>
              <div className="space-y-3">{['Daily safety briefings for all operational staff', 'Mandatory personal protective equipment protocols', 'Monthly safety inspections by the HSE team', 'Annual third-party safety audits', '24-hour on-site medical clinic', 'Safety training for all new employees and contractors'].map((i) => (
                <div key={i} className="flex items-start gap-3"><span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" /><span className="text-gray-600 text-sm">{i}</span></div>
              ))}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ n: '0', l: 'Fatalities (last 5 years)' }, { n: '98%', l: 'Safety Training Completion' }, { n: 'OHSAS 18001', l: 'Certified Standard' }, { n: '12,000+', l: 'Safe Working Days 2025' }].map(({ n, l }) => (
                <div key={l} className="card p-6 text-center">
                  <div className="font-heading font-bold text-2xl text-green-700">{n}</div>
                  <div className="text-gray-500 text-xs mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

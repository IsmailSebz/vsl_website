import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Ethanol' }

export default function EthanolPage() {
  return (
    <PublicLayout>
      <PageHero title="Ethanol" subtitle="Fuel-grade ethanol from sugarcane molasses — a clean, renewable alternative energy source." breadcrumb="Home / Products / Ethanol" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">Renewable Energy</p>
              <h2 className="section-title">Cleaner Fuel for a Greener Uganda</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Victoria Sugar produces anhydrous and hydrated fuel ethanol from molasses — a by-product of sugar production.
                Our ethanol is used for fuel blending with petrol, reducing fossil fuel consumption and carbon emissions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                As Uganda moves towards mandatory ethanol-petrol blending (E10 to E20), Victoria Sugar is positioned
                as a key domestic supplier supporting the country's energy transition.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Purity', value: '99.9% (Anhydrous)' },
                  { label: 'Use', value: 'Fuel Blending, Industrial' },
                  { label: 'Standard', value: 'ASTM D4806' },
                  { label: 'Capacity', value: '40,000 L/day' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-purple-50 rounded-xl p-4">
                    <div className="text-gray-500 text-xs mb-1">{label}</div>
                    <div className="font-bold text-purple-800 text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg" alt="Ethanol plant" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

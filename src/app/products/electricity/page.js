import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Zap } from 'lucide-react'

export const metadata = { title: 'Electricity' }

export default function ElectricityPage() {
  return (
    <PublicLayout>
      <PageHero title="Electricity" subtitle="Green electricity co-generated from sugarcane bagasse — powering Uganda's future." breadcrumb="Home / Products / Electricity" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="section-label">Co-Generation</p>
              <h2 className="section-title">Energy from Every Part of the Cane</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                After crushing sugarcane, the remaining fibre — called bagasse — is burned in high-pressure boilers
                to generate steam, which drives turbines producing electricity. This co-generation process powers our
                entire factory, estate, and staff housing, with surplus fed into Uganda's national grid.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our co-generation plant has a total installed capacity of 50MW, making us one of the largest independent
                power producers in Uganda from a renewable biomass source.
              </p>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" alt="Power generation" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '⚡', stat: '50 MW', label: 'Installed Capacity' },
              { icon: '🌿', stat: '100%', label: 'Renewable (Bagasse)' },
              { icon: '🔌', stat: '20 MW', label: 'Surplus to National Grid' },
            ].map((item) => (
              <div key={item.label} className="card p-8 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-heading font-bold text-3xl text-green-700 mb-1">{item.stat}</div>
                <div className="text-gray-500 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

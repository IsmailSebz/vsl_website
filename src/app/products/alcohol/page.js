import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Extra Natural Alcohol' }

export default function AlcoholPage() {
  return (
    <PublicLayout>
      <PageHero title="Extra Natural Alcohol" subtitle="High-purity extra neutral alcohol distilled from sugarcane molasses for beverage and industrial use." breadcrumb="Home / Products / Extra Natural Alcohol" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">By-Product Excellence</p>
              <h2 className="section-title">Pure. Consistent. Reliable.</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Extra Natural Alcohol (ENA) is produced by multi-column distillation of fermented molasses,
                yielding a high-purity spirit ideal for blending into potable spirits, pharmaceuticals, and industrial products.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Purity', value: '96.5%+' },
                  { label: 'Standard', value: 'Uganda Food & Drugs' },
                  { label: 'Packaging', value: 'Drums / Tanker' },
                  { label: 'Feedstock', value: 'Sugarcane Molasses' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-green-50 rounded-xl p-4">
                    <div className="text-gray-500 text-xs mb-1">{label}</div>
                    <div className="font-bold text-green-800 text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg" alt="Alcohol distillery" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

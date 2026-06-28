import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Nucleus Estate' }
export default function NucleusEstatePage() {
  return (
    <PublicLayout>
      <PageHero title="Nucleus Estate" subtitle="Our 12,000-hectare sugarcane estate — the heart of Victoria Sugar's raw material supply." image="https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg" breadcrumb="Home / Operations / Nucleus Estate" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">Our Estate</p>
              <h2 className="section-title">12,000 Hectares of Fertile Cane Land</h2>
              <p className="text-gray-600 leading-relaxed mb-6">The Victoria Sugar Nucleus Estate stretches across 12,000 hectares of fertile land along Lake Victoria's shores. The estate is fully mechanised and employs advanced agronomic practices to achieve some of the highest cane yields per hectare in East Africa.</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ l: 'Estate Area', v: '12,000 Ha' }, { l: 'Average Yield', v: '110 TC/Ha' }, { l: 'Varieties Grown', v: '8 Elite Varieties' }, { l: 'Irrigation', v: '100% of Estate' }].map(({ l, v }) => (
                  <div key={l} className="bg-green-50 rounded-xl p-4">
                    <div className="text-gray-500 text-xs">{l}</div>
                    <div className="font-bold text-green-800 mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217122314_0861_D.JPG" alt="Nucleus estate" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

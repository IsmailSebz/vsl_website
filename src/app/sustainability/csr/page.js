import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Corporate Social Responsibility' }
export default function CSRPage() {
  return (
    <PublicLayout>
      <PageHero title="Corporate Social Responsibility" subtitle="Investing in people, communities, and the future of Uganda." breadcrumb="Home / Sustainability / CSR" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">Giving Back</p>
              <h2 className="section-title">Community at the Centre</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Victoria Sugar Limited dedicates a portion of annual revenues to community development initiatives in the areas surrounding our operations. Our CSR programmes focus on education, healthcare, infrastructure, and livelihoods.</p>
              <div className="space-y-4 mt-6">
                {[
                  { area: 'Education', items: ['Construction of 12 classrooms in local schools', 'Annual scholarships for 50 students', 'Adult literacy programme for outgrower families'] },
                  { area: 'Healthcare', items: ['Staffed medical clinic on the estate open to the community', 'Annual free medical camps in neighbouring villages', 'Malaria prevention programme'] },
                  { area: 'Infrastructure', items: ['Road rehabilitation in cane growing areas', 'Water boreholes for 8 communities', 'Rural electrification support'] },
                ].map(({ area, items }) => (
                  <div key={area} className="card p-5">
                    <h4 className="font-heading font-bold text-green-700 mb-2">{area}</h4>
                    <ul className="space-y-1">{items.map((i) => <li key={i} className="text-gray-500 text-sm flex items-start gap-2"><span className="text-green-400 mt-1">•</span>{i}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" alt="CSR" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Export Markets' }
export default function ExportPage() {
  return (
    <PublicLayout>
      <PageHero title="Export Markets" subtitle="Victoria Sugar products reaching across East Africa and beyond." breadcrumb="Home / Export Markets" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">Global Reach</p>
              <h2 className="section-title">Supplying 10+ Countries</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Victoria Sugar Limited exports sugar, ethanol and extra natural alcohol to buyers across East and Central Africa. Our products meet international quality standards and are shipped in compliance with all applicable export regulations.</p>
              <div className="grid grid-cols-2 gap-3">
                {['Kenya', 'Tanzania', 'Rwanda', 'Burundi', 'DR Congo', 'South Sudan', 'Ethiopia', 'Somalia'].map((c) => (
                  <div key={c} className="bg-green-50 rounded-lg px-4 py-3 text-green-700 font-medium text-sm">{c}</div>
                ))}
              </div>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-inquiry-modal'))} className="btn-primary mt-8">Export Inquiry</button>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" alt="Export" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

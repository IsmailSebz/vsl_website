import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'Quality Assurance' }
export default function QualityPage() {
  return (
    <PublicLayout>
      <PageHero title="Quality Assurance" subtitle="World-class quality control at every stage of our production process." breadcrumb="Home / Operations / Quality Assurance" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-label">Our Standards</p>
              <h2 className="section-title">Quality at Every Step</h2>
              <p className="text-gray-600 leading-relaxed mb-6">Victoria Sugar operates an ISO 9001:2015 certified quality management system. From raw cane intake to finished product packaging, every process is monitored against strict quality parameters to ensure consistent, world-class products.</p>
              <div className="space-y-4">
                {['Certified ISO 9001:2015 Quality Management System', 'UNBS-approved sugar and alcohol products', 'FSSC 22000 Food Safety Certification', 'In-house laboratory with advanced testing equipment', 'Independent third-party quality audits bi-annually'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <img src="https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg" alt="Quality lab" className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Download, FileText } from 'lucide-react'

export const metadata = { title: 'Annual Reports' }

const reports = [
  { year: '2025', title: 'Annual Report 2025', desc: 'Full financial statements, operational highlights, and sustainability review.' },
  { year: '2024', title: 'Annual Report 2024', desc: 'Financial performance, strategic milestones, and community impact.' },
  { year: '2023', title: 'Annual Report 2023', desc: 'Record production year — expansion and sustainability achievements.' },
  { year: '2022', title: 'Annual Report 2022', desc: 'Post-pandemic recovery, outgrower expansion, and infrastructure investments.' },
]

export default function AnnualReportsPage() {
  return (
    <PublicLayout>
      <PageHero title="Annual Reports" subtitle="Transparent reporting on our financial performance and strategic progress." breadcrumb="Home / About / Annual Reports" />
      <section className="section bg-white">
        <div className="container-main">
          <p className="text-gray-600 max-w-2xl mb-10">
            Victoria Sugar Limited publishes annual reports to keep our shareholders, partners, and the public informed
            about our financial performance, strategic initiatives, and sustainability commitments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((r) => (
              <div key={r.year} className="card p-6 flex items-center gap-5">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-green-800">{r.title}</h3>
                  <p className="text-gray-500 text-sm">{r.desc}</p>
                </div>
                <button className="flex items-center gap-1.5 text-green-600 text-sm font-semibold hover:text-green-700 flex-shrink-0">
                  <Download size={16} /> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

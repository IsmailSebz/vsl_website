import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
export const metadata = { title: 'Education Initiatives' }
export default function EducationPage() {
  return (
    <PublicLayout>
      <PageHero title="Education Initiatives" subtitle="Investing in the next generation through scholarships, school support, and skills development." breadcrumb="Home / Sustainability / Education" />
      <section className="section bg-white">
        <div className="container-main max-w-4xl">
          <p className="section-label">Learning & Growth</p>
          <h2 className="section-title">Education Changes Everything</h2>
          <p className="text-gray-600 leading-relaxed mb-10">Victoria Sugar believes that education is the most powerful investment we can make in Uganda's future. Through our education programmes, we support students, schools, and skills development across our operating communities.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🎓', title: 'Scholarships', desc: '50 university and vocational scholarships awarded annually to children of outgrower farmers and employees.' },
              { emoji: '🏫', title: 'School Support', desc: '12 primary and secondary schools supported with infrastructure, materials, and teacher development.' },
              { emoji: '📚', title: 'Adult Literacy', desc: 'Literacy and numeracy training programme serving over 800 adult outgrower farmers each year.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-heading font-bold text-green-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

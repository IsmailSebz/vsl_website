import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'

export const metadata = { title: 'FAQs' }

const faqs = [
  { q: 'Where is Victoria Sugar Limited located?', a: 'Our factory and nucleus estate are located in Kakira, Jinja District, Uganda, on the northern shores of Lake Victoria.' },
  { q: 'What products does Victoria Sugar produce?', a: 'We produce Sugar (various grades), Extra Natural Alcohol, Ethanol, and Electricity from our sugarcane processing operations.' },
  { q: 'How can I become an outgrower farmer?', a: 'Visit our Outgrower Programme page or contact our Agricultural Extension office. Our team will assess your land and guide you through the registration process.' },
  { q: 'Can I buy sugar directly from the factory?', a: 'We sell primarily through our authorised distributor network. Visit our "Where to Buy" page to find your nearest distributor.' },
  { q: 'How do I apply for a job at Victoria Sugar?', a: 'Visit our Careers page for current vacancies. You can also send a speculative application to careers@victoriasugar.com.' },
  { q: 'Does Victoria Sugar export its products?', a: 'Yes. We export sugar, ethanol and alcohol to Kenya, Tanzania, Rwanda, DRC, South Sudan and other regional markets. Contact our export team at export@victoriasugar.com.' },
  { q: 'How do I submit a tender bid?', a: 'Download the tender documents from our Tenders & Procurement page and follow the submission instructions. For queries, email procurement@victoriasugar.com.' },
  { q: 'Is Victoria Sugar ISO certified?', a: 'Yes. We hold ISO 9001:2015 (Quality Management), ISO 14001 (Environmental Management), and OHSAS 18001 (Health & Safety) certifications, among others.' },
  { q: 'How can I contact the company?', a: 'Call +256 781 989 621, email info@victoriasugar.com, or use the contact form on our Contact Us page.' },
]

export default function FAQsPage() {
  return (
    <PublicLayout>
      <PageHero title="Frequently Asked Questions" subtitle="Answers to common questions about Victoria Sugar Limited." breadcrumb="Home / FAQs" />
      <section className="section bg-white">
        <div className="container-main max-w-3xl">
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="card group">
                <summary className="p-5 cursor-pointer flex items-center justify-between gap-4 list-none font-heading font-semibold text-green-800 hover:text-green-600">
                  {q}
                  <span className="text-2xl text-green-400 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

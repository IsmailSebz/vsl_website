const certs = [
  { name: 'ISO 9001:2015', sub: 'Quality Management' },
  { name: 'UNBS', sub: 'Uganda National Bureau of Standards' },
  { name: 'FSSC 22000', sub: 'Food Safety' },
  { name: 'ISO 14001', sub: 'Environmental Management' },
  { name: 'OHSAS 18001', sub: 'Occupational Health & Safety' },
  { name: 'UCDA', sub: 'Uganda Cane Development Authority' },
]

export default function PartnersStrip() {
  return (
    <section className="section-sm bg-gray-50 border-y border-gray-100">
      <div className="container-main">
        <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">
          Certified & Recognised By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {certs.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-col items-center text-center px-6 py-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow min-w-[120px]"
            >
              <span className="font-heading font-bold text-green-700 text-base">{cert.name}</span>
              <span className="text-gray-400 text-xs mt-0.5">{cert.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

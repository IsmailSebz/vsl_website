export default function PageHero({ title, subtitle, image, breadcrumb }) {
  return (
    <section className="relative bg-green-800 text-white py-20 md:py-28 overflow-hidden">
      {image && (
        <>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-green-900/60" />
        </>
      )}
      <div className="relative z-10 container-main">
        {breadcrumb && (
          <p className="text-green-300 text-sm mb-3">{breadcrumb}</p>
        )}
        <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-green-100 text-lg max-w-2xl">{subtitle}</p>
        )}
        <div className="w-16 h-1 bg-gold-400 mt-6 rounded-full" />
      </div>
    </section>
  )
}

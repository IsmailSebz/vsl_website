import PublicLayout from '@/components/layout/PublicLayout'
import PageHero from '@/components/ui/PageHero'
import { Play } from 'lucide-react'

export const metadata = { title: 'Video Tour' }

const videos = [
  { url: 'https://media.victoriasugar.ug/videos/VID-20260627-WA0107.mp4', thumb: 'https://media.victoriasugar.ug/images/DJI_20251217161456_0929_D.jpg', title: 'Operations in Motion', desc: 'A look inside our production facility.' },
  { url: 'https://media.victoriasugar.ug/videos/VID-20260627-WA0020.mp4', thumb: 'https://media.victoriasugar.ug/images/DJI_20251217161734_0934_D.jpg', title: 'Factory Walkthrough', desc: 'Tour our state-of-the-art processing plant.' },
  { url: 'https://media.victoriasugar.ug/videos/VID-20260627-WA0019.mp4', thumb: 'https://media.victoriasugar.ug/images/DJI_20251217122121_0858_D.jpg', title: 'Aerial Estate Flyover', desc: 'Bird\'s-eye view of the Victoria Sugar estate.' },
]

export default function VideoTourPage() {
  return (
    <PublicLayout>
      <PageHero title="Video Tour" subtitle="Explore Victoria Sugar Limited through video — from the cane fields to the production floor." breadcrumb="Home / Video Tour" />
      <section className="section bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((v) => (
              <div key={v.title} className="card overflow-hidden group">
                <div className="relative aspect-video">
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={22} className="text-green-700 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-green-800 mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{v.desc}</p>
                  <video src={v.url} controls className="w-full rounded-lg" preload="none" poster={v.thumb} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

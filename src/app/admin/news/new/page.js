import NewsForm from '../NewsForm'

export const metadata = { title: 'New Article' }

export default function NewArticlePage() {
  return (
    <div>
      <h2 className="font-heading font-bold text-2xl text-gray-800 mb-6">New Article</h2>
      <NewsForm />
    </div>
  )
}

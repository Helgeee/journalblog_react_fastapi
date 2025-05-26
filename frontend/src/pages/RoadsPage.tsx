import { FC, useEffect, useState } from 'react'
import { PostService } from '../services/post.service'
import PostCard from '../components/PostCard'
import { IPost } from '../types/types'

const RoadsPage: FC = () => {
	const [posts, setPosts] = useState<IPost[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const data = await PostService.getAll()
				const sortedPosts = data.sort((a, b) => b.id - a.id)

				setPosts(sortedPosts)
			} catch (err) {
				console.error('Ошибка при получении постов:', err)
				setError('Не удалось загрузить посты')
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	if (loading)
		return <p className="text-center text-white">Загрузка постов...</p>
	if (error) return <p className="text-center text-red-500">{error}</p>

	return (
		<div className="p-4">
			{posts.map((post) => (
				<PostCard
					key={post.id}
					post={{
						id: post.id,
						title: post.title,
						category: post.category?.name || 'Без категории',
						is_published: post.is_published,
						showMoreText: 'Читать дальше',
					}}
					className="mb-4"
				/>
			))}
		</div>
	)
}

export default RoadsPage

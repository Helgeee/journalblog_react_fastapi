import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

type Post = {
	id: number
	title: string
	content: string
	author: string
}

const Home: FC = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get<Post[]>('http://localhost:4000/posts')
				setPosts(response.data)
			} catch (error) {
				console.error('Ошибка при получении постов:', error)
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
		<div>
			{posts.map((post) => (
				<PostCard
					key={post.id}
					post={{
						title: post.title,
						category: 'Категория не указана', // если у тебя есть категория - подставь
						items: [],
						stats: { views: 0, likes: 0, comments: 0 }, // или возьми из поста
						imageUrl: '', // если есть картинка - подставь
						imageAlt: '',
						showMoreText: 'Читать дальше',
					}}
					onShowMore={() => console.log('Показать больше', post.id)}
					className="mb-4 mt-4"
				/>
			))}
		</div>
	)
}

export default Home

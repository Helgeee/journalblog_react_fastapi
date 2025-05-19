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

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get<Post[]>('http://localhost:8000/posts')
				setPosts(response.data)
			} catch (error) {
				console.error('Ошибка при получении постов:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	if (loading)
		return <p className="text-center text-white">Загрузка постов...</p>

	return (
		<div className="p-4">
			<PostCard />

			{/* {posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))} */}
		</div>
	)
}

export default Home

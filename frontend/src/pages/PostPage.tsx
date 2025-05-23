import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PostService } from '../services/post.service'
import { IPost } from '../types/types'

const PostPage = () => {
	const { id } = useParams()
	const [post, setPost] = useState<IPost | null>(null)

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await PostService.getPostById(id!)
				setPost(data)
			} catch (error) {
				console.error('Ошибка при загрузке поста', error)
			}
		}
		fetchPost()
	}, [id])

	if (!post) return <div className="text-white">Загрузка...</div>

	return (
		<div className="max-w-2xl mx-auto p-6 text-white rounded-lg shadow bg-component">
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
			<p className="mb-4 text-white/70">{post.content}</p>
			<div className="flex gap-2 flex-wrap mb-6">
				{post.category?.name && (
					<span className="bg-component-input rounded px-2 py-1 text-sm">
						{post.category.name}
					</span>
				)}
			</div>
			<div className="grid grid-cols-3 gap-4 text-center text-sm">
				<div>
					{/* <p className="font-medium">{post.views}</p> */}
					<p className="text-white/60">Просмотры</p>
				</div>
				<div>
					{/* <p className="font-medium">{post.likes}</p> */}
					<p className="text-white/60">Лайки</p>
				</div>
				<div>
					{/* <p className="font-medium">{post.comments?.length || 0}</p> */}
					<p className="text-white/60">Комментарии</p>
				</div>
			</div>
		</div>
	)
}

export default PostPage

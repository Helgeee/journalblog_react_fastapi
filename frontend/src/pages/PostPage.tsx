import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PostService } from '../services/post.service'
import { IPost } from '../types/types'

const PostPage = () => {
	const { id } = useParams()
	const [post, setPost] = useState<IPost | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const data = await PostService.getPostById(id!)
				setPost(data)
			} catch (error) {
				console.error('Ошибка при загрузке поста', error)
				setError('Не удалось загрузить пост')
			} finally {
				setLoading(false)
			}
		}
		fetchPost()
	}, [id])

	if (loading)
		return <div className="text-white text-center mt-6">Загрузка...</div>
	if (error) return <div className="text-red-500 text-center mt-6">{error}</div>
	if (!post) return null
	if (!id) {
		setError('Некорректный ID поста')
		setLoading(false)
		return
	}

	return (
		<div className="max-w-3xl mx-auto p-6 mt-4 text-white bg-component rounded-xl shadow">
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>

			{post.category?.name && (
				<p className="mb-2 text-sm text-white/60">
					Категория:{' '}
					<span className="font-medium text-white">{post.category.name}</span>
				</p>
			)}

			<hr className="my-4 border-white/10" />

			<p className="text-lg leading-relaxed mb-6 whitespace-pre-line">
				{post.content}
			</p>

			{/* Можно позже подключить реальные данные */}
			<div className="grid grid-cols-3 gap-4 text-center text-sm border-t border-white/10 pt-4">
				<div>
					<p className="font-medium">0</p>
					<p className="text-white/60">Просмотры</p>
				</div>
				<div>
					<p className="font-medium">0</p>
					<p className="text-white/60">Лайки</p>
				</div>
				<div>
					<p className="font-medium">0</p>
					<p className="text-white/60">Комментарии</p>
				</div>
			</div>
		</div>
	)
}

export default PostPage

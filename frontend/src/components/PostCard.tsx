import React from 'react'
import { useNavigate } from 'react-router-dom'

interface PostCardProps {
	post: {
		id: number
		title: string
		category: string
		is_published: string | boolean
		showMoreText?: string
		user?: {
			id: number
			username: string
		}
	}
	className?: string
}

const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
	const navigate = useNavigate()

	const handleShowMore = () => {
		navigate(`/post/${post.id}`)
	}

	return (
		<div
			onClick={handleShowMore}
			className={`max-w-2xl mx-auto min-w-30 p-4 text-white rounded-lg shadow bg-component cursor-pointer ${className}`}
		>
			<div>
				<h1 className="text-2xl font-bold mb-2">{post.title}</h1>
				<p className="text-sm text-white/70 mb-2">Категория: {post.category}</p>
				<p className="text-sm text-white/60 mb-2">
					Статус: {post.is_published ? 'Опубликовано' : 'Не опубликовано'}
				</p>
				{post.user && (
					<p className="text-sm text-white/60 mb-4">
						Автор:{''}
						<span className="text-white font-medium">{post.user.username}</span>
					</p>
				)}
			</div>

			<button
				onClick={(e) => {
					e.stopPropagation()
					handleShowMore()
				}}
				className="text-blue-400 hover:text-blue-600 font-medium transition-colors"
			>
				{post.showMoreText || 'Читать дальше'}
			</button>
		</div>
	)
}

export default PostCard

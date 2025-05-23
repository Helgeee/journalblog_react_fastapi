import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Post {
	id: number
	title: string
	category: string
	items: string[]
	stats: {
		views: number
		likes: number
		comments: number
	}
	imageUrl?: string
	imageAlt?: string
	showMoreText?: string
}

interface PostCardProps {
	post: Post
	onShowMore?: () => void
	className?: string
}

const PostCard: React.FC<PostCardProps> = ({ post, onShowMore, className }) => {
	const navigate = useNavigate()

	const handleShowMore = () => {
		navigate(`/post/${post.id}`)
	}

	return (
		<div
			onClick={handleShowMore}
			className={`max-w-md mx-auto p-4 text-white rounded-lg shadow bg-component cursor-pointer ${className}`}
		>
			<h1 className="text-2xl font-bold mb-4">{post.title}</h1>

			<div className="mb-6">
				<ul className="pl-5 flex gap-2 flex-wrap">
					{post.items.map((item, idx) => (
						<li
							key={idx}
							className="bg-component-input rounded-lg px-2 py-1 text-sm"
						>
							{item}
						</li>
					))}
				</ul>
			</div>

			{post.imageUrl && (
				<div className="h-48 overflow-hidden rounded mb-4">
					<img
						src={post.imageUrl}
						alt={post.imageAlt || post.title}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			<hr className="my-4 border-gray-200/30" />

			{onShowMore && (
				<button
					onClick={(e) => {
						e.stopPropagation()
						handleShowMore()
					}}
					className="text-blue-400 hover:text-blue-600 font-medium mb-6 transition-colors"
				>
					{post.showMoreText || 'Показать больше'}
				</button>
			)}

			<div className="grid grid-cols-3 gap-4 text-center text-sm">
				<div>
					<p className="font-medium">{post.stats.views}</p>
					<p className="text-white/60">Просмотры</p>
				</div>
				<div>
					<p className="font-medium">{post.stats.likes}</p>
					<p className="text-white/60">Лайки</p>
				</div>
				<div>
					<p className="font-medium">{post.stats.comments}</p>
					<p className="text-white/60">Комментарии</p>
				</div>
			</div>
		</div>
	)
}

export default PostCard

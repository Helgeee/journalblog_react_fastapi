import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { IPost } from '../types/types'
import { PostService } from '../services/post.service'

const Search = () => {
	const [query, setQuery] = useState('')
	const [posts, setPosts] = useState<IPost[]>([])
	const [filteredPosts, setFilteredPosts] = useState<IPost[]>([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const data = await PostService.getAll()
				setPosts(data)
				setFilteredPosts(data)
			} catch (error) {
				console.error('Ошибка загрузки постов', error)
			}
		}
		fetchPosts()
	}, [])

	useEffect(() => {
		if (!query.trim()) {
			setFilteredPosts([])
			return
		}

		const filtered = posts.filter((post) =>
			post.title.toLowerCase().includes(query.toLowerCase()),
		)
		setFilteredPosts(filtered)
	}, [query, posts])

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<div className="bg-component mt-5 py-4 rounded-2xl">
			<form
				onSubmit={onSubmit}
				className="flex items-center gap-4 w-full max-w-4xl mx-auto px-4"
			>
				<label htmlFor="default-search" className="sr-only">
					Поиск
				</label>
				<div className="relative w-full">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="block w-full p-4 ps-10 text-sm bg-component-imput border border-gray-300 rounded-lg"
						placeholder="Поиск"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="text-white end-2.5 bottom-2.5 btn-orange btn focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4"
				>
					Поиск
				</button>
			</form>

			{query && (
				<div className="mt-6 max-w-4xl mx-auto">
					{filteredPosts.length === 0 ? (
						<p>Ничего не найдено</p>
					) : (
						<ul>
							{filteredPosts.map((post) => (
								<li key={post.id} className="mb-4">
									<button
										onClick={() => navigate(`/post/${post.id}`)}
										className="text-lg font-bold text-orange-600 hover:underline text-left"
									>
										{post.title}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	)
}

export default Search

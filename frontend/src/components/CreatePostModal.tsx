import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { closeCreatePostModal } from '../store/modal/modalSlice'
import { PostService } from '../services/post.service'

interface CreatePostModalProps {
	onClose: () => void
	onPublish: (postData: {
		title: string
		category: string
		content: string
		file?: File
	}) => void
	onSaveDraft: (postData: {
		title: string
		category: string
		content: string
		file?: File
	}) => void
	categories: string[]
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	onClose,
	onPublish,
	onSaveDraft,
	categories,
}) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [fileName, setFileName] = useState('')

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setSelectedFile(file)
			setFileName(file.name)
		}
	}

	const handlePublish = () => {
		if (!title || !selectedCategory) return
		onPublish({
			title,
			category: selectedCategory,
			content,
			file: selectedFile || undefined,
		})
	}

	const handleSaveDraft = () => {
		if (!title || !selectedCategory) return
		onSaveDraft({
			title,
			category: selectedCategory,
			content,
			file: selectedFile || undefined,
		})
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
			<div className="bg-component rounded-2xl shadow-lg p-6 w-full max-w-md text-white">
				<h2 className="text-2xl font-bold mb-4">Создание поста</h2>

				<div className="mb-4">
					<label className="block text-xl font-medium text-white/60 mb-1">
						Выберите категорию
					</label>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="w-full p-2 bg-component-input border-none rounded-md text-white placeholder-white/40 focus:outline-none  block text-sm bg-component-imput border border-gray-300 "
					>
						<option value="">-- Выберите категорию --</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label className="block  text-xl font-medium text-white/60 mb-1">
						Название статьи
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 bg-component-input border-none rounded-md text-white placeholder-white/40 focus:outline-none  block text-sm bg-component-imput border border-gray-300 "
						placeholder="Введите название"
					/>
				</div>

				{/* Контент */}
				<div className="mb-4">
					<label className="block  text-xl font-medium text-white/60 mb-1">
						Содержимое поста
					</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="w-full p-2 bg-component-input border-none rounded-md text-white placeholder-white/40 focus:outline-none  block text-sm bg-component-imput border border-gray-300  "
						placeholder="Введите текст поста"
						rows={4}
					/>
				</div>

				{/* Файл */}
				<div className="mb-6">
					<label className="block text-xl  font-medium text-white/60 mb-1">
						Добавить файл
					</label>
					<label className="flex flex-col items-center px-4 py-2 bg-component-input text-blue-400 rounded-lg border border-blue-400 cursor-pointer hover:bg-component transition-colors">
						<span className="text-xl ">{fileName || 'Выберите файл'}</span>
						<input type="file" onChange={handleFileChange} className="hidden" />
					</label>
				</div>

				{/* Кнопки */}
				<div className="flex justify-between">
					<button
						onClick={handleSaveDraft}
						className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-md transition-colors"
					>
						Сохранить черновик
					</button>
					<div className="flex space-x-2">
						<button
							onClick={onClose}
							className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-md transition-colors"
						>
							Отмена
						</button>
						<button
							onClick={handlePublish}
							className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 rounded-md transition-colors"
							disabled={!title || !selectedCategory}
						>
							Публикация
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const CreatePostModalWrapper = () => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.modal.createPostModalOpen)

	if (!isOpen) return null

	const handleClose = () => {
		dispatch(closeCreatePostModal())
	}

	const handlePublish = async (postData: {
		title: string
		category: string
		content: string
		file?: File
	}) => {
		await PostService.createPost({
			title: postData.title,
			content: postData.content,
			categoryName: postData.category,
		})
		handleClose()
	}

	const handleSaveDraft = async (postData: {
		title: string
		category: string
		content: string
		file?: File
	}) => {
		await PostService.saveDraft({
			title: postData.title,
			content: postData.content,
			categoryName: postData.category,
		})
		handleClose()
	}

	return (
		<CreatePostModal
			onClose={handleClose}
			onPublish={handlePublish}
			onSaveDraft={handleSaveDraft}
			categories={['фыавафы', 'вапваып', 'Развлечения']}
		/>
	)
}

export default CreatePostModalWrapper

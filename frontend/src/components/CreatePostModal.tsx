import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { closeCreatePostModal } from '../store/modal/modalSlice'
import { PostService } from '../services/post.service'
import axios from 'axios'

interface Category {
	id: number
	name: string
}

interface CreatePostModalProps {
	onClose: () => void
	onPublish: (postData: {
		title: string
		categoryId: number
		content: string
		file?: File
	}) => void
	onSaveDraft: (postData: {
		title: string
		categoryId: number
		content: string
		file?: File
	}) => void
	categories: Category[]
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
	onClose,
	onPublish,
	onSaveDraft,
	categories,
}) => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null,
	)
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
		if (!title || !selectedCategoryId) return
		onPublish({
			title,
			categoryId: selectedCategoryId,
			content,
			file: selectedFile || undefined,
		})
	}

	const handleSaveDraft = () => {
		if (!title || !selectedCategoryId) return
		onSaveDraft({
			title,
			categoryId: selectedCategoryId,
			content,
			file: selectedFile || undefined,
		})
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
			<div className="bg-component rounded-2xl shadow-lg p-6 w-full max-w-md text-white">
				<h2 className="text-2xl font-bold mb-4">Создание статьи</h2>

				<div className="mb-4">
					<label className="block text-xl font-medium text-white/60 mb-1">
						Выберите категорию
					</label>
					<select
						value={selectedCategoryId ?? ''}
						onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
						className="w-full p-2 bg-component-input border-none rounded-md
							text-white placeholder-white/40 focus:outline-none block text-sm
							bg-component-imput border border-gray-300 "
					>
						<option value="">-- Выберите категорию --</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<div className="mb-4">
					<label className="block text-xl font-medium text-white/60 mb-1">
						Название статьи
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 bg-component-input border-none rounded-md
							text-white placeholder-white/40 focus:outline-none block text-sm
							bg-component-imput border border-gray-300 "
						placeholder="Введите название"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-xl font-medium text-white/60 mb-1">
						Содержимое статьи
					</label>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="w-full p-2 bg-component-input border-none rounded-md
							text-white placeholder-white/40 focus:outline-none block text-sm
							bg-component-imput border border-gray-300 "
						placeholder="Введите текст "
						rows={4}
					/>
				</div>

				<div className="mb-6">
					<label className="block text-xl font-medium text-white/60 mb-1">
						Добавить файл
					</label>
					<label className="flex flex-col items-center px-4 py-2 bg-component-input text-blue-400 rounded-lg border border-blue-400 cursor-pointer hover:bg-component transition-colors">
						<span className="text-xl">{fileName || 'Выберите файл'}</span>
						<input type="file" onChange={handleFileChange} className="hidden" />
					</label>
				</div>

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
							disabled={!title || !selectedCategoryId}
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
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		if (!isOpen) return

		const fetchCategories = async () => {
			try {
				const response = await axios.get<Category[]>(
					'http://127.0.0.1:8000/api/v1/categories',
					{
						params: {
							offset: 0,
							limit: 100,
						},
					},
				)

				setCategories(response.data)
			} catch (error) {
				console.error('Ошибка при загрузке категорий:', error)
			}
		}

		fetchCategories()
	}, [isOpen])

	if (!isOpen) return null

	const handleClose = () => {
		dispatch(closeCreatePostModal())
	}

	const handlePublish = async (postData: {
		title: string
		categoryId: number
		content: string
		file?: File
	}) => {
		await PostService.createPost({
			title: postData.title,
			content: postData.content,
			categoryId: postData.categoryId,
			file: postData.file,
		})
		handleClose()
	}

	const handleSaveDraft = async (postData: {
		title: string
		categoryId: number
		content: string
		file?: File
	}) => {
		await PostService.saveDraft(postData)
		handleClose()
	}

	return (
		<CreatePostModal
			onClose={handleClose}
			onPublish={handlePublish}
			onSaveDraft={handleSaveDraft}
			categories={categories}
		/>
	)
}

export default CreatePostModalWrapper

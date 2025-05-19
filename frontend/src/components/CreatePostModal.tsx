// interface CreatePostModalProps {
// 	onClose: () => void
// 	onPublish: (postData: {
// 		title: string
// 		category: string
// 		file?: File
// 	}) => void
// 	onSaveDraft: (postData: {
// 		title: string
// 		category: string
// 		file?: File
// 	}) => void
// 	categories: string[]
// }

// const CreatePostModal: React.FC<CreatePostModalProps> = ({
// 	onClose,
// 	onPublish,
// 	onSaveDraft,
// 	categories,
// }) => {
// 	// const [title, setTitle] = useState('')
// 	// const [selectedCategory, setSelectedCategory] = useState('')
// 	// const [selectedFile, setSelectedFile] = useState<File | null>(null)
// 	// const [fileName, setFileName] = useState('')

// 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		if (e.target.files && e.target.files.length > 0) {
// 			const file = e.target.files[0]
// 			setSelectedFile(file)
// 			setFileName(file.name)
// 		}
// 	}

// 	const handlePublish = () => {
// 		if (!title || !selectedCategory) return
// 		onPublish({
// 			title,
// 			category: selectedCategory,
// 			file: selectedFile || undefined,
// 		})
// 	}

// 	const handleSaveDraft = () => {
// 		onSaveDraft({
// 			title,
// 			category: selectedCategory,
// 			file: selectedFile || undefined,
// 		})
// 	}

// 	return (
// 		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// 			<div className="bg-white rounded-lg p-6 w-full max-w-md">
// 				<h2 className="text-xl font-bold mb-4">Создание поста</h2>

// 				{/* Выбор категории */}
// 				<div className="mb-4">
// 					<label className="block text-sm font-medium text-gray-700 mb-1">
// 						Выберите категорию
// 					</label>
// 					<select
// 						value={selectedCategory}
// 						onChange={(e) => setSelectedCategory(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded-md"
// 					>
// 						<option value="">-- Выберите категорию --</option>
// 						{categories.map((category) => (
// 							<option key={category} value={category}>
// 								{category}
// 							</option>
// 						))}
// 					</select>
// 				</div>

// 				{/* Название статьи */}
// 				<div className="mb-4">
// 					<label className="block text-sm font-medium text-gray-700 mb-1">
// 						Название статьи
// 					</label>
// 					<input
// 						type="text"
// 						value={title}
// 						onChange={(e) => setTitle(e.target.value)}
// 						className="w-full p-2 border border-gray-300 rounded-md"
// 						placeholder="Введите название"
// 					/>
// 				</div>

// 				{/* Добавление файла */}
// 				<div className="mb-6">
// 					<label className="block text-sm font-medium text-gray-700 mb-1">
// 						Добавить файл
// 					</label>
// 					<label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50">
// 						<span className="text-sm">{fileName || 'Выберите файл'}</span>
// 						<input type="file" onChange={handleFileChange} className="hidden" />
// 					</label>
// 				</div>

// 				{/* Кнопки действий */}
// 				<div className="flex justify-between">
// 					<button
// 						onClick={handleSaveDraft}
// 						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
// 					>
// 						Сохранить черновик
// 					</button>
// 					<div className="flex space-x-2">
// 						<button
// 							onClick={onClose}
// 							className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
// 						>
// 							Отмена
// 						</button>
// 						<button
// 							onClick={handlePublish}
// 							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
// 							disabled={!title || !selectedCategory}
// 						>
// 							Публикация
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default CreatePostModal

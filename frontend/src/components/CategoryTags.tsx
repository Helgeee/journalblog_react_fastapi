const CategoryTags = ({ title = 'Популярное' }) => {
	return (
		<div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
			{/* Заголовок */}
			<h1 className="text-2xl font-bold text-gray-800 mb-6">#{title}</h1>

			{/* Список категорий */}
			<div className="space-y-4">
				{/* {categories.map(() => (
					<div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
						<div className="flex justify-between items-start">
							<div>
								<h2 className="text-lg font-semibold text-gray-700">#</h2>
								<p className="text-sm text-gray-500 mt-1"></p>
							</div>
						</div>
					</div>
				))} */}
			</div>
		</div>
	)
}

export default CategoryTags

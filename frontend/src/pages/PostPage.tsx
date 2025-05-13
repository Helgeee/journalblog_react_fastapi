const PostPage = () => {
	return (
		<div className="max-w-md mx-auto p-4 text-white  rounded-lg shadow bg-component">
			{/* Заголовок */}
			<h1 className="text-2xl font-bold  mb-4">post</h1>

			<div className="mb-6">
				<ul className=" pl-5 flex gap-1">
					<li className="bg-component-imput  rounded-lg px-2 text-center">
						Дороги
					</li>
					<li className="bg-component-imput  rounded-lg px-2 ">
						Гражданские строительство
					</li>
					<li className="bg-component-imput  rounded-lg px-2 ">Мосты</li>
				</ul>
			</div>

			{/* {post.imageUrl && (
				<div className="h-48 overflow-hidden">
					<img
						src={post.imageUrl}
						alt={post.imageAlt || post.title}
						className="w-full h-full object-cover"
					/>
				</div>
			)} */}

			<hr className="my-4 border-gray-200" />

			{/* Кнопка "Показать больше" */}
			<button className="text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors">
				{/* {post.showMoreText || 'Показать больше'} */}
				'Показать больше'
			</button>

			{/* Статистика */}
			<div className="grid grid-cols-3 gap-4 text-center  text-sm">
				<div>
					<p className="font-medium"> Views</p>
				</div>
				<div>
					<p className="font-medium"> Likes</p>
				</div>
				<div>
					<p className="font-medium"> Comments</p>
				</div>
			</div>
		</div>
	)
}

export default PostPage

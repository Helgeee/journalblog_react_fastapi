const Search = () => {
	return (
		<div className="bg-component mt-5  py-4 rounded-2xl">
			<form className="flex items-center gap-4 w-full max-w-4xl mx-auto  px-4">
				<label className="mb-2 text-sm font-medium text-gray-900 sr-only">
					Поиск
				</label>
				<div className="relative w-full">
					<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="block w-full p-4 ps-10 text-sm bg-component-imput border border-gray-300 rounded-lg "
						placeholder="Поиск"
						required
					/>
				</div>
				<button
					type="submit"
					className="text-white  end-2.5 bottom-2.5 btn-orange btn  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4"
				>
					Поиск
				</button>
			</form>
		</div>
	)
}

export default Search

// const Search = () => {
// 	return (
// 		<div className="bg-[#1F262E] mt-5 px-6 py-6 rounded-2xl">
// 			<form className="flex items-center gap-4 w-full max-w-4xl mx-auto">
// 				<div className="relative flex-grow">
// 					<span className="absolute inset-y-0 left-3 flex items-center text-[#9198B0]">
// 						<svg
// 							className="w-5 h-5"
// 							aria-hidden="true"
// 							xmlns="http://www.w3.org/2000/svg"
// 							fill="none"
// 							viewBox="0 0 20 20"
// 						>
// 							<path
// 								stroke="currentColor"
// 								strokeLinecap="round"
// 								strokeLinejoin="round"
// 								strokeWidth="2"
// 								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
// 							/>
// 						</svg>
// 					</span>
// 					<input
// 						type="search"
// 						id="default-search"
// 						className="w-full bg-[#2A323C] text-[#9198B0] placeholder-[#9198B0] rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none"
// 						placeholder="Поиск"
// 						required
// 					/>
// 				</div>
// 				<button
// 					type="submit"
// 					className="bg-[#FF6A33] hover:bg-[#e95d2a] text-white font-semibold rounded-lg px-6 py-3 text-sm transition"
// 				>
// 					Поиск
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

import { FC } from 'react'
import { FaMedal } from 'react-icons/fa'
import { TbArticle } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { openCreatePostModal } from '../store/modal/modalSlice'
import { useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'

const UserCard: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user, isAuth } = useAppSelector((state) => state.user)

	if (!isAuth || !user) return null

	return (
		<div className="border border-gray-500 rounded-xl p-5 text-center text-white grid">
			<div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-500 text-6xl">
				<FaRegUser />
			</div>
			<p className="text-lg font-semibold">{user.username}</p>

			<hr className="my-3 border-gray-600" />

			<div className="flex justify-center items-center gap-2 text-orange-400 text-xl">
				<FaMedal />
			</div>

			<div
				className="flex justify-center items-center btn cursor-pointer btn-bar max-w-36 px-5  mt-4 mx-auto"
				onClick={() => navigate('/setting')}
			>
				<span className="flex justify-center items-center gap-2">
					{' '}
					{<IoSettingsOutline />} Настройки
				</span>
			</div>

			<hr className="my-3 border-gray-600" />

			<div className="flex justify-center items-center p-5">
				<button
					className="btn btn-orange w-auto"
					onClick={() => dispatch(openCreatePostModal())}
				>
					<TbArticle />
					<span>Создать статью</span>
				</button>
			</div>
		</div>
	)
}

export default UserCard

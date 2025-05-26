import { FC } from 'react'
import { FaMedal } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { openCreatePostModal } from '../store/modal/modalSlice'
import { useNavigate } from 'react-router-dom' // <--- ВАЖНО

const UserCard: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user, isAuth } = useAppSelector((state) => state.user)

	if (!isAuth || !user) return null

	return (
		<div className="border border-gray-500 rounded-xl p-5 text-center text-white ">
			<div className="w-32 h-32 rounded-full bg-gray-500 mx-auto mb-4" />
			<p className="text-lg font-semibold">{user.username}</p>
			<hr className="my-3 border-gray-600" />
			<div className="flex justify-center items-center gap-2 text-orange-400 text-xl">
				<FaMedal />
			</div>

			<div className="btn cursor-pointer" onClick={() => navigate('/setting')}>
				<span>Настройки</span>
			</div>

			<hr className="my-3 border-gray-600" />
			<div className="flex justify-center items-center p-5">
				<button
					className="btn btn-orange"
					onClick={() => dispatch(openCreatePostModal())}
				>
					<span>Создать статью</span>
				</button>
			</div>
		</div>
	)
}

export default UserCard

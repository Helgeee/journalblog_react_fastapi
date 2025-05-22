import { FC } from 'react'
import { FaMedal } from 'react-icons/fa'
import { useAppSelector } from '../store/hooks'

const UserCard: FC = () => {
	const { user, isAuth } = useAppSelector((state) => state.user)

	if (!isAuth || !user) return null

	return (
		<div className="border border-gray-500 rounded-xl p-5 text-center text-white">
			<div className="w-32 h-32 rounded-full bg-gray-500 mx-auto mb-4" />
			<p className="text-lg font-semibold">{user.username}</p>
			<hr className="my-3 border-gray-600" />
			<div className="flex justify-center items-center gap-2 text-orange-400 text-xl">
				<FaMedal />
				<span>{/* Дополнительная информация по желанию */}</span>
			</div>
		</div>
	)
}

export default UserCard

import { FC } from 'react'
import { useAppSelector } from '../store/hooks'
import { FaMedal } from 'react-icons/fa'

const UserCard: FC = () => {
	const user = useAppSelector((state) => state.user)

	// if (!user.isAuth) return null

	return (
		<div className="border border-gray-500 rounded-xl p-5 text-center text-white">
			<div className="w-32 h-32 rounded-full bg-gray-500 mx-auto mb-4" />

			<p className="text-lg font-semibold">@{user.username}</p>

			<hr className="my-3 border-gray-600" />

			<div className="flex justify-center items-center gap-2 text-orange-400 text-xl">
				<FaMedal />
				<span>user.rating</span>
				<span className="text-white">[ {user.level} ]</span>
			</div>
		</div>
	)
}

export default UserCard

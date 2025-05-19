import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { closeAuthModal } from '../store/modal/modalSlice'
import Auth from './Auth'

const AuthModal: FC = () => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.modal.authModalOpen)

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center  ">
			<div className="relative bg-dark rounded-xl w-full max-w-md  bg-component backdrop-blur-lg">
				<button
					onClick={() => dispatch(closeAuthModal())}
					className="absolute top-2 right-2 p-5 text-white hover:text-red-400"
				>
					✕
				</button>
				<Auth />
			</div>
		</div>
	)
}

export default AuthModal

import { FC, ReactNode } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-xl bg-dark rounded-xl p-10 shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="absolute top-3 right-3 text-white/60 hover:text-white"
					onClick={onClose}
				>
					✕
				</button>
				{children}
			</div>
		</div>
	)
}

export default Modal

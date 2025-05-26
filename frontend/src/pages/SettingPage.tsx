import React, { useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const SettingPage: React.FC = () => {
	const [isDeleting, setIsDeleting] = useState(false)
	const navigate = useNavigate()

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			'Вы уверены, что хотите удалить аккаунт? Это действие необратимо.',
		)
		if (!confirmed) return

		try {
			setIsDeleting(true)
			await AuthService.deleteAccount()
			toast.success('Аккаунт успешно удалён')

			localStorage.clear()
			navigate('/login')
		} catch (error) {
			toast.error('Ошибка при удалении аккаунта')
			console.error(error)
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<div className="max-w-md mx-auto  my-10 p-6 text-white rounded-lg backdrop-blur-sm  ">
			<h1 className="text-2xl mb-6">Настройки аккаунта</h1>
			<button
				onClick={handleDeleteAccount}
				disabled={isDeleting}
				className=" btn btn-orange disabled:opacity-50 px-4 py-2 rounded"
			>
				{isDeleting ? 'Удаление...' : 'Удалить аккаунт'}
			</button>
		</div>
	)
}

export default SettingPage

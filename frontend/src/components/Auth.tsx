// import { FC, useState } from 'react'
// import { AuthService } from '../services/auth.service'
// import { toast } from 'react-toastify'
// import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
// import { useAppDispatch } from '../store/hooks'
// import { useNavigate } from 'react-router-dom'
// import { login } from '../store/user/userSlice'
// import { closeAuthModal } from '../store/modal/modalSlice'

// const Auth: FC = () => {
// 	const [email, setEmail] = useState<string>('')
// 	const [username, setUsername] = useState<string>('')
// 	const [password, setPassword] = useState<string>('')
// 	const [isLogin, setIsLogin] = useState<boolean>(false)
// 	const dispatch = useAppDispatch()
// 	const navigate = useNavigate()

// 	interface ApiError {
// 		response?: {
// 			data: {
// 				message: string
// 			}
// 		}
// 	}

// 	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
// 		try {
// 			e.preventDefault()
// 			const data = await AuthService.login({ username, password })
// 			if (data) {
// 				setTokenToLocalStorage('token', data.token)
// 				dispatch(login(data))
// 				toast.success('Вы вошли в аккаунт')
// 				navigate('/')
// 				dispatch(closeAuthModal())
// 			}
// 		} catch (err) {
// 			const error = (err as ApiError).response?.data.message || 'Ошибка входа'
// 			toast.error(error)
// 		}
// 	}

// 	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
// 		try {
// 			e.preventDefault()
// 			const data = await AuthService.registration({ email, username, password })
// 			console.log(data)
// 			if (data) {
// 				toast.success('Аккаунт создан.')
// 				setIsLogin(!isLogin)
// 			}
// 		} catch (err) {
// 			const error =
// 				(err as ApiError).response?.data.message || 'Ошибка регистрации'
// 			toast.error(error)
// 			console.error('Registration error:')
// 		}
// 	}

// 	return (
// 		<div className="flex  flex-col justify-center items-center rounded-lg  p-10   text-white  ">
// 			<h1 className="text-center text-xl mb-10">
// 				{isLogin ? 'Вход' : 'Регистрация'}
// 			</h1>

// 			<form
// 				onSubmit={isLogin ? loginHandler : registrationHandler}
// 				className="mx-auto flex w-2/3 flex-col  gap-5"
// 			>
// 				{!isLogin && (
// 					<input
// 						type="email"
// 						className="input"
// 						placeholder="email"
// 						name="email"
// 						onChange={(e) => setEmail(e.target.value)}
// 					/>
// 				)}

// 				<input
// 					type="text"
// 					className="input"
// 					placeholder="username"
// 					name="username"
// 					onChange={(e) => setUsername(e.target.value)}
// 				/>
// 				<input
// 					type="password"
// 					className="input"
// 					placeholder="password"
// 					name="password"
// 					onChange={(e) => setPassword(e.target.value)}
// 				/>

// 				<button className=" btn btn-green mx-auto">
// 					{' '}
// 					{isLogin ? 'Вход' : 'Регистрация'}{' '}
// 				</button>
// 			</form>

// 			<div className=" flex justify-center mt-5">
// 				{isLogin ? (
// 					<button
// 						onClick={() => setIsLogin(!isLogin)}
// 						className="text-slate-300 hover:text-white"
// 					>
// 						У вас нет учетной записи
// 					</button>
// 				) : (
// 					<button
// 						onClick={() => setIsLogin(!isLogin)}
// 						className="text-slate-300 hover:text-white"
// 					>
// 						Уже есть аккаунт
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default Auth

import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/user/userSlice'
import { closeAuthModal } from '../store/modal/modalSlice'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(true) // по умолчанию - вход
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	interface ApiError {
		response?: {
			data: {
				message: string
			}
		}
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const result = await AuthService.login({ username, password })
			if (result?.user) {
				dispatch(login(result.user))
				toast.success('Вы вошли в аккаунт')
				navigate('/')
				dispatch(closeAuthModal())
			}
		} catch (err) {
			const error = (err as ApiError).response?.data.message || 'Ошибка входа'
			toast.error(error)
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const data = await AuthService.registration({ email, username, password })
			if (data) {
				toast.success('Аккаунт создан.')
				setIsLogin(true) // переключаем на форму входа
			}
		} catch (err) {
			const error =
				(err as ApiError).response?.data.message || 'Ошибка регистрации'
			toast.error(error)
		}
	}

	return (
		<div className="flex flex-col justify-center items-center rounded-lg p-10 text-white">
			<h1 className="text-center text-xl mb-10">
				{isLogin ? 'Вход' : 'Регистрация'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="mx-auto flex w-2/3 flex-col gap-5"
			>
				{!isLogin && (
					<input
						type="email"
						className="input"
						placeholder="Email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				)}

				<input
					type="text"
					className="input"
					placeholder="Username"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>

				<button className="btn btn-green mx-auto">
					{isLogin ? 'Вход' : 'Регистрация'}
				</button>
			</form>

			<div className="flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(false)}
						className="text-slate-300 hover:text-white"
					>
						Нет аккаунта? Зарегистрируйтесь
					</button>
				) : (
					<button
						onClick={() => setIsLogin(true)}
						className="text-slate-300 hover:text-white"
					>
						Уже есть аккаунт? Войти
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth

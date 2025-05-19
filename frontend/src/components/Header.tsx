import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtс, FaSignOutAlt } from 'react-icons/fa'
// import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'
import { logout } from '../store/user/userSlice'
import { openAuthModal } from '../store/modal/modalSlice'

const Header: FC = () => {
	// const isAuth = useAuth()
	const isAuth = true

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = async () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('Logged out successfully')
		navigate('/')
	}

	return (
		<header className="relative flex items-center justify-center space-between text-lg px-5 py-3 shadow-sm backdrop-blur-sm bg-component">
			{/* Menu */}
			{isAuth && (
				<nav className=" mr-10 ">
					<ul className="flex items-center gap-20 ">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Дороги
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Промышленное строительство
							</NavLink>
						</li>

						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Гражданское строительство
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Мосты
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{/* Actions */}

			{isAuth ? (
				<button
					className="btn btn-orange"
					onClick={logoutHandler}
					aria-label="Log Out"
				>
					<span>Выход</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className="py-2 text-white/50 hover:text-white ml-auto mr-10"
					to="/auth"
					aria-label="Вход / Регистрация"
					onClick={() => dispatch(openAuthModal())}
				>
					Вход / Регистрация
				</Link>
			)}
			<button
				onClick={() => dispatch(openAuthModal())}
				className="py-2 text-white/50 hover:text-white ml-auto mr-10"
			>
				Вход / Регистрация
			</button>
		</header>
	)
}
export default Header

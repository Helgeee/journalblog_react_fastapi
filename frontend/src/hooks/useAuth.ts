import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { AuthService } from '../services/auth.service'
import { login, logout } from '../store/user/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export const useAuth = () => {
	const dispatch = useAppDispatch()
	const user = useSelector((state: RootState) => state.user.user)
	return !!user

	useEffect(() => {
		const checkAuth = async () => {
			const token = getTokenFromLocalStorage()
			if (token) {
				try {
					const user = await AuthService.getProfile()
					if (user) dispatch(login(user))
					else dispatch(logout())
				} catch {
					dispatch(logout())
				}
			}
		}

		checkAuth()
	}, [dispatch])
}

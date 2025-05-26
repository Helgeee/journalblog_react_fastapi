import { instance } from '../api/axios.api'
import { IUser, IUserData, IResponseUserData } from '../types/types'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'

export const AuthService = {
	async registration(
		userData: IUserData,
	): Promise<IResponseUserData | undefined> {
		const response = await instance.post<IResponseUserData>('/users', null, {
			params: {
				username: userData.username,
				email: userData.email,
				password: userData.password,
			},
		})
		return response.data
	},

	async login(userData: IUserData): Promise<IUser | undefined> {
		const formData = new URLSearchParams()
		formData.append('username', userData.username)
		formData.append('password', userData.password)

		const { data } = await instance.post<IUser>('/jwt/login', formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})

		// Предположим, что сервер возвращает { access_token: string, ... }
		if (data && (data as any).access_token) {
			setTokenToLocalStorage((data as any).access_token)
		}

		return data
	},

	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('jwt/users/me')
		return data
	},
	deleteAccount: async () => {
		return instance.delete('/users/me') // пример эндпоинта удаления текущего пользователя
	},
}

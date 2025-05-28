import { instance } from '../api/axios.api'
import { IUser, IUserData } from '../types/types'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'

export const AuthService = {
	async registration(userData: IUserData): Promise<IUser> {
		const response = await instance.post<IUser>('/users', null, {
			params: {
				username: userData.username,
				email: userData.email,
				password: userData.password,
			},
		})
		return response.data
	},

	async login(
		userData: IUserData,
	): Promise<{ user: IUser; access_token: string }> {
		const formData = new URLSearchParams()
		formData.append('username', userData.username)
		formData.append('password', userData.password)

		const { data } = await instance.post<{ access_token: string }>(
			'/jwt/login',
			formData,
			{
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			},
		)

		const access_token = data.access_token
		if (!access_token) throw new Error('No access token received')
		setTokenToLocalStorage(access_token)

		const user = await this.getProfile()
		if (!user) throw new Error('User profile not found after login')

		return { user, access_token }
	},

	async getProfile(): Promise<IUser | undefined> {
		try {
			const { data } = await instance.get<IUser>('jwt/users/me')
			return data
		} catch (error) {
			return undefined
		}
	},

	deleteAccount: async () => {
		return instance.delete('/users/me')
	},
}

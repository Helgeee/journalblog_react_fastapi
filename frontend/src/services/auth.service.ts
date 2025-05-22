import { instance } from '../api/axios.api'
import { IResponseUserData, IUser, IUserData } from '../types/types'

export const AuthService = {
	// async registration(
	// 	userData: IUserData,
	// ): Promise<IResponseUserData | undefined> {
	// 	const { data } = await instance.post<IResponseUserData>('/users', userData)
	// 	return data
	// },
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

	// async login(userData: IUserData): Promise<IUser | undefined> {
	// 	const { data } = await instance.post<IUser>('/jwt/login', userData)
	// 	return data
	// },
	async login(userData: IUserData): Promise<IUser | undefined> {
		const formData = new URLSearchParams()
		formData.append('username', userData.username)
		formData.append('password', userData.password)

		const { data } = await instance.post<IUser>('/jwt/login', formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		return data
	},

	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('jwt/users/me')
		if (data) return data
	},
	async get(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('jwt/users/me')
		if (data) return data
	},
}

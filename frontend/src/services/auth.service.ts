import { instance } from '../api/axios.api'
import { IResponseUserData, IUser, IUserData } from '../types/types'

export const AuthService = {
	async registration(
		userData: IUserData,
	): Promise<IResponseUserData | undefined> {
		const { data } = await instance.post<IResponseUserData>(
			'/users',
			userData,
		)
		return data
	},
	async login(userData: IUserData): Promise<IUser | undefined> {
		const { data } = await instance.post<IUser>('/jwt/login', userData)
		return data
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('jwt/users/me')
		if (data) return data
	},
}

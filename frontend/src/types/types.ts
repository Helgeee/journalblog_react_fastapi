export interface IUser {
	id: number
	username: string
	email: string
	token: string
}

export interface IUserData {
	email?: string
	username: string
	password: string
}

export interface IResponseUser {
	email: string
	id: number
	createAt: string
	updatedAt: string
	password: string
}

export interface IResponseUserData {
	token: string
	user: IResponseUser
}

export type ICreatePostPayload = {
	title: string
	content: string
	categoryName: string
}

export type IPost = {
	id: number
	title: string
	content: string
	category: {
		id: number
		name: string
	}
}

export type ICategory = {
	name: string
}

export type ITags = {
	name: string
}

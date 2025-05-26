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

export interface ICreatePostPayload {
	title: string
	content: string
	categoryId: number
}

export interface IPost {
	id: number
	title: string
	content: string
	category: ICategory
	user: any[]
	tag: any[]
	is_published: 'published' | 'nonpublished'
}

export type ICategory = {
	name: string
}

export type ITags = {
	name: string
}

export interface IUser {
	id: number
	username: string
	email: string
	token: string
}

export interface IUserData {
	email: string
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

export type IPost = {
	title: string
	content : string
}

export type ICategory = {
	name: string
	
}


export type ITags = {

	name: string
}

import {} from '../api/axios.api'

import { instance } from '../api/axios.api'
import { IPost, ICreatePostPayload } from '../types/types'

export const PostService = {
	// Получить все посты
	async getAll(): Promise<IPost[]> {
		const { data } = await instance.get<IPost[]>('/articles')
		return data
	},
	async getPostById(id: string): Promise<IPost> {
		const { data } = await instance.get<IPost>(`/articles/${id}`)
		return data
	},

	async createPost(payload: ICreatePostPayload): Promise<IPost> {
		const { title, content, categoryName } = payload

		const { data } = await instance.post<IPost>(
			'/articles',
			{
				category: {
					name: categoryName,
				},
				user: [],
				tag: [],
			},
			{
				params: {
					title,
					content,
				},
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			},
		)

		return data
	},

	async saveDraft(payload: ICreatePostPayload): Promise<IPost> {
		const { title, content, categoryName } = payload

		const { data } = await instance.post<IPost>(
			'/articles/draft',
			{
				category: {
					name: categoryName,
				},
				user: [],
				tag: [],
			},
			{
				params: {
					title,
					content,
				},
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			},
		)

		return data
	},
}

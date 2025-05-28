import { instance } from '../api/axios.api'
import { IPost, ICreatePostPayload } from '../types/types'

const API_URL = '/articles'

export const PostService = {
	async createPost(
		payload: ICreatePostPayload & { file?: File },
	): Promise<IPost> {
		const { title, content, categoryId, file } = payload

		if (file) {
			const formData = new FormData()
			formData.append('file', file)

			const { data } = await instance.post<IPost>('/articles', formData, {
				params: {
					title,
					content,
					category_id: categoryId,
				},
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			return data
		} else {
			// Без файла — тело пустое, все через query params
			const { data } = await instance.post<IPost>('/articles', null, {
				params: {
					title,
					content,
					category_id: categoryId,
				},
				headers: {
					'Content-Type': 'application/json', // можно не указывать, тело пустое
				},
			})
			return data
		}
	},

	async saveDraft(
		payload: ICreatePostPayload & { file?: File },
	): Promise<IPost> {
		const { title, content, categoryId, file } = payload

		const formData = new FormData()
		if (file) formData.append('file', file)

		const { data } = await instance.post<IPost>('/articles/draft', formData, {
			params: {
				title,
				content,
				category_id: categoryId,
			},
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return data
	},

	async getAll(): Promise<IPost[]> {
		const { data } = await instance.get<IPost[]>('/articles')
		return data
	},
	getPostById: async (id: string | number): Promise<IPost> => {
		const response = await instance.get(`${API_URL}/${id}`)
		return response.data
	},
}

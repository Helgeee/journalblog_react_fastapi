import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

export const instance = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/v1',
})

instance.interceptors.request.use((config) => {
	// config.headers.Authorization = `Bearer dev-token`
	config.headers.Authorization = `Bearer ${getTokenFromLocalStorage() || ''}`

	const token = getTokenFromLocalStorage()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// import axios from 'axios'
// import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

// export const instance = axios.create({
// 	baseURL: 'http://127.0.0.1:8000/api',
// 	headers: {
// 		Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
// 	},
// })

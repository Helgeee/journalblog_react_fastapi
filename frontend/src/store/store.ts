import { configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice'
import modalReducer from './modal/modalSlice'

export const store = configureStore({
	reducer: {
		user: useReducer,
		modal: modalReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

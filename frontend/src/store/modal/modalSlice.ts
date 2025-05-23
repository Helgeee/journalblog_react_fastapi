import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
	authModalOpen: boolean
	createPostModalOpen: boolean
}

const initialState: ModalState = {
	authModalOpen: false,
	createPostModalOpen: false,
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openAuthModal: (state) => {
			state.authModalOpen = true
		},
		closeAuthModal: (state) => {
			state.authModalOpen = false
		},
		openCreatePostModal: (state) => {
			state.createPostModalOpen = true
		},
		closeCreatePostModal: (state) => {
			state.createPostModalOpen = false
		},
	},
})

export const {
	openAuthModal,
	closeAuthModal,
	openCreatePostModal,
	closeCreatePostModal,
} = modalSlice.actions
export default modalSlice.reducer

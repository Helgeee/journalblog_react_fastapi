import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import RoadsPage from '../pages/RoadsPage'
import PostPage from '../pages/PostPage'
import BridgesPage from '../pages/BridgesPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'roads',
				element: <RoadsPage />,
			},
			{
				path: 'bridges',
				element: <BridgesPage />,
			},
			{
				path: 'post/:id', // 👈 добавь этот маршрут
				element: <PostPage />,
			},

			// {
			// 	path: 'auth',
			// 	element: <Auth />,
			// },
		],
	},
])

export default router

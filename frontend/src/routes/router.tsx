import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import RoadsPage from '../pages/RoadsPage'

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
			// {
			// 	path: 'auth',
			// 	element: <Auth />,
			// },
		],
	},
])

export default router

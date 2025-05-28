import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import RoadsPage from '../pages/RoadsPage'
import PostPage from '../pages/PostPage'
import BridgesPage from '../pages/BridgesPage'
import SettingPage from '../pages/SettingPage'
import FactoryPage from '../pages/FactoryPage'
import CivilPage from '../pages/CivilPage'

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
				path: 'factory',
				element: <FactoryPage />,
			},
			{
				path: 'civil',
				element: <CivilPage />,
			},
			{
				path: 'post/:id',
				element: <PostPage />,
			},
			{
				path: 'setting',
				element: <SettingPage />,
			},

			// {
			// 	path: 'auth',
			// 	element: <Auth />,
			// },
		],
	},
])

export default router

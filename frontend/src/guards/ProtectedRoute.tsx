import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
	const isAuthenticated = !!localStorage.getItem('accessToken') // или из AuthContext/Redux

	return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute

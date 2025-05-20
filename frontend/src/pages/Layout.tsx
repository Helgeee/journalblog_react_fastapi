import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Search from '../components/Search'

import UserCard from '../components/UserCard'
import AuthModal from '../components/AuthModal'

const Layout: FC = () => {
	return (
		<div className="min-h-screen  pb-20 font-roboto text-white layout">
			<div>
				<Header />
			</div>

			<AuthModal />
			<div className="flex container-xl mx-auto px-4 gap-6 mt-6">
				<div className="container   ">
					<Search />
					<Outlet />
				</div>
				<aside className="sticky w-80 shrink-0 right-10">
					<UserCard />
				</aside>
			</div>
		</div>
	)
}

export default Layout

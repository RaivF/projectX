import { PropsWithChildren, useEffect } from "react"

import { VideoFeed } from "./pages/videoFeed/index"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { getAccessToken } from "./lib/local-storage.lib"

import { Header } from "./components/header"
import { Auth } from "./processes/auth/auth"

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<WithAuth>
						<Header />
						<VideoFeed />
					</WithAuth>
				}
			/>

			<Route path="/auth" element={<Auth />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}

export default App

function WithAuth(props: PropsWithChildren) {
	const nav = useNavigate()

	useEffect(() => {
		const tokens = getAccessToken()

		if (!tokens) {
			nav("/Auth")
		}
	}, [])

	return <>{props.children}</>
}

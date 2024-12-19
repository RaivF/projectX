import { PropsWithChildren, useEffect } from "react"

import { VideoFeed } from "./components/videoFeed/index"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { getAccessToken } from "./lib/local-storage.lib"
import { SignUp } from "./components/signup"
import { SignIn } from "./components/signin"
import { Header } from "./components/header/header.style"

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
			<Route path="/signup" element={<SignUp />} />
			<Route path="/signin" element={<SignIn />} />

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
			nav("/signin")
		}
	}, [])

	return <>{props.children}</>
}

import { Profile, Tokens } from "../types/types"

const getVideos = async (props: { start: number; count: number }) => {
	const response = await fetch(`http://localhost:3010/videos?start=${props.start}&count=${props.count}`)

	if (!response.ok) {
		throw new Error("Failed to fetch videos")
	}

	const data: string[] = await response.json()
	return data
}

const login = async (login: string, password: string): Promise<Tokens> => {
	const response = await fetch("http://localhost:3010/login", {
		method: "POST",
		body: JSON.stringify({ login, password }),
		headers: { "Content-Type": "application/json" },
	})

	if (!response.ok) {
		const text = await response.text()
		throw new Error(text)
	}

	const data: Tokens = await response.json()
	return data
}

const register = async (login: string, password: string): Promise<Tokens> => {
	const response = await fetch("http://localhost:3010/register", {
		method: "POST",
		body: JSON.stringify({ login, password }),
		headers: { "Content-Type": "application/json" },
	})

	if (!response.ok) {
		const text = await response.text()
		throw new Error(text)
	}

	const data: Tokens = await response.json()
	return data
}

const getProfile = async (login: string): Promise<Profile> => {
	const response = await fetch(`http://localhost:3010/profile/${login}`)

	if (!response.ok) {
		throw new Error("ошибка")
	}

	const data: Profile = await response.json()
	return data
}

export const api = {
	getVideos,
	login,
	register,
	getProfile,
}

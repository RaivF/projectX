const key = "access-token"

export const setAccessToken = (token: string) => {
	localStorage.setItem(key, token)
}

export const getAccessToken = (): string | null => {
	return localStorage.getItem(key)
}

export const removeAccessToken = () => {
	localStorage.removeItem(key)
}

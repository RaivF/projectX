export type Tokens = {
	token: string
}
export type Profile = {
	id: string
	login: string
}
export type userType = {
	id: string
	name: string
}

export type initialStateType = {
	user: userType
	token: string | null
}

export interface Video {
	id: string
	title: string
	url: string
}

export interface VideoState {
	videos: Video[]
	loading: boolean
}

export type initialThemeType = {
	theme: string
}

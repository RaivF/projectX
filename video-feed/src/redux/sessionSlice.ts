// src/redux/videoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getAccessToken, removeAccessToken, setAccessToken } from "../lib/local-storage.lib"

type userType = {
	id: string
	name: string
}

export type initialStateType = {
	user: userType
	token: string | null
}

const initialState: initialStateType = {
	user: { id: "1", name: "guest" },
	token: getAccessToken() ? getAccessToken() : null,
}

const sessionReducer = createSlice({
	name: "session",
	initialState,
	reducers: {
		setUserLogin(state, action: PayloadAction<string>) {
			state.token = action.payload
			setAccessToken(action.payload)
		},

		setUserLogout(state) {
			removeAccessToken()
			state.token = null
		},
	},
})

export const { setUserLogin, setUserLogout } = sessionReducer.actions
export default sessionReducer.reducer

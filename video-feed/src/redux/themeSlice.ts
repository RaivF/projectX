// src/redux/videoSlice.ts
import { createSlice } from "@reduxjs/toolkit"
import { initialThemeType } from "../types/types"

const initialState: initialThemeType = {
	theme: "LIGHT",
}

const themeReducer = createSlice({
	name: "session",
	initialState,
	reducers: {
		setTheme(state) {
			if (state.theme === "LIGHT") {
				state.theme = "DARK"
			} else {
				state.theme = "LIGHT"
			}
			
		},
	},
})

export const { setTheme } = themeReducer.actions
export default themeReducer.reducer

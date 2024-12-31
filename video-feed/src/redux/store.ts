// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit"
import videoReducer from "./videoSlice"
import sessionReducer from "./sessionSlice"
import themeReducer from "./themeSlice"

export const store = configureStore({
	reducer: {
		video: videoReducer,
		session: sessionReducer,
		theme: themeReducer,
	},
})

export type Store = ReturnType<typeof store.getState>

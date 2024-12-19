// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './videoSlice'
import sessionReducer from './sessionSlice'

export const store = configureStore({
	reducer: {
		video: videoReducer,
		session: sessionReducer,
	},
})

export type Store = ReturnType<typeof store.getState>

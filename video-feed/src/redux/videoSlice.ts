// src/redux/videoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Video {
	id: string
	title: string
	url: string
}

interface VideoState {
	videos: Video[]
	loading: boolean
}

const initialState: VideoState = {
	videos: [],
	loading: false,
}

const videoSlice = createSlice({
	name: "video",
	initialState,
	reducers: {
		addVideos(state, action: PayloadAction<Video[]>) {
			state.videos.push(...action.payload)
		},
		resetVideos(state) {
			state.loading = false
			state.videos = []
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload
		},
	},
})

export const { addVideos, setLoading, resetVideos } = videoSlice.actions
export default videoSlice.reducer

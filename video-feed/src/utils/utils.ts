import { MutableRefObject } from "react"
import { api } from "../api-provider/api"
import { addVideos, setLoading } from "../redux/videoSlice"

export const fetchVideos = async (start: number, count: number, dispatch: any) => {
	dispatch(setLoading(true))

	try {
		const videos = await api.getVideos({ start: start, count })

		const videoObjects = videos.map((name: any) => ({
			id: name, // Используем имя файла как уникальный идентификатор
			title: name, // заголовок
			url: `http://localhost:3010/video/${name}`, // Формируем правильный URL
		}))

		dispatch(addVideos(videoObjects)) // Добавляем полученные видео в состояние
	} catch (error) {
		console.error("Error:", error)
	} finally {
		setTimeout(() => {
			dispatch(setLoading(false))
		}, 2000)
	}
}

interface VideoElement {
	pause: () => void
	play: () => Promise<void>
	load: () => void
	scrollIntoView: (options?: ScrollIntoViewOptions) => void
}

interface VideoRefs {
	current: VideoElement[]
}

interface ActiveIndexRef {
	current: number
}

const handleVideoNavigation = (
	videoRefs: VideoRefs,
	activeIndexRef: ActiveIndexRef,
	direction: number,
	setIsPaused: (isPaused: boolean) => void
) => {
	setIsPaused(false)
	activeIndexRef.current += direction

	const video = videoRefs.current[activeIndexRef.current]
	if (!video) return

	video.scrollIntoView({ behavior: "smooth", block: "center" })
	video.play().catch((e: any) => console.log(e))

	const prevVideo = videoRefs.current[activeIndexRef.current - direction]
	if (prevVideo) prevVideo.pause()
}

export const handleKeyPress = (
	event: KeyboardEvent,
	setIsPaused: (isPaused: boolean) => void,
	activeIndexRef: ActiveIndexRef,
	videos: any,
	videoRefs: VideoRefs
) => {
	if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return

	event.preventDefault()

	if (activeIndexRef.current === -1) {
		videoRefs.current.forEach((element: VideoElement) => {
			element.load()
			console.log("video loading")
		})
		activeIndexRef.current = 0
	}

	if (event.key === "ArrowDown" && activeIndexRef.current < videoRefs.current.length - 1) {
		handleVideoNavigation(videoRefs, activeIndexRef, 1, setIsPaused)
	}

	if (event.key === "ArrowUp" && activeIndexRef.current > 0) {
		handleVideoNavigation(videoRefs, activeIndexRef, -1, setIsPaused)
	}
}

export const onVideoClick = (index: number, videoRefs: any, activeIndexRef: any, isPaused: any, setIsPaused: any) => {
	videoRefs.current.forEach((element: { pause: () => void }) => {
		element.pause()
	})
	const video = videoRefs.current[index]

	if (index === activeIndexRef.current && video) {
		if (isPaused) video.play()
		else video.pause()

		setIsPaused(!isPaused)
		return
	}
	activeIndexRef.current = index

	const prevVideo = activeIndexRef.current !== null ? videoRefs.current[activeIndexRef.current] : null

	if (prevVideo) prevVideo.pause()
	if (video) video.play()
}

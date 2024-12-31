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

export const handleKeyPress = (
	event: KeyboardEvent,
	setIsPaused: any,
	activeIndex: any,
	setActiveIndex: any,
	videos: any,
	videoRefs: any
) => {
	if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
	event.preventDefault()

	setIsPaused(false)

	if (activeIndex === null) {
		return setActiveIndex(0)
	}

	if (event.key === "ArrowDown" && activeIndex < videos.length - 1) {
		const prevPrevVideo = videoRefs.current[activeIndex]
		prevPrevVideo?.pause()

		setActiveIndex(activeIndex + 1)
	}
	if (event.key === "ArrowUp" && activeIndex > 0) setActiveIndex(activeIndex - 1)
}

export const onVideoClick = (index: number, videoRefs: any, activeIndex: any, isPaused: any, setIsPaused: any, setActiveIndex: any) => {
	const video = videoRefs.current[index]

	if (index === activeIndex && video) {
		if (isPaused) video.play()
		else video.pause()

		setIsPaused(!isPaused)
		return
	}

	setActiveIndex(index)

	const prevVideo = activeIndex !== null ? videoRefs.current[activeIndex] : null

	if (prevVideo) prevVideo.pause()
	if (video) video.play()
}

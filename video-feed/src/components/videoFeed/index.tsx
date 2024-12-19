import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addVideos, resetVideos, setLoading } from "../../redux/videoSlice"
import { VideoContainer } from "./VideoFeed.styles"
import { Store } from "../../redux/store"
import { api } from "../../api-provider/api"

export const VideoFeed = () => {
	const dispatch = useDispatch()
	const { videos, loading } = useSelector((state: Store) => state.video)
	const [isPaused, setIsPaused] = useState(false)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const endIndexVideo = videos.length - 2

	useEffect(() => {
		fetchVideos(0, 10)

		return () => {
			dispatch(resetVideos())
		}
	}, [])

	useEffect(() => {
		if (activeIndex === null) return
		const video = videoRefs.current[activeIndex]
		if (!video) return

		video.scrollIntoView({ behavior: "smooth", block: "center" })

		video.play().catch((e) => {
			console.log("ошибка", e)
		})

		return () => {
			video.pause()
		}
	}, [activeIndex, videos])

	useEffect(() => {
		if (!videos.length) return

		document.addEventListener("keydown", handleKeyPress)

		return () => {
			document.removeEventListener("keydown", handleKeyPress)
		}
	}, [activeIndex, videos])

	// useEffect(() => {
	// 	if (!videos) return
	// 	if (!activeIndex) return

	// 	if (activeIndex >= endIndexVideo) {
	// 		fetchNextPack()
	// 	}
	// }, [activeIndex])

	// const fetchNextPack = () => {
	// 	if (!activeIndex) return

	// 	это реализация динамической прогрузки, но при малом количестве видео она не нужна
	// 	if (activeIndex >= endIndexVideo) {
	// 		const VIDEOS_COUNT = 100
	// 		fetchVideos(videos.length + 1, VIDEOS_COUNT)
	// 	}
	// }

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
		event.preventDefault()

		setIsPaused(false)

		if (activeIndex === null) {
			return setActiveIndex(0)
		}

		if (event.key === "ArrowDown" && activeIndex < videos.length - 1) {
			const nextVideo = videoRefs.current[activeIndex + 2]
			nextVideo?.load()
			const previousVideo = videoRefs.current[activeIndex - 2]
			previousVideo?.load()
			setActiveIndex(activeIndex + 1)
		}
		if (event.key === "ArrowUp" && activeIndex > 0) setActiveIndex(activeIndex - 1)
	}

	const fetchVideos = async (start: number, count: number) => {
		dispatch(setLoading(true))

		try {
			const videos = await api.getVideos({ start: start, count })

			const videoObjects = videos.map((name) => ({
				id: name, // Используем имя файла как уникальный идентификатор
				title: name, // заголовок
				url: `http://localhost:3010/video/${name}`, // Формируем правильный URL
			}))

			dispatch(addVideos(videoObjects)) // Добавляем полученные видео в состояние
		} catch (error) {
			console.error("Error:", error)
		} finally {
			dispatch(setLoading(false))
		}
	}

	const onVideoClick = (index: number) => {
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

	if (loading) {
		return <div>Loading...</div>
	}

	videoRefs.current = []

	return (
		<div>
			{videos.map((video, i) => (
				<VideoContainer onClick={() => onVideoClick(i)} key={video.id}>
					<video
						loop
						preload="auto"
						ref={(el) => {
							if (el) videoRefs.current.push(el)
						}}
					>
						<source src={video.url} id={video.id} type="video/mp4" />
					</video>
				</VideoContainer>
			))}
		</div>
	)
}

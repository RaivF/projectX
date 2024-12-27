import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetVideos } from "../../redux/videoSlice"
import { VideoContainer } from "./videoFeed.styles"
import { Store } from "../../redux/store"

import { fetchVideos, handleKeyPress, onVideoClick } from "../../components/utils"

export const VideoFeed = () => {
	const dispatch = useDispatch()
	const { videos, loading } = useSelector((state: Store) => state.video)
	const [isPaused, setIsPaused] = useState(false)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const endIndexVideo = videos.length - 2

	useEffect(() => {
		fetchVideos(0, 10, dispatch)

		return () => {
			dispatch(resetVideos())
		}
	}, [])

	useEffect(() => {
		if (activeIndex === null) return
		const video = videoRefs.current[activeIndex]
		if (!video) return

		video.scrollIntoView({ behavior: "smooth", block: "center" })

		let playPromise = video.play()

		playPromise.catch((e) => {
			console.log(e)
		})
	}, [activeIndex, videos])

	useEffect(() => {
		if (!videos.length) return

		document.addEventListener("keydown", (e) => handleKeyPress(e, setIsPaused, activeIndex, setActiveIndex, videos, videoRefs))

		return () => {
			document.removeEventListener("keydown", (e) => handleKeyPress(e, setIsPaused, activeIndex, setActiveIndex, videos, videoRefs))
		}
	}, [activeIndex, videos])

	useEffect(() => {
		if (!videos) return
		if (!activeIndex) return

		if (activeIndex >= endIndexVideo) {
			fetchNextPack()
		}
	}, [activeIndex])

	const fetchNextPack = () => {
		if (!activeIndex) return

		// это реализация динамической прогрузки, но при малом количестве видео она не нужна
		if (activeIndex >= endIndexVideo) {
			const VIDEOS_COUNT = 10
			fetchVideos(videos.length + 1, VIDEOS_COUNT, dispatch)
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	videoRefs.current = []

	return (
		<div>
			{videos.map((video, i) => (
				<VideoContainer onClick={() => onVideoClick(i, videoRefs, activeIndex, isPaused, setIsPaused, setActiveIndex)} key={video.id}>
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

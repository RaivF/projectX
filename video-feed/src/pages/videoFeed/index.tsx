import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetVideos } from "../../redux/videoSlice"
import { MainVideoContainer, VideoContainer } from "./videoFeed.styles"
import { Store } from "../../redux/store"
import { initialThemeType } from "../../types/types"
import { fetchVideos, handleKeyPress, onVideoClick } from "../../utils/utils"
import { Loading } from "../../components/loading"

export const VideoFeed = () => {
	const dispatch = useDispatch()
	const { videos, loading } = useSelector((state: Store) => state.video)
	const [isPaused, setIsPaused] = useState(false)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const endIndexVideo = videos.length - 2
	const theme = useSelector((state: any) => state.theme.theme)

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

		// это реализация динамической прогрузки
		if (activeIndex >= endIndexVideo) {
			const VIDEOS_COUNT = 10
			fetchVideos(videos.length + 1, VIDEOS_COUNT, dispatch)
		}
	}

	if (loading) {
		return <Loading />
	}

	videoRefs.current = []

	return (
		<MainVideoContainer theme={theme}>
			{videos.map((video, i) => (
				<VideoContainer
					theme={theme}
					onClick={() => onVideoClick(i, videoRefs, activeIndex, isPaused, setIsPaused, setActiveIndex)}
					key={video.id}
				>
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
		</MainVideoContainer>
	)
}

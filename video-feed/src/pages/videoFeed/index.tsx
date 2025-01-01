import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetVideos } from "../../redux/videoSlice"
import { MainVideoContainer, VideoContainer } from "./videoFeed.styles"
import { Store } from "../../redux/store"
import { initialThemeType } from "../../types/types"
import { fetchVideos, handleKeyPress, onVideoClick } from "../../utils/utils"
import { Loading } from "../../components/loading"
import { VideoCard } from "../../components/video-card"

export const VideoFeed = () => {
	const dispatch = useDispatch()
	const { videos, loading } = useSelector((state: Store) => state.video)
	const [isPaused, setIsPaused] = useState(false)
	const [activeIndex, setActiveIndex] = useState<number | null>(0)
	const videoRefs = useRef<HTMLVideoElement[]>([])
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
					<VideoCard videoRefs={videoRefs} video={video}></VideoCard>
				</VideoContainer>
			))}
		</MainVideoContainer>
	)
}

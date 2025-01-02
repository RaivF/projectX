import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetVideos } from "../../redux/videoSlice"
import { MainVideoContainer, VideoContainer } from "./videoFeed.styles"
import { Store } from "../../redux/store"
import { fetchVideos, handleKeyPress, onVideoClick } from "../../utils/utils"
import { Loading } from "../../components/loading"

export const VideoFeed = () => {
	const dispatch = useDispatch()
	const { videos, loading } = useSelector((state: Store) => state.video)
	const [isPaused, setIsPaused] = useState(false)

	const videoRefs = useRef<HTMLVideoElement[]>([])

	let activeIndexRef = useRef(-1)

	const theme = useSelector((state: any) => state.theme.theme)
	console.log("render")

	useEffect(() => {
		const keyPressHandler = (e: KeyboardEvent) => handleKeyPress(e, setIsPaused, activeIndexRef, videos, videoRefs)
		document.addEventListener("keydown", keyPressHandler)
		fetchVideos(0, 10, dispatch)

		return () => {
			document.removeEventListener("keydown", keyPressHandler)
		}
	}, [])

	if (loading) {
		return <Loading />
	}

	return (
		<MainVideoContainer theme={theme}>
			{videos.map((video, i) => (
				<VideoContainer theme={theme} onClick={() => onVideoClick(i, videoRefs, activeIndexRef, isPaused, setIsPaused)} key={video.id}>
					<video
						loop
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

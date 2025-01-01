import { VideoCardContainer } from "./video-card.style"
export const VideoCard = ({ videoRefs, video }: any) => {
	return (
		<VideoCardContainer
			loop
			preload="auto"
			ref={(el) => {
				if (el) videoRefs.current.push(el)
			}}
		>
			<source src={video.url} id={video.id} type="video/mp4" />
		</VideoCardContainer>
	)
}

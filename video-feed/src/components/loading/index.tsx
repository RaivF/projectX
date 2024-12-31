import logoLoading from "../../assets/loading.gif"
import { LoadingImgContainer } from "./loading.style"
export const Loading = () => {
	return (
		<LoadingImgContainer>
			<img src={logoLoading} alt="" />
		</LoadingImgContainer>
	)
}

import styled from "styled-components"
export const MainVideoContainer = styled.div<{ theme: string }>`
	background: ${(p) => (p.theme === "LIGHT" ? "#fce4da" : "black")};
`

export const VideoContainer = styled.div<{ theme: string }>`
	width: 700px;
	height: 500px;
	margin: 0 auto;
	margin-bottom: 50px;
	background: ${(p) => (p.theme === "LIGHT" ? " #ffcdb8" : "black")};
	box-shadow: 6px 5px 6px 6px ${(p) => (p.theme === "LIGHT" ? "#b7b7b7" : "black")};
	border: 1px solid gray;
	border-radius: 10px;
	transition-duration: 0.2s;
	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;

	video {
		width: 100%;
		max-height: 480px;
	}

	&:hover {
		box-shadow: 6px 5px 6px 6px #1f1d1d;
	}
`

export const VideoTitle = styled.h3`
	font-size: 18px;
	margin-bottom: 10px;
	color: white;
`

export const BlurOnPaused = styled.div`
	width: 100%;
	height: 100%;
	background-color: rgb(0 0 0 / 50%);
	z-index: 2;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const Logout = styled.button`
	z-index: 2;
	position: absolute;
	background-color: #e91e63;
	top: 0;
	right: 0;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	outline: 0;
	border: 0;
	text-transform: uppercase;

	cursor: pointer;
	box-shadow: 0px 2px 2px lightgray;
	transition: ease background-color 250ms;
	&:hover {
		background-color: #ad1457;
	}
`

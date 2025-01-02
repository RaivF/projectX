import styled from "styled-components"

export const Logout = styled.button`
	background-color: #ffcdb8;
	top: 0;
	right: 0;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	margin-right: 5px;
	outline: 0;
	border: 0;
	text-transform: uppercase;
	cursor: pointer;
	transition: ease background-color 250ms;
	&:hover {
		background-color: #ff996d;
	}
`

export const ButtonChangeTheme = styled.button`
	background-color: #a53100;
	top: 0;
	right: 0;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	margin-left: 5px;
	outline: 0;
	border: 0;
	text-transform: uppercase;
	cursor: pointer;
	transition: ease background-color 250ms;
	&:hover {
		background-color: #ff996d;
	}
`
export const StyledHeader = styled.div<{ theme: string }>`
	background: ${(p) => (p.theme === "LIGHT" ? "#fce4da" : "black")};
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

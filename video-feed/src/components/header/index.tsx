import styled from "styled-components"

export const Logout = styled.button`
	background-color: lightgray;
	top: 0;
	right: 0;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	outline: 0;
	border: 0;
	text-transform: uppercase;
	cursor: pointer;
	transition: ease background-color 250ms;
	&:hover {
		background-color: #ad1457;
	}
`
export const StyledHeader = styled.div`
	background-color: gray;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

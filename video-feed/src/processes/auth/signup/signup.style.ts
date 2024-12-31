import styled from "styled-components"

export const SignupForm = styled.div`
	width: 400px;
	max-width: 100%;
	margin: 50px auto;
	background-color: lightblue;
	border-radius: 10px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	font-family: "Poppins", sans-serif;
`

export const Title = styled.h1`
	text-align: center;
	margin: 0;
	padding: 20px 0;
	font-size: 28px;
	font-weight: bold;
	color: white;
`

export const Form = styled.form`
	padding: 20px;
	background-color: white;
	border-radius: 10px;
	font-family: "Poppins", sans-serif;
`

export const Label = styled.label`
	display: block;
	margin-bottom: 8px;
	font-size: 14px;
	color: gray;
	font-family: "Poppins", sans-serif;
`

export const Input = styled.input`
	width: 100%;
	padding: 12px;
	border: 1px solid lightgray;
	border-radius: 5px;
	font-size: 16px;
	box-sizing: border-box;
	margin-bottom: 20px;
	cursor: pointer;
	&:focus {
		outline: none;
		border-color: dodgerblue;
	}
`

export const Button = styled.button<{ disabled: boolean }>`
	width: 100%;
	padding: 12px;
	border: 1px solid lightgray;
	border-radius: 5px;
	font-size: 16px;
	box-sizing: border-box;
	margin-bottom: 20px;
	${(props) => !props.disabled && "cursor: pointer;"}
	&:focus {
		outline: none;
		border-color: dodgerblue;
	}
`

export const SubmitButton = styled.div`
	width: 100%;
	padding: 12px;
	background-color: dodgerblue;
	border: none;
	color: white;
	font-size: 16px;
	font-weight: bold;
	border-radius: 5px;
	cursor: pointer;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s ease;
	display: flex;
	justify-content: center;
	&:hover {
		background-color: deepskyblue;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	}
`

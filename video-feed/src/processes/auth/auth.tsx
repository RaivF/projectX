import { useNavigate } from "react-router-dom"
import { useState, MouseEvent, SetStateAction } from "react"
import { useDispatch } from "react-redux"

import {  MainContainer, Title, Form, Label, Input, Button, SubmitButton } from "./auth.style"
import { api } from "../../api-provider/api"
import { setUserLogin } from "../../redux/sessionSlice"

export const Auth = () => {
	const [isSignIn, setIsSignIn] = useState(true) // Управляет отображением формы
	const [error, setError] = useState("")
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")

	const nav = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (isSignIn) {
			if (!login || !password) return

			try {
				const tokens = await api.login(login, password)
				dispatch(setUserLogin(tokens.token))
				nav("/")
			} catch (e) {
				setError((e as Error).message || "Произошла ошибка")
			}
		} else {
			if (!login || !password || !password2 || password !== password2) return

			try {
				const tokens = await api.register(login, password)
				dispatch(setUserLogin(tokens.token))
				nav("/")
			} catch (e) {
				setError((e as Error).message || "Произошла ошибка")
			}
		}
	}

	return (
		<MainContainer>
			<Title>{isSignIn ? "Вход" : "Регистрация"}</Title>
			<Form>
				<Label htmlFor="username">Имя пользователя:</Label>
				<Input
					type="text"
					id="username"
					name="username"
					value={login}
					onChange={(e: { target: { value: SetStateAction<string> } }) => setLogin(e.target.value)}
				/>
				<Label htmlFor="password">Пароль:</Label>
				<Input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword(e.target.value)}
				/>
				{!isSignIn && (
					<>
						<Label htmlFor="password2">Повторите пароль:</Label>
						<Input
							type="password"
							id="password2"
							name="password2"
							value={password2}
							onChange={(e: { target: { value: SetStateAction<string> } }) => setPassword2(e.target.value)}
						/>
					</>
				)}
				<Button onClick={handleSubmit} disabled={!login || !password || (!isSignIn && password !== password2)}>
					{isSignIn ? "Войти" : "Зарегистрироваться"}
				</Button>
			</Form>
			<SubmitButton onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "Зарегистрироваться" : "Уже есть аккаунт?"}</SubmitButton>
			{error && <div>{error}</div>}
		</MainContainer>
	)
}

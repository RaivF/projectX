import { useNavigate } from "react-router-dom"
import { api } from "../../../../api-provider/api"
import { MouseEvent, useState } from "react"
import { LoginForm, Title, Form, Label, Input, SubmitButton } from "./signin.styles"
import { useDispatch } from "react-redux"
import { setUserLogin } from "../../../../redux/sessionSlice"
import { Button } from "../signup/signup.style"

export const SignIn = () => {
	const [error, setError] = useState("")
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const nav = useNavigate()
	const dispatch = useDispatch()
	const disabled = !login || !password

	const tryToLogin = async (e: MouseEvent<HTMLButtonElement>) => {
		if (disabled) return

		e.preventDefault()

		try {
			const tokens = await api.login(login, password)

			dispatch(setUserLogin(tokens.token))

			nav("/")
		} catch (e) {
			setError((e as Error).message || "Произошла ошибка")
		}
	}

	return (
		<LoginForm>
			<Title>Вход</Title>
			<Form>
				<Label htmlFor="username">Имя пользователя:</Label>
				<Input type="text" id="username" name="username" value={login} onChange={(e) => setLogin(e.target.value)} />
				<Label htmlFor="password">Пароль:</Label>
				<Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<Button type="submit" onClick={(e) => tryToLogin(e)} disabled={disabled}>
					Войти
				</Button>
			</Form>
			<SubmitButton onClick={() => nav("/signup")}>Зарегистрироваться</SubmitButton>
			{error && <div>{error}</div>}
		</LoginForm>
	)
}

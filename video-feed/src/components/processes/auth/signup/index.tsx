import { useNavigate } from "react-router-dom"
import { api } from "../../../../api-provider/api"
import { MouseEvent, useState } from "react"
import { SignupForm, Title, Form, Label, Button, SubmitButton, Input } from "./signup.style"
import { setUserLogin } from "../../../../redux/sessionSlice"
import { useDispatch } from "react-redux"

export const SignUp = () => {
	const [error, setError] = useState("")
	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")
	const [password2, setPassword2] = useState("")
	const nav = useNavigate()
	const dispatch = useDispatch()

	const tryToRegister = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (disabled) return

		try {
			const tokens = await api.register(login, password)

			dispatch(setUserLogin(tokens.token))
			nav("/")
		} catch (e) {
			setError((e as Error).message || "Произошла ошибка")
		}
	}

	const disabled = !login || !password || !password2 || password !== password2

	return (
		<SignupForm>
			<Title>Регистрация</Title>
			<Form>
				<Label htmlFor="username">Имя пользователя:</Label>
				<Input type="text" id="username" name="username" value={login} onChange={(e) => setLogin(e.target.value)} />
				<Label htmlFor="password">Пароль:</Label>
				<Input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<Label htmlFor="password">Повторите пароль:</Label>
				<Input type="password" id="password" name="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
				<Button type="submit" disabled={disabled} onClick={(e) => tryToRegister(e)}>
					Зарегистрироваться
				</Button>
			</Form>
			<SubmitButton onClick={() => nav("/signin")}>уже есть аккаунт?</SubmitButton>
			{error && <div>{error}</div>}
		</SignupForm>
	)
}

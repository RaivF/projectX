import { useDispatch, useSelector } from "react-redux"
import { Store } from "../../redux/store"
import { setUserLogout } from "../../redux/sessionSlice"
import { Logout, StyledHeader } from "./header.style"
import { useNavigate } from "react-router-dom"
import { setTheme } from "../../redux/themeSlice"

export const Header = () => {
	const nav = useNavigate()
	const dispatch = useDispatch()
	const { token } = useSelector((state: Store) => state.session)
	const theme = useSelector((state: any) => state.theme.theme)
	const changeThemeHandler = () => {
		dispatch(setTheme())
	}

	return (
		<StyledHeader theme={theme}>
			<button onClick={changeThemeHandler}>смена темы</button>
			<Logout onClick={() => dispatch(setUserLogout(), nav("/signin"))}>выход</Logout>
		</StyledHeader>
	)
}

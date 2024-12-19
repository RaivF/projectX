import { useDispatch, useSelector } from "react-redux"
import { Store } from "../../redux/store"
import { setUserLogout } from "../../redux/sessionSlice"
import { Logout, StyledHeader } from "."
import { useNavigate } from "react-router-dom"

export const Header = () => {
	const nav = useNavigate()
	const dispatch = useDispatch()
	const { token } = useSelector((state: Store) => state.session)
	return <StyledHeader> {token && <Logout onClick={() => dispatch(setUserLogout(), nav("/signin"))}>выход</Logout>}</StyledHeader>
}

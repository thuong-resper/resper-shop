import { unwrapResult } from '@reduxjs/toolkit'
import { postActiveEmail } from 'features/User/pathAPI'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import SimpleBackdrop from '../../components/Backdrop/Backdrop'
import { UserContext } from 'contexts/index.js'

const tokenLocal = localStorage.getItem('token')

export default function ActiveEmail() {
	const history = useHistory()
	const dispatch = useDispatch()
	const { accessToken } = useParams()
	const state = useContext(UserContext)
	// create
	const [token, setToken] = state.token
	const [, setUser] = state.user
	const [, setIdUser] = state.idUser
	const [patchCart] = state.patchCart

	// store
	const loading = useSelector((state) => state.user.loading)

	useEffect(() => {
		async function activeEmail() {
			if (token && patchCart) {
				history.push(patchCart)
			} else if (tokenLocal || token) {
				history.push('/')
			}
			if (accessToken) {
				const actionResult = await dispatch(postActiveEmail({ accessToken: accessToken }))
				const currentUser = unwrapResult(actionResult)
				if (currentUser) {
					setToken(currentUser.token)
					setUser(currentUser.user)
					setIdUser(currentUser.user._id)
				}
			}
		}

		activeEmail() // eslint-disable-next-line
	}, [accessToken, token])

	return loading && <SimpleBackdrop />
}

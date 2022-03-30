import { unwrapResult } from '@reduxjs/toolkit'
import { getProfile } from 'features/User/pathAPI'
import { useSnackbar } from 'notistack'
import { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'

const UserContext = createContext(null)
const tokenLocal = localStorage.getItem('token')
const UserContextProvider = ({ children }) => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [token, setToken] = useState(null)
	const [user, setUser] = useState(null)
	const [socket, setSocket] = useState(null)
	const [patchCart, setPatchCart] = useState(null)
	const [idUser, setIdUser] = useState(null)
	const [countUserOnline, setCountUserOnline] = useState(null)

	useEffect(() => {
		if (socket) {
			socket.emit('countUserOnline', 8080)
		}
	}, [socket])

	useEffect(() => {
		if (socket) {
			socket.on('serverDeleteAccount', (msg) => {
				const { _id_user } = msg
				if (msg) {
					if (_id_user === idUser) {
						setToken(null)
						setUser(null)
						setIdUser(null)
						localStorage.removeItem('token')
						enqueueSnackbar('This account has been deleted', { variant: 'error' })
					}
				}
			})
			return () => socket.off('serverDeleteAccount')
		} // eslint-disable-next-line
	}, [socket, idUser])
	useEffect(() => {
		if (socket) {
			socket.on('severCountUserOnline', (msg) => {
				setCountUserOnline(msg)
			})
			return () => socket.off('severCountUserOnline')
		}
	}, [socket])

	useEffect(() => {
		async function setProfile() {
			const socketIo = io(
				// development
				process.env.REACT_APP_API_DEV,
				// production
				// process.env.REACT_APP_API_URL,
				{
					withCredentials: true,
					extraHeaders: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Header':
							'Origin, X-Requested-With, Content-Type, Accept, Authorization',
						'Access-Control-Allow-Methods': 'PUT, POST, DELETE, GET',
					},
				}
			)
			if (socketIo) {
				setSocket(socketIo)
			}
			if (tokenLocal) {
				try {
					const actionResult = await dispatch(getProfile())
					const currentUser = unwrapResult(actionResult)
					if (currentUser) {
						setUser(currentUser.user)
						setToken(tokenLocal)
						setIdUser(currentUser.user._id)
					}
				} catch (e) {
					localStorage.removeItem('token')
					window.location.reload()
				}
			}
			return () => socket.close()
		}

		setProfile() // eslint-disable-next-line
	}, [])

	const state = {
		patchCart: [patchCart, setPatchCart],
		token: [token, setToken],
		user: [user, setUser],
		idUser: [idUser, setIdUser],
		socket,
		UserOnline: [countUserOnline],
	}
	return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}
export { UserContext, UserContextProvider }

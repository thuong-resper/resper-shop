import { useSnackbar } from 'notistack'
import { createContext, useEffect, useState } from 'react'
import userAPI from 'apis/userAPI'
import io from 'socket.io-client'

const UserContext = createContext(null)
const tokenLocal = localStorage.getItem('token')
const UserContextProvider = ({ children }) => {
	const { enqueueSnackbar } = useSnackbar()
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)
	const [admin, setAdmin] = useState(false)
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
		const socketIo = io(
			// development
			// process.env.REACT_APP_API_DEV,
			// production
			process.env.REACT_APP_API_URL,
			{
				withCredentials: true,
				extraHeaders: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Header': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
					'Access-Control-Allow-Methods': 'PUT, POST, DELETE, GET',
				},
			}
		)
		if (socketIo) {
			setSocket(socketIo)
		}
	}, [])

	useEffect(() => {
		async function setProfile() {
			if (tokenLocal) {
				await userAPI
					.profile()
					.then((res) => {
						setToken(tokenLocal)
						setUser(res)
						setIdUser(res._id)
						setLoading(false)
						if (res.role === 1) {
							setAdmin(true)
						}
					})
					.catch((e) => {
						setLoading(false)
						localStorage.removeItem('token')
						window.location.reload()
					})
				return () => socket.close()
			}
		}

		setProfile()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const state = {
		patchCart: [patchCart, setPatchCart],
		token: [token, setToken],
		loadingUser: [loading],
		user: [user, setUser],
		admin: [admin, setAdmin],
		idUser: [idUser, setIdUser],
		socket,
		UserOnline: [countUserOnline],
	}
	return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}
export { UserContext, UserContextProvider }

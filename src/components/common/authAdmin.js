import React, { useContext } from 'react'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { UserContext } from 'contexts'
import { Redirect } from 'react-router-dom'

export function AuthAdmin({ children }) {
	const state = useContext(UserContext)
	const [loadingUser] = state.loadingUser
	const [user] = state.user

	if (loadingUser) {
		return <SimpleBackdrop />
	}

	if (user.role === 1) {
		return <div>{children}</div>
	}

	return <Redirect to="/" />
}

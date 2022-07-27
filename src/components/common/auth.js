import React, { useContext } from 'react'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { UserContext } from 'contexts'
import { Redirect } from 'react-router-dom'

export function Auth({ children }) {
	const state = useContext(UserContext)
	const [user] = state.token
	const [loadingUser] = state.loadingUser

	if (loadingUser) {
		return <SimpleBackdrop />
	}

	if (user) {
		return <div>{children}</div>
	}

	return <Redirect to="/login" />
}

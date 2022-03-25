import React from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions.js'
import { useRouter } from '../../hooks/useRouter.js'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../../assets/images/logo.PNG'
import symbol from '../../assets/images/symbol.PNG'

const useStyles = makeStyles((theme) => ({
	logo: {
		width: 180,
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
	},
	symbol: {
		width: '3rem',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		marginRight: 8,
	},
}))

export const Logo = (props) => {
	const classes = useStyles()
	const router = useRouter()
	const { width } = useWindowDimensions()
	return (
		<>
			{width > 500 ? (
				<div className={classes.logo} onClick={(e) => router.push('/')}>
					<img src={logo} alt="logo" />
				</div>
			) : (
				<div className={classes.symbol} onClick={(e) => router.push('/')}>
					<img src={symbol} alt="symbol" />
				</div>
			)}
		</>
	)
}

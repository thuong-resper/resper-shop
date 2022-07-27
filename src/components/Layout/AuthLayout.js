import * as React from 'react'
import { Auth } from 'components/common'
import Header from 'components/Header/Header'
import MainMenu from 'components/Navigation/MainMenu/MainMenu'
import { Box, Container, makeStyles } from '@material-ui/core'
import Footer from 'components/Footer/Footer'

const useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.down('sm')]: {
			padding: '0 !important',
		},
	},
}))

export function AuthLayout({ children }) {
	const classes = useStyles()

	return (
		<Auth>
			<Box minHeight={'100vh'} display={'flex'} flexDirection={'column'}>
				<Header />
				<MainMenu />
				<Box component="main" flexGrow={1}>
					<Container className={classes.container}>{children}</Container>
				</Box>
				<Footer />
			</Box>
		</Auth>
	)
}

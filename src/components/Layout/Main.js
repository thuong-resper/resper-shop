import { Box, Container, makeStyles } from '@material-ui/core'
import Footer from 'components/Footer/Footer.js'
import MainMenu from 'components/Navigation/MainMenu/MainMenu.js'
import React from 'react'
import Header from 'components/Header/Header.js'

const useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.down('sm')]: {
			padding: '0 !important',
		},
	},
}))

export function MainLayout({ children }) {
	const classes = useStyles()
	return (
		<Box minHeight={'100vh'} display={'flex'} flexDirection={'column'}>
			<Header />
			<MainMenu />
			<Box component="main" flexGrow={1}>
				<Container className={classes.container}>{children}</Container>
			</Box>
			<Footer />
		</Box>
	)
}

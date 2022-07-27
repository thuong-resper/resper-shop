import { Box, Container, makeStyles } from '@material-ui/core'
import Footer from 'components/Footer/Footer.js'
import React from 'react'
import { Logo } from 'components/Header/Logo.js'

const useStyles = makeStyles((theme) => ({
	logo: {
		padding: '12px 0',
		[theme.breakpoints.down('sm')]: {
			padding: '12px 24px',
		},
	},
	container: {
		[theme.breakpoints.down('sm')]: {
			padding: '0 !important',
		},
	},
}))

export function SubLayout({ children }) {
	const classes = useStyles()
	return (
		<Box minHeight={'100vh'} display={'flex'} flexDirection={'column'}>
			<Container className={classes.container}>
				<Box className={classes.logo}>
					<Logo />
				</Box>
			</Container>
			<Box component="main" flexGrow={1}>
				<Container className={classes.container}>{children}</Container>
			</Box>
			<Footer />
		</Box>
	)
}

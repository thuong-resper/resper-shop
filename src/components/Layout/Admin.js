import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar.js'

const useStyles = makeStyles((theme) => ({
	sideBar: {
		width: 280,
	},
	children: {
		width: 'calc(100% - 281px)',
	},
}))

export function AdminLayout({ children }) {
	const classes = useStyles()
	return (
		<Box minHeight={'100vh'} display="flex">
			<Box className={classes.sideBar}>
				<AdminSidebar />
			</Box>
			<Box className={classes.children}>{children}</Box>
		</Box>
	)
}

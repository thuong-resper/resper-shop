import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar'
import { AuthAdmin } from 'components/common'

const useStyles = makeStyles((theme) => ({
	admin: {
		minHeight: '100vh',
		display: 'flex',
		[theme.breakpoints.down('sm')]: { display: 'block' },
	},
	sideBar: {
		width: 280,
		[theme.breakpoints.down('sm')]: { width: '100%' },
	},
	children: {
		width: 'calc(100% - 281px)',
		[theme.breakpoints.down('sm')]: { width: '100%' },
	},
}))

export function AdminLayout({ children }) {
	const classes = useStyles()
	return (
		<AuthAdmin>
			<Box className={classes.admin}>
				<Box className={classes.sideBar}>
					<AdminSidebar />
				</Box>
				<Box className={classes.children}>{children}</Box>
			</Box>
		</AuthAdmin>
	)
}

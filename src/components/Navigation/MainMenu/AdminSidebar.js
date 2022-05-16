import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
import { AdminSidebarItems } from './MainMenuData'
import NavSection from 'components/Navigation/MainMenu/NavSection.js'

const useStyles = makeStyles((theme) => ({
	menu: {
		borderRight: '1px solid #e6e6e6',
		position: 'fixed',
		top: 0,
		left: 0,
		overflow: 'auto',
	},
}))

const AdminSidebar = () => {
	const classes = useStyles()
	return (
		<Box className={classes.menu}>
			<div>user</div>
			<NavSection nav={AdminSidebarItems} />
		</Box>
	)
}

export default AdminSidebar

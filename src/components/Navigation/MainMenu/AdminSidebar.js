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
	menuList: {
		padding: 8,
	},
	listItem: {
		height: 48,
		position: 'relative',
		textTransform: 'capitalize',
		color: '#637381',
		borderRadius: 8,
	},
	activeRootStyle: {
		color: '#2065d1',
		fontWeight: 'bold',
		backgroundColor: '#2065d114',
		'&:hover': { color: '#2065d1' },
	},

	listItemIcon: {
		width: 22,
		height: 22,
		color: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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

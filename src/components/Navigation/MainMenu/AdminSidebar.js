import { Box, IconButton, makeStyles, SwipeableDrawer } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'
import React from 'react'
import { AdminSidebarItems } from './MainMenuData'
import NavSection from 'components/Navigation/MainMenu/NavSection.js'
import clsx from 'clsx'
import useWindowDimensions from 'hooks/useWindowDimensions'

const useStyles = makeStyles((theme) => ({
	menu: {
		borderRight: '1px solid #e6e6e6',
		position: 'fixed',
		top: 0,
		left: 0,
		overflow: 'auto',
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
}))

const AdminSidebar = () => {
	const classes = useStyles()
	const { width } = useWindowDimensions()
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<NavSection nav={AdminSidebarItems} />
		</div>
	)

	return (
		<Box>
			{width > 600 ? (
				<Box className={classes.menu}>
					<div>user</div>
					<NavSection nav={AdminSidebarItems} />
				</Box>
			) : (
				<Box>
					<IconButton aria-label="admin-menu" onClick={toggleDrawer('left', true)}>
						<ListIcon />
					</IconButton>
					<SwipeableDrawer
						anchor={'left'}
						open={state['left']}
						onClose={toggleDrawer('left', false)}
						onOpen={toggleDrawer('left', true)}
					>
						{list('left')}
					</SwipeableDrawer>
				</Box>
			)}
		</Box>
	)
}

export default AdminSidebar

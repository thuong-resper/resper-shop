import { Avatar, Box, IconButton, makeStyles, SwipeableDrawer, Typography } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'
import React, { useContext } from 'react'
import { AdminSidebarItems } from './MainMenuData'
import clsx from 'clsx'
import { UserContext } from 'contexts'
import { Logo } from 'components/Header/Logo'
import { useWindowDimensions } from 'hooks'
import NavSection from 'components/Navigation/MainMenu/NavSection'

const useStyles = makeStyles((theme) => ({
	menu: {
		borderRight: '1px solid #e6e6e6',
		position: 'fixed',
		top: 0,
		left: 0,
		overflow: 'auto',
	},

	fullList: {
		width: 'auto',
	},
}))

const AdminSidebar = () => {
	const classes = useStyles()
	const { width } = useWindowDimensions()
	const userState = useContext(UserContext)
	const [user] = userState.user
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
			className={clsx({
				[classes.fullList]: anchor === 'top' || anchor === 'bottom',
			})}
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Box>
				<Box m={2}>
					<Logo />
				</Box>
				<Box
					style={{
						display: 'flex',
						alignItems: 'center',
						padding: '8px 16px',
						margin: '16px 8px',
						borderRadius: 12,
						backgroundColor: '#919eab1f',
					}}
				>
					<Avatar
						alt={user.name}
						src={user.avatar}
						style={{
							marginRight: 16,
						}}
					/>
					<Typography variant="body1">
						<b>{user.name}</b>
					</Typography>
				</Box>
				<NavSection nav={AdminSidebarItems} />
			</Box>
		</div>
	)

	return (
		<Box>
			{width > 600 ? (
				<Box className={classes.menu}>
					<Box>
						<Box m={2}>
							<Logo />
						</Box>
						<Box
							style={{
								display: 'flex',
								alignItems: 'center',
								padding: '8px 16px',
								margin: '16px 8px',
								borderRadius: 12,
								backgroundColor: '#919eab1f',
							}}
						>
							<Avatar
								alt={user.name}
								src={user.avatar}
								style={{
									marginRight: 16,
								}}
							/>
							<Typography variant="body1">
								<b>{user.name}</b>
							</Typography>
						</Box>
						<NavSection nav={AdminSidebarItems} />
					</Box>
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

import { Box, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	menuList: {
		padding: 8,
		height: '100vh',
		width: 280,
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

function NavItem({ item }) {
	const classes = useStyles()
	const { title, path, icon, info } = item

	return (
		<ListItem
			button
			disableGutters
			component={RouterLink}
			to={path}
			className={classes.listItem}
			activeClassName={classes.activeRootStyle}
		>
			<ListItemIcon className={classes.listItemIcon}>{icon && icon}</ListItemIcon>
			<ListItemText disableTypography primary={title} />
			{info && info}
		</ListItem>
	)
}

const NavSection = ({ nav }) => {
	const classes = useStyles()
	return (
		<Box>
			<List disablePadding className={classes.menuList}>
				{nav.map((item) => (
					<NavItem key={item.title} item={item} />
				))}
			</List>
		</Box>
	)
}

export default NavSection

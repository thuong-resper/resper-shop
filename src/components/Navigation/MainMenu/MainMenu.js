import { makeStyles } from '@material-ui/core'
import React from 'react'
import { mainMenuItems } from './MainMenuData'
import NavigationItem from 'components/Navigation/NavigationItem/NavigationItem.js'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	menu: {
		marginBottom: '0.5rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#bbdefb',
		position: 'relative',
		[theme.breakpoints.down('sm')]: {
			fontSize: '12px',
			textAlign: 'center',
		},
	},
	menuItems: {
		color: '#000',
		lineHeight: '16px',
		display: 'flex',
		padding: '0 9px',
		height: '43px',
		alignItems: 'center',
		position: 'relative',
		cursor: 'pointer',
		margin: '0 1px',
		'&:hover': { backgroundColor: '#ffff' },
		'&#active': {
			backgroundColor: '#ffff',
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '5rem',
		},
	},
	itemIcon: {
		padding: '0 10px',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
}))

const MainMenu = () => {
	const classes = useStyles()
	return (
		<div className={classes.menu}>
			{mainMenuItems.map((item, index) => (
				<NavigationItem key={index} item={item} />
			))}
		</div>
	)
}

export default withRouter(MainMenu)

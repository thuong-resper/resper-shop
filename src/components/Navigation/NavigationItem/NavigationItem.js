import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Iconify from 'components/Iconify'

const useStyles = makeStyles((theme) => ({
	menuItem: {
		color: '#000',
		display: 'flex',
		padding: '0 9px',
		height: '43px',
		alignItems: 'center',
		position: 'relative',
		cursor: 'pointer',
		margin: '0 1px',
		'&:hover': { backgroundColor: '#ffff' },

		[theme.breakpoints.down('sm')]: {
			maxWidth: '5rem',
		},
	},
	active: {
		height: 'inherit',
		backgroundColor: '#ffff',
	},
	itemIcon: {
		padding: '0 10px',
		lineHeight: 'initial',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
}))

const NavigationItem = ({ item }) => {
	const classes = useStyles()
	return (
		<NavLink to={item.link} className={classes.menuItem} activeClassName={classes.active}>
			<div className={classes.itemIcon}>
				<Iconify icon={item.icon} width="1.5em" height="1.5em" />
			</div>
			<div>{item.title}</div>
		</NavLink>
	)
}

export default NavigationItem

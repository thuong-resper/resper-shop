import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Icon } from '@iconify/react'

const useStyles = makeStyles((theme) => ({
	filter: {
		padding: '4px 0',
		display: 'inline-flex',
		// [theme.breakpoints.down('sm')]: {
		// 	marginLeft: '0.5rem',
		// },
	},
	filter_icon: {
		paddingRight: '4px',
		display: 'inline-flex',
		alignItems: 'center',
	},
	filter_title: {
		fontSize: 16,
		fontWeight: 500,
	},
}))

export function FilterTitle({ icon, title }) {
	const classes = useStyles()
	return (
		<div className={classes.filter}>
			<div className={classes.filter_icon}>
				<Icon icon={icon} width="1.2em" height="1.2em" />
			</div>
			<h4 className={classes.filter_title}>{title}</h4>
		</div>
	)
}

import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React from 'react'

export const AntTabs = withStyles({
	indicator: {
		display: 'none',
	},
})((props) => <Tabs {...props} />)

export const AntTab = withStyles((theme) => ({
	root: {
		border: '1px solid',
		borderRadius: '20px',
		textTransform: 'none',
		color: '#333',
		whiteSpace: 'nowrap',
		minWidth: 72,
		margin: '0.5rem 0.25rem',
		minHeight: 'auto',
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover': {
			color: '#333',
			opacity: 1,
		},
		'&$selected': {
			background: '#fff',
			fontWeight: 'bold',
			color: '#000 !important',
			boxShadow: '0 4px 4px rgb(0 0 0 / 25%)',
			border: 'none',
		},
		'&:focus': {
			color: '#000',
		},
	},
	selected: {},
}))((props) => <Tab {...props} />)

export const AntTabBlack = withStyles((theme) => ({
	root: {
		border: '1px solid',
		borderRadius: '20px',
		textTransform: 'none',
		color: '#fff',
		whiteSpace: 'nowrap',
		minWidth: 72,
		margin: '0.5rem 0.25rem',
		minHeight: 'auto',
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover': {
			color: '#fff',
			opacity: 1,
		},
		'&$selected': {
			background: '#fff',
			fontWeight: 'bold',
			color: '#000 !important',
			boxShadow: '0 4px 4px rgb(0 0 0 / 25%)',
			border: 'none',
		},
		'&:focus': {
			color: '#fff',
		},
	},
	selected: {},
}))((props) => <Tab {...props} />)

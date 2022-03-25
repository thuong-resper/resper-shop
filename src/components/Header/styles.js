import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
	header: { width: '100%' },
	wrap: {
		width: 1280,
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: 'auto',
		},
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
	},
	grow: {
		flexGrow: 1,
	},
}))

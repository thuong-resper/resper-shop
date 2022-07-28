import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Iconify from 'components/Iconify'
import { fShortenNumber } from 'utils/formatNumber'

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none',
		textAlign: 'center',
		padding: theme.spacing(5, 0),
		color: '#7a4f01',
		backgroundColor: '#fff7cd',
		borderRadius: '1rem',
	},
	iconWrapper: {
		margin: 'auto',
		display: 'flex',
		alignItems: 'center',
		width: theme.spacing(8),
		height: theme.spacing(8),
		justifyContent: 'center',
		marginBottom: theme.spacing(3),
		color: theme.palette.primary.dark,
	},
	icon: {
		margin: 'auto auto 24px',
		display: 'flex',
		borderRadius: '50%',
		WebkitBoxAlign: 'center',
		alignItems: 'center',
		width: '64px',
		height: '64px',
		WebkitBoxPack: 'center',
		justifyContent: 'center',
		color: '#b78103',
		backgroundImage:
			'linear-gradient( 135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)',
	},
}))

// ----------------------------------------------------------------------

const TOTAL = 1721230

export default function AppItemOrders() {
	const classes = useStyles()
	return (
		<Card className={classes.root}>
			<div className={classes.iconWrapper}>
				<div className={classes.icon}>
					<Iconify icon={'icon-park-solid:transaction-order'} width="2rem" height="2rem" />
				</div>
			</div>
			<Typography variant="h4" color="inherit">
				{fShortenNumber(TOTAL)}
			</Typography>
			<Typography variant="subtitle2" color="inherit" sx={{ opacity: 0.72 }}>
				Item Orders
			</Typography>
		</Card>
	)
}

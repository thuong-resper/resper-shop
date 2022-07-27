import { Box, Button, Grid, makeStyles } from '@material-ui/core'
import CustomizedBreadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useRouter } from 'hooks'

const useStyles = makeStyles((theme) => ({
	wrapper_em: {
		borderRadius: '4px',
		margin: 0,
		padding: '1rem',
		backgroundColor: '#fff',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			bottom: 0,
			zIndex: 1,
			border: 'none',
		},
	},
}))

export function NoProductsAdded() {
	const classes = useStyles()
	const router = useRouter()

	return (
		<Grid container justify="center" alignItems="flex-start" className={classes.wrapper_em}>
			<Grid item xs={12}>
				<CustomizedBreadcrumbs step1="Trang chủ" step2="Giỏ hàng" />
			</Grid>
			<Box m="1rem auto" fontSize="5rem" textAlign="center" color="#d3d3d4">
				<ShoppingCartIcon fontSize="inherit" />
				<Typography variant="subtitle1">Không có sản phẩm nào</Typography>
				<Button variant="contained" size="large" onClick={() => router.push('/')}>
					Mua sắm
				</Button>
			</Box>
		</Grid>
	)
}

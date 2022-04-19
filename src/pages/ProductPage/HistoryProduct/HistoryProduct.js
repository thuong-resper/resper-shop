import { Grid, makeStyles, Typography } from '@material-ui/core'
import Product from 'components/Products/Product/Product'
import useWindowDimensions from 'hooks/useWindowDimensions'
import React from 'react'
import ProductsSlider from 'components/ReactSlickSlider/ProductsSlider.js'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		[theme.breakpoints.up('md')]: {
			width: '20%',
			flexBasis: '20%',
		},
	},
	titleSeeMore: {
		padding: '1rem 0',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '0.5rem',
		},
	},
	minHeight: {
		height: '25.5rem',
		[theme.breakpoints.down('md')]: {
			height: '21.5rem',
		},
	},
}))

export default function HistoryProduct({ _id, historyProduct }) {
	const { width } = useWindowDimensions()
	const classes = useStyles()

	const historyProductOld = [...historyProduct]
	historyProductOld.forEach((product, index) => {
		if (product === null || product._id === _id) {
			historyProductOld.splice(index, 1)
		}
	})
	const showListProducts = (data) => {
		if (data.length > 0) {
			return (
				<>
					{width < 600 ? (
						<Grid container justify="flex-start">
							{data.map((item, index) => (
								<Grid item xs={6} key={index} className={classes.minHeight}>
									<Product product={item} />
								</Grid>
							))}
						</Grid>
					) : (
						<div className="list-item list-top-ten">
							<ProductsSlider data={data} />
						</div>
						// <div className={classes.minHeight}>
						// 	<ProductsSlider data={data} slidesToShow={4} />
						// </div>
					)}
				</>
			)
		}
	}

	return (
		<div className="group-history-products">
			{historyProductOld.length > 0 && (
				<Typography variant="h5" className={classes.titleSeeMore} gutterBottom>
					Sản phẩm đã xem
				</Typography>
			)}
			{showListProducts(historyProductOld)}
		</div>
	)
}

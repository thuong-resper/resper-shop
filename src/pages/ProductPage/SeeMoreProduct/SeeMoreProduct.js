import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import Product from 'components/Products/Product/Product'
import SimpleBackdrop from 'components/Backdrop/Backdrop'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		[theme.breakpoints.up('md')]: {
			width: '20%',
			flexBasis: '20%',
			height: '25.5rem',
		},
		[theme.breakpoints.down('md')]: {
			height: '21.5rem',
		},
	},
	titleSeeMore: {
		padding: '1rem 0',
		[theme.breakpoints.down('sm')]: {
			marginLeft: '0.5rem',
		},
	},
}))
export default function SeeMoreProduct({ items, dataRelated, onChangePage, loading, pageUrl }) {
	const classes = useStyles()
	const { data, length } = dataRelated
	const onChangePagination = (event, page) => {
		onChangePage(page)
		document.getElementById('groupSeeMore').scrollIntoView({ behavior: 'smooth' })
	}
	const showPagination = (length) => {
		if (length > 0) {
			return (
				<Box display="flex" justifyContent="center" width="100%" m="0.5rem">
					<Pagination
						count={Math.ceil(length / items)}
						page={pageUrl + 1}
						onChange={onChangePagination}
						variant="outlined"
						shape="rounded"
					/>
				</Box>
			)
		}
	}

	const ShowSeeMore = (data) => {
		if (data.length > 0) {
			return (
				<Grid container direction="row">
					{data.map((listProduct) => (
						<Grid item xs={6} sm={4} key={listProduct._id} className={classes.wrapper}>
							<Product product={listProduct} />
						</Grid>
					))}
				</Grid>
			)
		}
	}
	return (
		<div id="groupSeeMore">
			<Typography variant="h5" className={classes.titleSeeMore} gutterBottom>
				Sản phẩm tương tự
			</Typography>
			{loading && <SimpleBackdrop />}
			{ShowSeeMore(data)}
			{showPagination(length)}
		</div>
	)
}

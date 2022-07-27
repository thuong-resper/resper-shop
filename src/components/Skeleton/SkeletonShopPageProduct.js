import { Box, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export function SkeletonShopPageProduct() {
	return (
		<div>
			<Skeleton animation="pulse" variant="rect" height={40} width="20%" />
			<Box m="1rem 0">
				<Skeleton animation="pulse" variant="rect" height={40} width="60%" />
			</Box>
			<Grid container direction="row" justify="center" alignItems="center">
				{[...Array(8)].map((item, index) => (
					<Grid item xs={6} sm={4} md={3} key={index}>
						<Box mr="0.5rem">
							<Box mb={1}>
								<Skeleton animation="pulse" variant="rect" height={250} width="100%" />
							</Box>
							<Box mb={1}>
								<Skeleton animation="pulse" variant="rect" height={15} width="70%" />
							</Box>
							<Box mb={1}>
								<Skeleton animation="pulse" variant="rect" height={15} width="50%" />
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

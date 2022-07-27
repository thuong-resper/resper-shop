import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export function SkeletonFilterItem() {
	return (
		<div>
			<Box mb={1}>
				<Skeleton animation="pulse" variant="rect" height={20} width="100%" />
			</Box>
			<Box mb={1}>
				<Skeleton animation="pulse" variant="rect" height={15} width="100%" />
			</Box>
			<Box mb={1}>
				<Skeleton animation="pulse" variant="rect" height={15} width="60%" />
			</Box>
		</div>
	)
}

import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import FormProductCreate from './ProductCreate/FormProductCreate'
import { AdminContent, AdminLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO'

const ProductCreate = () => {
	return (
		<AdminLayout>
			<SEO pageTitle={'Admin | Tạo mới sản phẩm'} />
			<AdminContent>
				<Box margin="auto" maxWidth={960}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h5" style={{ fontWeight: 'bold' }}>
								Tạo mới sản phẩm
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FormProductCreate item={null} />
						</Grid>
					</Grid>
				</Box>
			</AdminContent>
		</AdminLayout>
	)
}

export default ProductCreate

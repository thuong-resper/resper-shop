import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { AdminContent, AdminLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO'
import { useParams } from 'react-router-dom'
import { useGetProductById } from 'features/Admin/Product'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import FormProductUpdate from 'pages/AdminPage/src/pages/Product/ProductCreate/FormProductUpdate'

const UserUpdate = () => {
	const params = useParams()
	const { id } = params
	const { isLoading, data, error, refetch } = useGetProductById(id ? params.id : null)

	if (isLoading) return <SimpleBackdrop />

	if (error) return 'Error: ' + error.message

	return (
		<AdminLayout>
			<SEO pageTitle={'Admin | Chỉnh sửa sản phẩm'} />
			<AdminContent>
				<Box margin="auto" maxWidth={960}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h5" style={{ fontWeight: 'bold' }}>
								Chỉnh sửa sản phẩm
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<FormProductUpdate item={data} refetch={refetch} />
						</Grid>
					</Grid>
				</Box>
			</AdminContent>
		</AdminLayout>
	)
}

export default UserUpdate

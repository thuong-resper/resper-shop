import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Typography,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import ProductAdminItem from 'components/Products/Product/ProductAdminItem'
import { deleteProduct } from 'features/Admin/Product/pathAPI'
import { getListProducts } from 'features/Product/pathApi'
import queryString from 'query-string'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from 'contexts/index.js'
import SEO from 'components/SEO/SEO.js'
import { AdminContent, AdminLayout } from 'components/Layout/index.js'
import { usePaginatedAdminProducts } from 'features/Admin/Product/index.js'
import Iconify from 'components/Iconify.js'

const AdminProduct = ({ location }) => {
	const dispatch = useDispatch()
	const history = useHistory()

	const divRef = useRef(null)
	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth' })
	})

	const items = 20
	const page = Number(queryString.parse(location.search).page) || 1
	const params = {
		limit: items,
		page: page,
		sort: '-_id',
	}
	const { status, data, error, isFetching } = usePaginatedAdminProducts(params)

	// dispatch api
	const actionGetAllProducts = (param) => dispatch(getListProducts(param))
	const actionDeleteProduct = (id) => dispatch(deleteProduct(id))

	const state = useContext(UserContext)
	const [token] = state.token

	const [product, setProduct] = useState('')
	const [openDelete, setOpenDelete] = useState(false)

	const onChangePagination = (event, page) => {
		const data = {
			page: page,
			limit: items,
			sort: '-_id',
		}
		const params = queryString.stringify(data)
		const url = `/admin/product?${params}`
		history.push(url)
	}

	const showPagination = (length) => {
		if (length > 0) {
			return (
				<Box display="flex" justifyContent="center" width="100%" m="0.5rem">
					<Pagination
						count={Math.ceil(data.length / items)}
						page={page}
						variant="outlined"
						shape="rounded"
						onChange={onChangePagination}
					/>
				</Box>
			)
		}
	}

	const handleClickDeleteOpen = (product) => {
		setOpenDelete(true)
		setProduct(product)
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleRemove = async () => {
		await actionDeleteProduct(product._id, token)
		handleCloseDelete()
		const param = {
			limit: items,
			page: 1,
			sort: '-_id',
		}
		actionGetAllProducts(param)
	}

	return (
		<AdminLayout>
			<AdminContent>
				<div ref={divRef} />
				{status === 'loading' ? (
					<SimpleBackdrop />
				) : (
					<>
						{status === 'error' ? (
							<span>Error: {error.message}</span>
						) : (
							<>
								<SEO pageTitle={'Admin | Sản phẩm'} />
								<Box mb={4} display="flex" justifyContent="space-between">
									<Typography variant="h6">Sản phẩm&nbsp;({data.length})</Typography>
									<Link to="/admin/product/create">
										<Button
											variant="contained"
											color="primary"
											startIcon={
												<Iconify icon="carbon:add" width="1.5em" height="1.5em" color="#fff" />
											}
										>
											Thêm sản phẩm
										</Button>
									</Link>
								</Box>
								<Grid container spacing={2} justify="center">
									{data.data.map((item, index) => (
										<Grid item key={index}>
											<ProductAdminItem
												product={item}
												loading={status === 'loading'}
												handleClickDeleteOpen={handleClickDeleteOpen}
											/>
										</Grid>
									))}
								</Grid>
								{/* Box delete */}
								<Box>
									<Dialog
										open={openDelete}
										onClose={handleCloseDelete}
										aria-labelledby="alert-dialog-title"
										aria-describedby="alert-dialog-description"
									>
										<DialogTitle id="alert-dialog-title">Xóa sản phẩm</DialogTitle>
										<DialogContent>
											<DialogContentText id="alert-dialog-description">
												{`Bạn có chắc chắn xóa sản phẩm ${product.name}? `}
											</DialogContentText>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleCloseDelete} color="primary">
												Đóng
											</Button>
											<Button onClick={handleRemove} color="primary" autoFocus>
												Xác nhận
											</Button>
										</DialogActions>
									</Dialog>
								</Box>
								{showPagination(data.length)}
							</>
						)}
					</>
				)}
				{isFetching ? <span> Loading...</span> : null}
			</AdminContent>
		</AdminLayout>
	)
}

export default AdminProduct

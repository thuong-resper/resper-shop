import { Box, Button, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from 'components/SEO/SEO.js'
import { AdminContent, AdminLayout } from 'components/Layout/index.js'
import { useDeleteProduct, useGetProducts } from 'features/Admin/Product/index.js'
import Iconify from 'components/Iconify.js'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { escapeRegExp } from 'utils/regex'
import SearchBar from 'components/Search/SearchBar'
import { DataGrid } from '@material-ui/data-grid'
import { fVNDCurrency } from 'utils/formatNumber'
import { Skeleton } from '@material-ui/lab'
import DialogOption from 'pages/AdminPage/src/components/Dialog/DialogOption'
import { useSnackbar } from 'notistack'

function RowIdCell(props) {
	return (
		<Link style={{ color: '#007ff0', cursor: 'pointer' }} to={`/product/${props.row._id}`}>
			{props.row._id}
		</Link>
	)
}

function RowPriceCompareCell(props) {
	return (
		<Box>
			<span>{fVNDCurrency(props.row.priceCompare)}</span>&nbsp;
			<i>
				{(-((props.row.priceCompare - props.row.price) / props.row.priceCompare) * 100).toFixed() +
					'%'}
			</i>
		</Box>
	)
}

function RowProductImgCell(props) {
	return (
		<Box width={50} height={50}>
			<LazyLoadImage effect="blur" alt={props.row.name} src={props.row.image[0].url} />
		</Box>
	)
}

const AdminProduct = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [rows, setRows] = useState([])
	const [searched, setSearched] = useState('')
	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: 20,
	})
	const [rowCountState, setRowCountState] = useState(0)
	const [openDelete, setOpenDelete] = useState(false)
	const [id, setId] = useState(null)

	const columns = [
		{ field: '_id', headerName: 'ID', renderCell: RowIdCell },
		{
			field: 'image',
			headerName: 'Hình ảnh',
			minWidth: 100,
			align: 'center',
			headerAlign: 'center',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			disableReorder: true,
			renderCell: RowProductImgCell,
		},
		{ field: 'name', headerName: 'Tên sảm phẩm', width: 200 },
		{
			field: 'price',
			headerName: 'Giá',
			type: 'number',
			valueFormatter: ({ value }) => fVNDCurrency(value),
		},
		{
			field: 'priceCompare',
			headerName: 'Giá chưa giảm',
			type: 'number',
			minWidth: 150,
			renderCell: RowPriceCompareCell,
		},
		{
			field: 'quantity',
			headerName: 'Số lượng',
			type: 'number',
		},
		{
			field: 'sold',
			headerName: 'Đã bán',
			type: 'number',
		},
		{
			field: 'subs',
			headerName: 'Thương hiệu',
			valueGetter: (params) => params.row.subs[0].name,
		},
		{
			field: 'category',
			headerName: 'Danh mục',
			valueGetter: (params) => params.row.category.name,
		},

		{
			field: 'action',
			headerName: 'Hành động',
			sortable: false,
			width: 130,
			align: 'center',
			headerAlign: 'center',
			filterable: false,
			disableColumnMenu: true,
			disableReorder: true,
			renderCell: (params) => {
				const onUpdate = () => {
					// setName(params.row.name)
					// setExpiry(params.row.expiry)
					// setDiscount(params.row.discount)
					// setId(params.row._id)
					// setItem(params.row)
					// setOpen(true)
				}
				const onDelete = () => {
					setOpenDelete(true)
					setId(params.row._id)
				}
				return (
					<Box>
						<IconButton size="small" onClick={onUpdate}>
							<Iconify icon="eva:edit-2-fill" width="1.5em" height="1.5em" color="#2065d1" />
						</IconButton>
						<IconButton size="small" onClick={onDelete}>
							<Iconify
								icon="fluent:delete-16-filled"
								width="1.5em"
								height="1.5em"
								color="#f50057"
							/>
						</IconButton>
					</Box>
				)
			},
		},
	]

	const params = {
		limit: rowsState.pageSize,
		page: rowsState.page,
		sort: '-_id',
	}

	const { isLoading, data, error, isFetching } = useGetProducts(params)
	const mutationDelete = useDeleteProduct(params, (oldData, id) => {
		oldData.data.filter((item) => item._id !== id)
	})

	useEffect(() => {
		if (data) {
			setRows(data?.data)
			setRowCountState(data?.length)
		}
	}, [data])

	const requestSearch = (searchedVal) => {
		setSearched(searchedVal)
		const searchRegex = new RegExp(escapeRegExp(searchedVal), 'i')
		const filteredRows = data.data.filter((row) => {
			return Object.keys(row).some((field) => {
				return searchRegex.test(row[field].toString())
			})
		})
		setRows(filteredRows)
	}

	const cancelSearch = () => {
		setSearched('')
		requestSearch('')
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleRemove = async () => {
		try {
			await mutationDelete.mutateAsync(id)
			handleCloseDelete()
		} catch (e) {
			enqueueSnackbar('Xóa thất bại', { variant: 'error' })
		}
	}

	return (
		<AdminLayout>
			<AdminContent>
				<SEO pageTitle={'Admin | Sản phẩm'} />
				<>
					<Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
						{isLoading || mutationDelete.isLoading ? (
							<Skeleton variant="rect" width={150} height={30} />
						) : (
							<Typography variant="h6">{`Sản phẩm (${data?.length})`}</Typography>
						)}
						<Link to="/admin/product/create">
							<Button
								variant="contained"
								color="primary"
								startIcon={<Iconify icon="carbon:add" width="1.5em" height="1.5em" color="#fff" />}
							>
								Thêm sản phẩm
							</Button>
						</Link>
					</Box>
					<Box maxWidth={300}>
						<SearchBar
							value={searched}
							onChange={(searchVal) => requestSearch(searchVal)}
							onCancelSearch={() => cancelSearch()}
							placeholder="Tìm kiếm"
						/>
					</Box>
					<Box mt={2} width="100%">
						<DataGrid
							loading={isLoading}
							rows={rows}
							getRowId={(row) => row._id}
							columns={columns}
							rowCount={rowCountState}
							pagination
							{...rowsState}
							paginationMode="server"
							onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
							onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
							rowsPerPageOptions={[20]}
							componentsProps={{
								toolbar: {
									value: searched,
									onChange: (event) => requestSearch(event.target.value),
									clearSearch: () => requestSearch(''),
								},
							}}
							autoHeight
							hideFooterSelectedRowCount
						/>
					</Box>
					{/* Box delete */}
					<DialogOption
						open={openDelete}
						onClose={handleCloseDelete}
						title="Xóa sản phẩm"
						content="Bạn có chắc chắn xóa?"
						handleConfirm={handleRemove}
					/>
				</>
			</AdminContent>
		</AdminLayout>
	)
}

export default AdminProduct

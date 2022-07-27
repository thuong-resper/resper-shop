import { Avatar, Box, Button, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AdminContent, AdminLayout } from 'components/Layout'
import Iconify from 'components/Iconify'
import { escapeRegExp } from 'utils/regex'
import SearchBar from 'components/Search/SearchBar'
import { DataGrid } from '@material-ui/data-grid'
import { Skeleton } from '@material-ui/lab'
import DialogOption from 'pages/AdminPage/src/components/Dialog/DialogOption'
import { useSnackbar } from 'notistack'
import SEO from 'components/SEO/SEO'
import { useGetUsers } from 'features/Admin/User'
import { useDeleteProduct } from 'features/Admin/Product'
import { userRole } from 'staticOptions'
import SimplePopover from 'pages/AdminPage/src/components/Popover/Popover'

function RowIdCell(props) {
	return (
		<Link style={{ color: '#007ff0', cursor: 'pointer' }} to={`/user/${props.row._id}`}>
			{props.row._id}
		</Link>
	)
}

function RowNameShell(props) {
	return (
		<Box display="flex" alignItems="center">
			<Avatar
				alt={props.row.name}
				src={props.row.avatar}
				style={{ width: 32, height: 32, marginRight: 8 }}
			/>
			{props.row.name}
		</Box>
	)
}

function RowUserRoleCell(props) {
	return userRole
		.filter((r) => r.value === props.row.role)
		.map((r) => <Box key={r.value}>{r.label}</Box>)
}

function RowWishlistCell(props) {
	return (
		<Link style={{ color: '#007ff0', cursor: 'pointer' }} to={`/wishlist/${props.row._id}`}>
			{props.row.wishlist.length}
		</Link>
	)
}

const AdminUser = () => {
	const history = useHistory()
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
		{ field: 'name', headerName: 'Tên người dùng', width: 200, renderCell: RowNameShell },
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
		},
		{
			field: 'role',
			headerName: 'Vai trò',
			width: 150,
			renderCell: RowUserRoleCell,
		},
		{
			field: 'wishlist',
			headerName: 'Đã thích',
			minWidth: 130,
			align: 'center',
			headerAlign: 'center',
			renderCell: RowWishlistCell,
		},
		{
			field: 'paymentMethod',
			headerName: 'Thanh toán',
			minWidth: 150,
		},
		{
			field: 'address',
			headerName: 'Địa chỉ',
			minWidth: 200,
		},
		{
			field: 'action',
			headerName: 'Hành động',
			sortable: false,
			align: 'center',
			headerAlign: 'center',
			filterable: false,
			disableColumnMenu: true,
			disableReorder: true,
			renderCell: (params) => {
				const onUpdate = () => history.push(`/admin/product/update/${params.row._id}`)
				const onDelete = () => {
					setOpenDelete(true)
					setId(params.row._id)
				}
				return (
					<SimplePopover>
						<Box p={0.5}>
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
					</SimplePopover>
				)
			},
		},
	]

	const params = {
		limit: rowsState.pageSize,
		page: rowsState.page,
		sort: '-_id',
	}

	const { isLoading, data, error } = useGetUsers(params)
	const mutationDelete = useDeleteProduct(params, (oldData, id) => {
		oldData.data.filter((item) => item._id !== id)
	})

	useEffect(() => {
		if (data) {
			setRows(data)
			setRowCountState(data?.length)
		}
	}, [data])

	const requestSearch = (searchedVal) => {
		setSearched(searchedVal)
		const searchRegex = new RegExp(escapeRegExp(searchedVal), 'i')
		const filteredRows = data.filter((row) => {
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

	const handleRemove = async () => {
		try {
			setOpenDelete(false)
			await mutationDelete.mutateAsync(id)
		} catch (e) {
			enqueueSnackbar('Xóa thất bại', { variant: 'error' })
		}
	}

	if (error) return 'Error: ' + error.message

	return (
		<AdminLayout>
			<AdminContent>
				<SEO pageTitle={'Admin | Người dùng'} />
				<>
					<Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
						{isLoading || mutationDelete.isLoading ? (
							<Skeleton variant="rect" width={150} height={30} />
						) : (
							<Typography variant="h6">{`Người dùng (${data?.length})`}</Typography>
						)}
						<Button
							variant="contained"
							size="small"
							component={Link}
							to="/admin/user/create"
							startIcon={<Iconify icon="carbon:add" width="1em" height="1em" />}
						>
							Thêm người dùng
						</Button>
					</Box>
					<SearchBar
						value={searched}
						onChange={(searchVal) => requestSearch(searchVal)}
						onCancelSearch={() => cancelSearch()}
						placeholder="Tìm kiếm"
					/>
					<Box mt={2} width="100%">
						<DataGrid
							loading={isLoading || mutationDelete.isLoading}
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
						onClose={() => setOpenDelete(false)}
						title="Xóa sản phẩm"
						content="Bạn có chắc chắn xóa?"
						handleConfirm={handleRemove}
					/>
				</>
			</AdminContent>
		</AdminLayout>
	)
}

export default AdminUser

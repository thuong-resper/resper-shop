import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { AdminContent, AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'
import { useAddCoupon, useDeleteCoupon, useGetCoupons, usePatchCoupon } from 'features/Admin/Coupon'
import { escapeRegExp } from 'utils/regex'
import Iconify from 'components/Iconify'
import SearchBar from 'components/Search/SearchBar'
import { DataGrid } from '@mui/x-data-grid'
import { OptionBtn } from 'components/UI/Button/Button'
import DialogOption from 'pages/AdminPage/src/components/Dialog/DialogOption'
import moment from 'moment-timezone'
import CouponForm from 'pages/AdminPage/src/components/forms/CouponForm'
import { Skeleton } from '@material-ui/lab'

const Coupon = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [rows, setRows] = useState([])
	const [searched, setSearched] = useState('')
	const [pageSize, setPageSize] = useState(10)
	const [item, setItem] = useState(null)
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')
	const [discount, setDiscount] = useState(0)
	const [expiry, setExpiry] = useState('2021-01-01T00:00')
	const [openDelete, setOpenDelete] = useState(false)
	const [id, setId] = useState(null)

	const { isLoading, data, error } = useGetCoupons()
	const mutationAdd = useAddCoupon((oldData, newData) => [...oldData, newData])
	const mutationUpdate = usePatchCoupon((oldData, id) =>
		oldData.map((x) => (x._id === id ? { ...x, name, expiry, discount } : x))
	)
	const mutationDelete = useDeleteCoupon((oldData, id) => oldData.filter((item) => item._id !== id))

	useEffect(() => {
		if (data) {
			setRows(data)
		}
	}, [data])

	const columns = [
		{ field: '_id', headerName: 'ID', width: 250 },
		{ field: 'name', headerName: 'Mã coupon', width: 200 },
		{
			field: 'discount',
			headerName: 'Giảm giá (%)',
			width: 200,
			type: 'number',
		},
		{
			field: 'expiry',
			headerName: 'Ngày hết hạn',
			width: 200,
			valueFormatter: ({ value }) => moment(value).format('DD/MM/YYYY'),
		},
		{
			field: 'createdAt',
			headerName: 'Ngày tạo',
			width: 200,
			valueFormatter: ({ value }) => moment(value).format('DD/MM/YYYY'),
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
					setName(params.row.name)
					setExpiry(params.row.expiry)
					setDiscount(params.row.discount)
					setId(params.row._id)
					setItem(params.row)
					setOpen(true)
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

	const onClose = () => {
		setOpen(false)
		if (item) {
			setItem(null)
			setName('')
			setDiscount(0)
			setExpiry('2021-01-01T00:00')
		}
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleCreate = async () => {
		try {
			await mutationAdd.mutateAsync({ _id: '###', name, discount, expiry })
			setName('')
			setDiscount(0)
			setExpiry('2021-01-01T00:00')
			setOpen(false)
		} catch (e) {
			enqueueSnackbar('Tạo mới thất bại', { variant: 'error' })
		}
	}

	const handleUpdate = async () => {
		try {
			await mutationUpdate.mutateAsync({ id, name, expiry, discount })
			onClose()
		} catch (e) {
			enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
		}
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
				<SEO pageTitle={'Admin | Coupon'} />
				<>
					{error ? (
						<span>Error: {error.message}</span>
					) : (
						<>
							<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
								{isLoading ? (
									<Skeleton variant="rect" width={150} height={30} />
								) : (
									<Typography variant="h6">{`Coupon (${data.length})`}</Typography>
								)}
								<Button
									variant="contained"
									size="small"
									onClick={() => setOpen(true)}
									startIcon={<Iconify icon="carbon:add" width="1em" height="1em" />}
								>
									Tạo mới
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
									loading={isLoading}
									rows={rows}
									getRowId={(row) => row._id}
									columns={columns}
									pageSize={pageSize}
									onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
									rowsPerPageOptions={[10, 20, 30]}
									componentsProps={{
										toolbar: {
											value: searched,
											onChange: (event) => requestSearch(event.target.value),
											clearSearch: () => requestSearch(''),
										},
									}}
									autoHeight
									hideFooterSelectedRowCount
									pagination
								/>
							</Box>
							{/*Create or Update*/}
							<Dialog
								open={open}
								onClose={onClose}
								aria-labelledby="form-dialog-title-category"
								fullWidth
							>
								<DialogTitle id="form-dialog-title">
									{item ? `Cập nhật coupon: ${item.name}` : 'Tạo mới coupon'}
								</DialogTitle>
								<DialogContent>
									<CouponForm
										item={item}
										name={name}
										setName={setName}
										discount={discount}
										setDiscount={setDiscount}
										expiry={expiry}
										setExpiry={setExpiry}
									/>
								</DialogContent>
								<DialogActions style={{ marginRight: '16px' }}>
									<OptionBtn onClick={onClose} title="Hủy" color="default" />
									<OptionBtn
										onClick={item ? handleUpdate : handleCreate}
										title="Xác nhận"
										autoFocus
										disabled={
											(!name && !expiry && !discount) ||
											(item &&
												item.name === name &&
												item.expiry === expiry &&
												item.discount === discount)
										}
									/>
								</DialogActions>
							</Dialog>
							{/*Delete*/}
							<DialogOption
								open={openDelete}
								onClose={handleCloseDelete}
								title="Xóa coupon"
								content="Bạn có chắc chắn xóa?"
								handleConfirm={handleRemove}
							/>
						</>
					)}
				</>
			</AdminContent>
		</AdminLayout>
	)
}

export default Coupon

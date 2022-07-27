import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
} from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useSnackbar } from 'notistack'
import moment from 'moment-timezone'
import { DataGrid } from '@material-ui/data-grid'
import DialogOption from 'pages/AdminPage/src/components/Dialog/DialogOption'
import { escapeRegExp } from 'utils/regex'
import { AdminContent, AdminLayout } from 'components/Layout'
import Iconify from 'components/Iconify'
import SearchBar from 'components/Search/SearchBar'
import { OptionBtn } from 'components/UI/Button/Button'
import SEO from 'components/SEO/SEO'
import {
	useAddCategory,
	useDeleteCategory,
	useGetCategories,
	usePatchCategory,
} from 'features/Admin/Category'
import { Skeleton } from '@material-ui/lab'
import SimplePopover from 'pages/AdminPage/src/components/Popover/Popover'

const Category = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [rows, setRows] = useState([])
	const [searched, setSearched] = useState('')
	const [pageSize, setPageSize] = useState(10)
	const [name, setName] = useState('')
	const [item, setItem] = useState(null)
	const [open, setOpen] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [id, setId] = useState(null)

	const { isLoading, data, error } = useGetCategories()
	const mutationAdd = useAddCategory((oldData, newData) => [...oldData, newData])
	const mutationUpdate = usePatchCategory((oldData, id) =>
		oldData.map((x) => (x._id === id ? { ...x, name } : x))
	)
	const mutationDelete = useDeleteCategory((oldData, id) =>
		oldData.filter((item) => item._id !== id)
	)

	useEffect(() => {
		if (data) {
			setRows(data)
		}
	}, [data])

	const columns = [
		{ field: '_id', headerName: 'ID', minWidth: 250 },
		{ field: 'name', headerName: 'Danh mục', minWidth: 300 },
		{
			field: 'createdAt',
			headerName: 'Ngày tạo',
			minWidth: 300,
			valueFormatter: ({ value }) => moment(value).format('DD/MM/YYYY'),
		},
		{
			field: 'action',
			headerName: 'Hành động',
			sortable: false,
			minWidth: 150,
			align: 'center',
			headerAlign: 'center',
			filterable: false,
			disableColumnMenu: true,
			disableReorder: true,
			renderCell: (params) => {
				const onUpdate = () => {
					setName(params.row.name)
					setId(params.row._id)
					setItem(params.row)
					setOpen(true)
				}
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
			setId(null)
		}
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleCreate = async () => {
		try {
			await mutationAdd.mutateAsync({ _id: '###', name })
			setName('')
			setOpen(false)
		} catch (e) {
			enqueueSnackbar('Tạo mới thất bại', { variant: 'error' })
		}
	}

	const handleUpdate = async () => {
		try {
			await mutationUpdate.mutateAsync({ id, nameEdit: name })
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

	const divRef = useRef(null)
	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth' })
	})

	return (
		<AdminLayout>
			<AdminContent>
				<SEO pageTitle={'Admin | Danh mục'} />
				<div ref={divRef} />
				<>
					{error ? (
						<span>Error: {error.message}</span>
					) : (
						<>
							<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
								{isLoading ? (
									<Skeleton variant="rect" width={150} height={30} />
								) : (
									<Typography variant="h6">{`Danh mục (${data.length})`}</Typography>
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
									{item ? `Cập nhật danh mục: ${item.name}` : 'Tạo mới danh mục'}
								</DialogTitle>
								<DialogContent>
									<TextField
										value={name}
										size="small"
										onChange={(e) => setName(e.target.value)}
										placeholder="Tên danh mục"
										variant="outlined"
										fullWidth
									/>
								</DialogContent>
								<DialogActions style={{ marginRight: '16px' }}>
									<OptionBtn onClick={onClose} title="Hủy" color="default" />
									<OptionBtn
										onClick={item ? handleUpdate : handleCreate}
										title="Xác nhận"
										autoFocus
										disabled={!name || (item && item.name === name)}
									/>
								</DialogActions>
							</Dialog>
							{/*Delete*/}
							<DialogOption
								open={openDelete}
								onClose={handleCloseDelete}
								title="Xóa danh mục"
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

export default Category

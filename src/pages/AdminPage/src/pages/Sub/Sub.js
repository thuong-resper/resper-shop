import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSnackbar } from 'notistack'
import { Autocomplete, Skeleton } from '@material-ui/lab'
import SearchBar from 'components/Search/SearchBar'
import SEO from 'components/SEO/SEO'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { AdminContent, AdminLayout } from 'components/Layout'
import { OptionBtn } from 'components/UI/Button/Button'
import DialogOption from 'pages/AdminPage/src/components/Dialog/DialogOption'
import { useAddSub, useDeleteSub, useGetSubs, usePatchSub } from 'features/Admin/Sub'
import { useGetCategories } from 'features/Admin/Category'
import Iconify from 'components/Iconify'
import { escapeRegExp } from 'utils/regex'

const useStyles = makeStyles((theme) => ({
	dialogContent: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			'& div': {
				width: '100% !important',
			},
		},
	},
}))

const Sub = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [rows, setRows] = useState([])
	const [searched, setSearched] = useState('')
	const [pageSize, setPageSize] = useState(10)
	const [name, setName] = useState('')
	const [category, setCategory] = useState(null)
	const [inputValue, setInputValue] = React.useState('')
	const [item, setItem] = useState(null)
	const [openDelete, setOpenDelete] = useState(false)
	const [open, setOpen] = useState(false)
	const [id, setId] = useState(null)

	const { isLoading, data, error, isFetching } = useGetSubs()
	const { data: dataCategories } = useGetCategories()
	const mutationAdd = useAddSub((oldData, newData) => [...oldData, newData])
	const mutationUpdate = usePatchSub((oldData, id) =>
		oldData.map((x) => (x._id === id ? { ...x, name, parent: category } : x))
	)
	const mutationDelete = useDeleteSub((oldData, id) => oldData.filter((item) => item._id !== id))

	useEffect(() => {
		if (data) {
			setRows(data)
		}
	}, [data])

	const columns = [
		{ field: '_id', headerName: 'ID', width: 250 },
		{ field: 'name', headerName: 'Thương hiệu', width: 250 },
		{
			field: 'parent',
			headerName: 'Danh mục',
			width: 250,
			valueGetter: (params) => params.row?.parent?.name,
		},
		{
			field: 'createdAt',
			headerName: 'Ngày tạo',
			width: 250,
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
					setCategory(params.row.parent)
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
			setId(null)
			setCategory(null)
		}
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleCreate = async () => {
		try {
			await mutationAdd.mutateAsync({ _id: '###', name, parent: category })
			setName('')
			setCategory('')
			setOpen(false)
		} catch (e) {
			enqueueSnackbar('Tạo mới thất bại', { variant: 'error' })
		}
	}

	const handleUpdate = async () => {
		try {
			await mutationUpdate.mutateAsync({ id, name, parent: category })
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
				<SEO pageTitle={'Admin | Thương hiệu'} />
				<>
					{error ? (
						<span>Error: {error.message}</span>
					) : (
						<>
							<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
								{isLoading ? (
									<Skeleton variant="rect" width={150} height={30} />
								) : (
									<Typography variant="h6">{`Thương hiệu (${data.length})`}</Typography>
								)}
								<Button
									variant="contained"
									color="primary"
									size="small"
									onClick={() => setOpen(true)}
									startIcon={
										<Iconify icon="carbon:add" width="1.5em" height="1.5em" color="#fff" />
									}
								>
									Tạo mới
								</Button>
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
							<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
								<DialogTitle id="form-dialog-title">
									{item ? `Cập nhật thương hiệu: ${item.name}` : 'Tạo mới thương hiệu'}
								</DialogTitle>
								<DialogContent className={classes.dialogContent}>
									<TextField
										value={name}
										size="small"
										onChange={(e) => setName(e.target.value)}
										placeholder="Tên thương hiệu"
										style={{ width: 270 }}
										variant="outlined"
										required={true}
									/>
									<Autocomplete
										id="choose-category"
										value={category}
										onChange={(event, newValue) => {
											setCategory(newValue)
										}}
										inputValue={inputValue}
										onInputChange={(event, newInputValue) => {
											setInputValue(newInputValue)
										}}
										options={dataCategories}
										getOptionLabel={(o) => o.name || ''}
										style={{ width: 270 }}
										renderInput={(params) => (
											<TextField {...params} label="Danh mục" variant="outlined" size="small" />
										)}
									/>
								</DialogContent>
								<DialogActions style={{ marginRight: '16px' }}>
									<OptionBtn onClick={onClose} title="Hủy" color="default" />
									<OptionBtn
										onClick={item ? handleUpdate : handleCreate}
										title="Xác nhận"
										autoFocus
										disabled={
											(!name && !category) ||
											(item && item.name === name && item.parent === category)
										}
									/>
								</DialogActions>
							</Dialog>
							{/*Delete*/}
							<DialogOption
								open={openDelete}
								onClose={handleCloseDelete}
								title="Xóa thương hiệu"
								content="Bạn có chắc chắn xóa?"
								handleConfirm={handleRemove}
							/>
						</>
					)}
				</>
				{isFetching ? <SimpleBackdrop /> : null}
			</AdminContent>
		</AdminLayout>
	)
}

export default Sub

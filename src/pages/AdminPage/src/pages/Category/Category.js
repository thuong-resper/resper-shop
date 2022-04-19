import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import LocalSearch from '../../components/forms/LocalSearch'
import { AdminContent, AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'
import {
	useAddCategory,
	useDeleteCategory,
	useGetCategories,
	usePatchCategory,
} from 'features/Admin/Category/index.js'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import Iconify from 'components/Iconify.js'
import CategoryForm from 'pages/AdminPage/src/components/forms/CategoryForm.js'
import { useSnackbar } from 'notistack'
import { OptionBtn } from 'components/UI/Button/Button.js'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	item: {
		padding: '0.5rem',
		margin: '0.5rem 0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'relative',
		borderRadius: '0.5rem',
		backgroundColor: '#e8eaf6',
	},
	dialog: { minWidth: '400px' },
	itemBtn: { display: 'flex' },
}))

const Category = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const [name, setName] = useState('')
	const [nameEdit, setNameEdit] = useState('')
	const [initialName, setInitialName] = useState('')
	const [open, setOpen] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [id, setId] = useState(null)
	const [keyword, setKeyword] = useState('')

	const { status, data, error, isFetching } = useGetCategories()
	const mutationAdd = useAddCategory((oldData, newData) => [...oldData, newData])
	const mutationUpdate = usePatchCategory((oldData, id) =>
		oldData.map((x) => (x._id === id ? { ...x, name: nameEdit } : x))
	)
	const mutationDelete = useDeleteCategory((oldData, id) =>
		oldData.filter((item) => item._id !== id)
	)

	const onOpenUpdate = (c) => {
		setOpen(true)
		setId(c._id)
		setInitialName(c.name)
	}

	const onOpenDelete = (id) => {
		setOpenDelete(true)
		setId(id)
	}

	const onCloseEdit = () => {
		setOpen(false)
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const onAdd = async (e) => {
		e.preventDefault()
		try {
			await mutationAdd.mutateAsync({ name })
			setName('')
		} catch (e) {
			enqueueSnackbar('Tạo mới thất bại', { variant: 'error' })
		}
	}

	const onUpdate = async (e) => {
		e.preventDefault()
		try {
			await mutationUpdate.mutateAsync({ id, nameEdit })
			setNameEdit('')
			onCloseEdit()
		} catch (e) {
			enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
		}
	}

	const onRemove = async () => {
		try {
			await mutationDelete.mutateAsync(id)
			handleCloseDelete()
		} catch (e) {
			enqueueSnackbar('Xóa thất bại', { variant: 'error' })
		}
	}

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

	return (
		<AdminLayout>
			<AdminContent>
				{status === 'loading' ? (
					<SimpleBackdrop />
				) : (
					<>
						{status === 'error' ? (
							<span>Error: {error.message}</span>
						) : (
							<>
								<SEO pageTitle={'Admin | Danh mục'} />
								<Box mb={4}>
									<Typography variant="h6">{`Danh mục (${data.length})`}</Typography>
								</Box>
								<Box display="flex" justifyContent="space-between" alignItems="center">
									<CategoryForm
										mutationAdd={mutationAdd}
										handleSubmit={onAdd}
										name={name}
										setName={setName}
									/>
									<LocalSearch
										keyword={keyword}
										setKeyword={setKeyword}
										placeholder="Tìm kiếm danh mục"
									/>
								</Box>
								<Box mt={4}>
									{data.filter(searched(keyword)).map((c) => (
										<div key={c._id}>
											<div className={classes.item}>
												<p>{c.name}</p>
												<div className={classes.itemBtn}>
													<IconButton onClick={() => onOpenUpdate(c)} size="small">
														<Iconify
															icon="eva:edit-2-fill"
															width="1.5em"
															height="1.5em"
															color="#2065d1"
														/>
													</IconButton>
													<IconButton onClick={() => onOpenDelete(c._id)} size="small">
														<Iconify
															icon="fluent:delete-16-filled"
															width="1.5em"
															height="1.5em"
															color="#f50057"
														/>
													</IconButton>
												</div>
											</div>
										</div>
									))}
									{/* Update */}
									<Box>
										<Dialog
											open={open}
											onClose={onCloseEdit}
											aria-labelledby="form-dialog-title"
											fullWidth
										>
											<DialogTitle id="form-dialog-title">{`Cập nhật danh mục: ${initialName}`}</DialogTitle>
											<DialogContent>
												<TextField
													autoFocus
													margin="dense"
													label="Tên danh mục mới"
													fullWidth
													value={nameEdit}
													onChange={(e) => setNameEdit(e.target.value)}
												/>
											</DialogContent>
											<DialogActions>
												<OptionBtn onClick={onCloseEdit} title="Hủy" color="default" />
												<OptionBtn
													onClick={onUpdate}
													title="Xác nhận"
													autoFocus
													disabled={!nameEdit || nameEdit === initialName}
												/>
											</DialogActions>
										</Dialog>
									</Box>
									{/* Delete */}
									<Box>
										<Dialog
											open={openDelete}
											onClose={handleCloseDelete}
											aria-labelledby="alert-dialog-title"
											aria-describedby="alert-dialog-description"
											fullWidth
										>
											<DialogTitle id="alert-dialog-title">Xóa danh mục</DialogTitle>
											<DialogContent>
												<DialogContentText id="alert-dialog-description">
													Bạn có chắc chắn xóa?
												</DialogContentText>
											</DialogContent>
											<DialogActions>
												<OptionBtn onClick={handleCloseDelete} title="Hủy" color="default" />
												<OptionBtn onClick={onRemove} title="Xác nhận" autoFocus />
											</DialogActions>
										</Dialog>
									</Box>
								</Box>
							</>
						)}
					</>
				)}
				{isFetching ? <SimpleBackdrop /> : null}
			</AdminContent>
		</AdminLayout>
	)
}

export default Category

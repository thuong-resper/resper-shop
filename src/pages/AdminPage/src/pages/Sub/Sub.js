import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { getCategories } from 'features/Admin/Category/pathAPI'
import moment from 'moment-timezone'
import { createSub, deleteSub, getSubs } from 'features/Admin/Sub/pathAPI'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import LocalSearch from '../../components/forms/LocalSearch'
import { UserContext } from 'contexts/index.js'
import { AdminContent, AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'
import { useGetCategories } from 'features/Admin/Category/index.js'
import { useGetSubs } from 'features/Admin/Sub/index.js'
import Iconify from 'components/Iconify.js'
import { DataGrid } from '@material-ui/data-grid'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	formControl: {
		margin: theme.spacing(1),
		width: 200,
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
	autoComplete: { margin: '0.5rem 0 0.25rem 0.5rem', width: '200px' },
	option: { backgroundColor: '#e8eaf6' },
	itemBtn: { display: 'flex' },
}))

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
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 130,
		valueGetter: (params) => `${params.row.name || ''} ${params.row.name || ''}`,
	},
]

const Sub = () => {
	const state = useContext(UserContext)
	const classes = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const [token] = state.token

	const [rows, setRows] = useState([])
	const [name, setName] = useState('')
	const [category, setCategory] = useState('')
	const [inputValue, setInputValue] = React.useState('')
	const [slug, setSlug] = useState('')
	const [openDelete, setOpenDelete] = useState(false)
	const [keyword, setKeyword] = useState('')

	const { status, data, error, isFetching } = useGetSubs()

	const { status: statusCategory } = useGetCategories()

	useEffect(() => {
		if (status === 'success') {
			setRows(data)
		}
	}, [status, data])

	const actionGetCategories = () => dispatch(getCategories())
	const actionGetSubs = () => dispatch(getSubs())
	const actionCreateSub = (data, token) => dispatch(createSub(data, token))
	const actionDeleteSub = (slug, token) => dispatch(deleteSub(slug, token))

	//store
	const categories = useSelector((state) => state.category.categories)

	useEffect(() => {
		actionGetCategories()
		actionGetSubs() // eslint-disable-next-line
	}, [])

	const handleChange = (event, newValue) => {
		setCategory(newValue)
	}

	const handleClickDeleteOpen = (slug) => {
		setOpenDelete(true)
		setSlug(slug)
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = { name, parent: category }
		actionCreateSub(data, token)
		actionGetCategories()
		setName('')
		setCategory('')
	}

	const handleRemove = () => {
		actionDeleteSub(slug, token)
		actionGetCategories()
		actionGetSubs()
		handleCloseDelete()
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
								<SEO pageTitle={'Admin | Thương hiệu'} />
								<Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
									<Typography variant="h6">{`Thương hiệu (${data.length})`}</Typography>
									<Button
										variant="contained"
										color="primary"
										size="small"
										startIcon={
											<Iconify icon="carbon:add" width="1.5em" height="1.5em" color="#fff" />
										}
									>
										Tạo mới
									</Button>
								</Box>
								<Box>
									<Box display="flex" justifyContent="space-between" alignItems="center">
										<form onSubmit={handleSubmit}>
											<Typography variant="body1">Tạo mới thương hiệu</Typography>
											<Box display="flex">
												<TextField
													value={name}
													size="small"
													onChange={(e) => setName(e.target.value)}
													placeholder="Tên thương hiệu"
													margin="dense"
													InputLabelProps={{
														shrink: true,
													}}
													variant="outlined"
												/>
												<div className={classes.autoComplete}>
													<Autocomplete
														value={category}
														onChange={handleChange}
														inputValue={inputValue}
														onInputChange={(event, newInputValue) => {
															setInputValue(newInputValue)
														}}
														classes={{
															option: classes.option,
														}}
														id="controllable-states-demo"
														options={categories}
														getOptionLabel={(option) => option.name || ''}
														getOptionSelected={(option, value) => option.value === value.value}
														renderInput={(params) => (
															<TextField
																{...params}
																label="Danh mục"
																variant="outlined"
																size="small"
															/>
														)}
													/>
												</div>
												<Button variant="contained" color="primary" type="submit">
													Lưu
												</Button>
											</Box>
										</form>
										<LocalSearch
											keyword={keyword}
											setKeyword={setKeyword}
											placeholder="Tên thương hiệu"
										/>
									</Box>
									<Box mt={2}>
										<div style={{ height: 630, width: '100%' }}>
											<DataGrid
												rows={rows}
												getRowId={(row) => row._id}
												columns={columns}
												pageSize={10}
												rowsPerPageOptions={[Math.ceil(data.length / 30)]}
												checkboxSelection
											/>
										</div>
										{/*{data.filter(searched(keyword)).map((c, index) => (*/}
										{/*	<div key={c.slug || index}>*/}
										{/*		<div className={classes.item}>*/}
										{/*			<p>{c.name}</p>*/}
										{/*			<div className={classes.itemBtn}>*/}
										{/*				<IconButton*/}
										{/*					onClick={() => history.push(`/admin/sub/${c.slug}`)}*/}
										{/*					size="small"*/}
										{/*				>*/}
										{/*					<Iconify*/}
										{/*						icon="eva:edit-2-fill"*/}
										{/*						width="1.5em"*/}
										{/*						height="1.5em"*/}
										{/*						color="#2065d1"*/}
										{/*					/>*/}
										{/*				</IconButton>*/}
										{/*				<IconButton onClick={() => handleClickDeleteOpen(c.slug)} size="small">*/}
										{/*					<Iconify*/}
										{/*						icon="fluent:delete-16-filled"*/}
										{/*						width="1.5em"*/}
										{/*						height="1.5em"*/}
										{/*						color="#f50057"*/}
										{/*					/>*/}
										{/*				</IconButton>*/}
										{/*			</div>*/}
										{/*		</div>*/}
										{/*	</div>*/}
										{/*))}*/}
										{/* Box delete */}
										<Box>
											<Dialog
												open={openDelete}
												onClose={handleCloseDelete}
												aria-labelledby="alert-dialog-title"
												aria-describedby="alert-dialog-description"
											>
												<DialogTitle id="alert-dialog-title">Xóa danh mục</DialogTitle>
												<DialogContent>
													<DialogContentText id="alert-dialog-description">
														Bạn có chắc chắn xóa?
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

export default Sub

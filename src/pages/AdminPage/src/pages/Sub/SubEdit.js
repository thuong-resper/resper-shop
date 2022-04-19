import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import AdminSidebar from 'components/Navigation/MainMenu/AdminSidebar'
import { getCategories } from 'features/Admin/Category/pathAPI'
import { getSub, updateSub } from 'features/Admin/Sub/pathAPI'
import { clearState } from 'features/Admin/Sub/SubSlice'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { UserContext } from 'contexts/index.js'

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

const SubEdit = ({ match, history }) => {
	// --Contexts
	const state = useContext(UserContext)
	const classes = useStyles()
	const dispatch = useDispatch()
	const [token] = state.token
	const { enqueueSnackbar } = useSnackbar()
	const slug = match.params.slug
	// dispatch API
	const actionGetCategories = () => dispatch(getCategories())
	const actionGetSub = (slug) => dispatch(getSub(slug))
	const actionUpdateSub = (data, token) => dispatch(updateSub(data, token))

	//store
	const categories = useSelector((state) => state.category.categories)
	const sub = useSelector((state) => state.sub.sub)
	const isSuccess = useSelector((state) => state.sub.isSuccess)
	const isError = useSelector((state) => state.sub.isError)
	const message = useSelector((state) => state.sub.message)
	const loading = useSelector((state) => state.sub.loading)

	const [name, setName] = useState('')
	const [inputValue, setInputValue] = React.useState('')

	const [parent, setParent] = useState(categories[0])

	useEffect(() => {
		return () => {
			dispatch(clearState())
		} // eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (isError) {
			enqueueSnackbar(message, { variant: 'error' })
			dispatch(clearState())
		}

		if (isSuccess) {
			enqueueSnackbar(message, { variant: 'success' })
			dispatch(clearState())
		} // eslint-disable-next-line
	}, [isError, isSuccess])

	useEffect(() => {
		actionGetCategories()
		actionGetSub(slug) // eslint-disable-next-line
	}, [])

	const handleChangeEdit = (event, newValue) => {
		setParent(newValue)
	}

	const handleSubmitEdit = (e) => {
		e.preventDefault()
		const data = { name, slug, parent }
		actionUpdateSub(data, token)
		actionGetCategories()
		setName('')
		history.push('/admin/sub')
	}

	return (
		<>
			<Helmet>
				<title>Sub</title>
			</Helmet>
			<div className={classes.root}>
				{loading && <SimpleBackdrop />}
				<AdminSidebar />
				<main className={classes.content}>
					<form onSubmit={handleSubmitEdit} style={{ margin: '0.5rem', minWidth: '120px' }}>
						<Typography variant="h5">Cập nhật thương hiệu</Typography>
						<Typography variant="body1">
							Thương hiệu&nbsp;<b>{sub.sub?.name}</b>
						</Typography>

						<Box display="flex" m="0.5rem 0">
							<TextField
								value={name}
								size="small"
								onChange={(e) => setName(e.target.value)}
								placeholder="Tên danh mục"
								margin="dense"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
							/>
							<div className={classes.autoComplete}>
								<Autocomplete
									onChange={handleChangeEdit}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue)
									}}
									getOptionLabel={(option) => option.name || ''}
									options={categories}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField {...params} label="Danh mục" variant="outlined" size="small" />
									)}
								/>
							</div>
						</Box>
						<Button variant="contained" color="primary" type="submit">
							Lưu
						</Button>
					</form>
				</main>
			</div>
		</>
	)
}

export default SubEdit

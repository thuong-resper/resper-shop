import { IconButton, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import { updateSearch } from 'features/Search/SearchProductSlice'
import { useRouter } from 'hooks'
import queryString from 'query-string'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		marginLeft: 0,
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
}))

const Search = () => {
	const classes = useStyles()
	const router = useRouter()
	const dispatch = useDispatch()
	const pathname = queryString.parse(router.location.search, { arrayFormat: 'comma' }) ?? null
	const defaultValues = {
		name: pathname.query ?? '',
	}
	const [formValues, setFormValues] = useState(defaultValues)

	const actionSaveSearch = (keyword) => dispatch(updateSearch(keyword))
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormValues({
			...formValues,
			[name]: value,
		})
	}
	const handleSubmit = (event) => {
		event.preventDefault()
		const search = formValues.name.trim().replace(/ /g, '-')
		const keyword = formValues.name
		actionSaveSearch(keyword)
		const url = `/shop?query=${search}`
		router.push(url)
	}
	return (
		<form onSubmit={handleSubmit} className={classes.search}>
			<TextField
				variant="outlined"
				size="small"
				name="name"
				placeholder="Tìm kiếm theo tên, mô tả..."
				value={formValues.name}
				onChange={handleInputChange}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton type="submit" size="small">
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</form>
	)
}
export default Search

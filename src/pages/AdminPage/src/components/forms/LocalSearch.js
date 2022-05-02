import { Box, TextField } from '@material-ui/core'
import React from 'react'

const LocalSearch = ({ keyword, setKeyword, placeholder }) => {
	const handleSearchChange = (e) => {
		e.preventDefault()
		setKeyword(e.target.value.toLowerCase())
	}

	return (
		<Box>
			<TextField
				value={keyword}
				type="search"
				size="small"
				onChange={handleSearchChange}
				id="outlined-full-width"
				placeholder={placeholder}
				variant="outlined"
			/>
		</Box>
	)
}

export default LocalSearch

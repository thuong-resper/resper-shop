import { Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import React from 'react'

const CategoryForm = ({ mutationAdd, handleSubmit, name, setName }) => {
	return (
		<Box display="flex" alignItems="center">
			<Typography variant="body1">Tạo mới danh mục</Typography>
			<form onSubmit={handleSubmit} style={{ marginLeft: '8px' }}>
				<TextField
					value={name}
					size="small"
					onChange={(e) => setName(e.target.value)}
					placeholder="Tên danh mục"
					InputLabelProps={{
						shrink: true,
					}}
					variant="outlined"
				/>

				<Button
					style={{ margin: '0 8px', lineHeight: 2 }}
					variant="contained"
					color="primary"
					type="submit"
					disabled={!name || mutationAdd.isLoading}
				>
					{mutationAdd.isLoading ? <CircularProgress size={26} color="secondary" /> : 'Lưu'}
				</Button>
			</form>
		</Box>
	)
}

export default CategoryForm

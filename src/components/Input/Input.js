import TextField from '@material-ui/core/TextField'
import React, { forwardRef } from 'react'

export const Input = forwardRef((props, ref) => {
	return (
		<TextField
			variant="outlined"
			margin="normal"
			size="small"
			inputRef={ref}
			fullWidth
			{...props}
		/>
	)
})

export const BasicInput = forwardRef((props, ref) => {
	return (
		<TextField margin="dense" variant="outlined" size="small" inputRef={ref} fullWidth {...props} />
	)
})

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core'
import React from 'react'
import { OptionBtn } from 'components/UI/Button/Button'

const DialogOption = ({ open, onClose, fullWidth, maxWidth, title, content, handleConfirm }) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth={fullWidth || true}
			maxWidth={maxWidth || 'xs'}
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<OptionBtn onClick={onClose} title="Hủy" color="default" />
				<OptionBtn onClick={handleConfirm} title="Xác nhận" autoFocus />
			</DialogActions>
		</Dialog>
	)
}

export default DialogOption

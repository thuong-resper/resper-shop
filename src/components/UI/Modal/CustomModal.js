import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

export const useStyles = makeStyles((theme) => ({
	dialog: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		maxWidth: '750px',
		margin: 'auto',
		width: '100%',
		minWidth: '400px',
	},
	closeIcon: {
		cursor: 'pointer',
		right: '1rem',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
	},
}))

export default function AlertDialogSlide(props) {
	const classes = useStyles()

	const {
		title,
		component,
		iconAnchor,
		confirmButton,
		disagreeButton,
		fullScreen,
		children,
		sizeCfIcon,
		close,
	} = props

	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className={classes.root}>
			{children && <div onClick={handleClickOpen}>{children}</div>}
			{iconAnchor && (
				<IconButton onClick={handleClickOpen} size={sizeCfIcon || 'medium'}>
					{iconAnchor}
				</IconButton>
			)}
			<Dialog
				fullScreen={fullScreen}
				open={close === false ? close : open}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<div className={classes.dialog}>
					<DialogTitle id="alert-dialog-slide-title">{title || ''}</DialogTitle>
					<CloseIcon color="inherit" onClick={handleClose} className={classes.closeIcon} />
				</div>
				<DialogContent>{component}</DialogContent>
				<DialogActions>
					{disagreeButton ? (
						<Button onClick={handleClose} color="primary">
							Đóng
						</Button>
					) : null}

					{confirmButton}
				</DialogActions>
			</Dialog>
		</div>
	)
}

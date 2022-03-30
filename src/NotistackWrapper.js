import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { isMobile } from 'react-device-detect'

const MAX_SNACKBAR = 3
const AUTO_HIDE_DURATION = 6000
const POSITION = {
	vertical: 'bottom',
	horizontal: 'center',
}

export default function NotistackWrapper({ children }) {
	const notistackRef = React.createRef()
	const onClickDismiss = (key) => () => {
		notistackRef.current.closeSnackbar(key)
	}

	return (
		<SnackbarProvider
			maxSnack={MAX_SNACKBAR}
			autoHideDuration={AUTO_HIDE_DURATION}
			anchorOrigin={POSITION}
			dense={isMobile}
			ref={notistackRef}
			TransitionComponent={Grow}
			action={(key) => (
				<IconButton key="close" aria-label="Close" color="inherit" onClick={onClickDismiss(key)}>
					<CloseIcon style={{ fontSize: '20px' }} />
				</IconButton>
			)}
		>
			{children}
		</SnackbarProvider>
	)
}

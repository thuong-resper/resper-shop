import React from 'react'
import Popover from '@material-ui/core/Popover'
import { IconButton } from '@material-ui/core'
import Iconify from 'components/Iconify'

const SimplePopover = ({ children, close }) => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const open = Boolean(anchorEl)
	const anchorOrigin = {
		vertical: 'bottom',
		horizontal: 'center',
	}
	const transformOrigin = {
		vertical: 'top',
		horizontal: 'center',
	}

	React.useEffect(() => {
		if (close) {
			setAnchorEl(null)
		}
	}, [close])

	return (
		<div>
			<IconButton variant="contained" size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
				<Iconify icon="bi:three-dots-vertical" width="1.5em" height="1.5em" />
			</IconButton>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
			>
				{children}
			</Popover>
		</div>
	)
}

export default SimplePopover

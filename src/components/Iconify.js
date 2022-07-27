import { Icon } from '@iconify/react'
import { Box } from '@material-ui/core'

export default function Iconify({ icon, ...other }) {
	return <Box component={Icon} icon={icon} {...other} />
}

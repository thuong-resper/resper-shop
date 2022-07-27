import { Avatar, Box, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { UserSidebarItems } from './MainMenuData'
import NavSection from 'components/Navigation/MainMenu/NavSection'
import { UserContext } from 'contexts'
import { useWindowDimensions } from 'hooks'

const UserSidebar = () => {
	const { width } = useWindowDimensions()
	const state = useContext(UserContext)
	const [user] = state.user

	return (
		<Box>
			{width > 600 && (
				<Box>
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '8px 16px',
							marginBottom: 16,
							borderRadius: 12,
							backgroundColor: '#919eab1f',
						}}
					>
						<Avatar
							alt={user.name}
							src={user.avatar}
							style={{
								marginRight: 16,
							}}
						/>
						<Typography variant="body1">
							<b>{user.name}</b>
						</Typography>
					</Box>
					<NavSection nav={UserSidebarItems} />
				</Box>
			)}
		</Box>
	)
}

export default UserSidebar

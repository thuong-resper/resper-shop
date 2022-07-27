import { Box, Typography } from '@material-ui/core'
import React from 'react'
import SEO from 'components/SEO/SEO'
import UserCreateForm from 'pages/AdminPage/src/pages/User/form/UserCreateForm'
import { UserLayout } from 'components/Layout/UserLayout'
import { useGetUserProfile } from 'features/User'
import SimpleBackdrop from 'components/Backdrop/Backdrop'

const UserProfile = () => {
	const { isLoading, data, error } = useGetUserProfile()

	if (isLoading) return <SimpleBackdrop />

	if (error) return 'Error: ' + error.message

	return (
		<UserLayout>
			<SEO pageTitle={'Hồ sơ của tôi'} />
			<Box>
				<Box>
					<Typography variant="h6">Hồ sơ của tôi</Typography>
				</Box>
				<Box marginTop={4}>
					<UserCreateForm user={data} />
				</Box>
			</Box>
		</UserLayout>
	)
}

export default UserProfile

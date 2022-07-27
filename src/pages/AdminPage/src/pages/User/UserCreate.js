import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { AdminContent, AdminLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO'
import CustomAdminBreadCrumb from 'pages/AdminPage/src/components/BreadCrumbs'
import UserCreateForm from 'pages/AdminPage/src/pages/User/form/UserCreateForm'

const link = [
	{ title: 'Thống kê', path: '/admin/dashboard' },
	{ title: 'Danh sách', path: '/admin/user' },
]

const UserCreate = () => {
	return (
		<AdminLayout>
			<SEO pageTitle={'Admin | Tạo mới người dùng'} />
			<AdminContent>
				<Box>
					<Typography variant="h5" style={{ fontWeight: 'bold' }}>
						Tạo mới người dùng
					</Typography>
					<CustomAdminBreadCrumb link={link} lastTitle={'Tạo mới'} />
				</Box>
				<Box marginTop={4}>
					<UserCreateForm />
				</Box>
			</AdminContent>
		</AdminLayout>
	)
}

export default UserCreate

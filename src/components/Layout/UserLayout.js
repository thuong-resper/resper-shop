import * as React from 'react'
import { Auth } from 'components/common'
import Header from 'components/Header/Header'
import MainMenu from 'components/Navigation/MainMenu/MainMenu'
import { Box, Container, Grid } from '@material-ui/core'
import UserSidebar from 'components/Navigation/MainMenu/UserSidebar'
import Footer from 'components/Footer/Footer'

export function UserLayout({ children }) {
	return (
		<Auth>
			<Box minHeight={'100vh'} display={'flex'} flexDirection={'column'}>
				<Header />
				<MainMenu />
				<Box component="main" flexGrow={1} marginTop={2}>
					<Container>
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<UserSidebar />
							</Grid>
							<Grid item xs={12} sm={9}>
								{children}
							</Grid>
						</Grid>
					</Container>
				</Box>
				<Footer />
			</Box>
		</Auth>
	)
}

import { Box, Button, Container, Typography } from '@material-ui/core'
import { SubLayout } from 'components/Layout'

const NotFound = () => (
	<SubLayout>
		<Box
			sx={{
				backgroundColor: 'background.default',
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				justifyContent: 'center',
			}}
		>
			<Container maxWidth="md">
				<Typography align="center" color="textPrimary" variant="h6">
					Không tìm thấy trang...
				</Typography>
				<Box
					sx={{
						textAlign: 'center',
					}}
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<img
						alt="Under development"
						src="/images/static/undraw_page_not_found_su7k.svg"
						style={{
							margin: '20px 0',
							display: 'inline-block',
							maxWidth: '100%',
							width: 560,
						}}
					/>
				</Box>
				<Box
					sx={{
						textAlign: 'center',
					}}
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Button
						onClick={() => {
							window.history.back()
						}}
						variant="contained"
						color="primary"
					>
						Trở lại
					</Button>
				</Box>
			</Container>
		</Box>
	</SubLayout>
)

export default NotFound

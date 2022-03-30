import { Box, Button, Grid, Typography } from '@material-ui/core'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import { useData } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { SubLayout } from 'components/Layout'

const tokenLocal = localStorage.getItem('token')

export default function CheckEmailForget() {
	const classes = useStyles()
	const history = useHistory()
	const state = useContext(UserContext)
	const { data } = useData()

	const [email, setEmail] = useState(null)

	const [token] = state.token
	const [patchCart] = state.patchCart

	useEffect(() => {
		if (token && patchCart) {
			history.push('/cart')
		} else if (tokenLocal || token) {
			history.push('/')
		}
	}, [token, history, patchCart])

	useEffect(() => {
		if (Object.keys(data).length === 0) {
			history.push('/login')
		} else setEmail(data.value)
		// eslint-disable-next-line
	}, [data])

	return (
		<SubLayout>
			<Grid container className={classes.root}>
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} elevation={6} className={classes.pageCenter}>
					<div className={classes.paper}>
						<Box m="1rem auto">
							<ContactMailIcon color="primary" className={classes.iconEmail} />
						</Box>
						<Typography variant="h5" align="center">
							<b>Kiểm tra email</b>
						</Typography>
						<Box m="2rem auto">
							<Typography variant="body1" align="center">
								Chúng tôi đã gửi hướng dẫn lấy lại mật khẩu vào email <b>{email}</b>
							</Typography>
						</Box>
						<Box m="1rem auto">
							<a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noreferrer">
								<Button variant="contained" color="primary">
									Mở ứng dụng email
								</Button>
							</a>
						</Box>
						<Box m="3rem auto 1rem" maxWidth="20rem" display="flex">
							<Typography variant="body2" align="center">
								Chưa nhận được email? Kiểm tra mục spam, hoặc{' '}
								<Link to="/recover" style={{ color: '#f50057' }}>
									<strong>thử lại với email khác</strong>
								</Link>
							</Typography>
						</Box>
					</div>
				</Grid>
			</Grid>
		</SubLayout>
	)
}

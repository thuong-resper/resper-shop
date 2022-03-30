import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, Grid, InputAdornment, Typography } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { Form } from 'components/Form/Form'
import { Input } from 'components/Input/Input'
import { SignupBtn } from 'components/UI/Button/Button'
import { useData } from 'contexts/DataContext'
import { UserContext } from 'contexts/UserContext'
import { postForgotPassword } from 'features/User/pathAPI'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useStyles } from './styles'
import './styles.css'
import { SubLayout } from 'components/Layout'
import { closeSnackbar } from 'features/User/UserSlice.js'

//yup validation
const schema = yup.object().shape({
	email: yup.string().email('Email should have correct format').required('Email is required field'),
})

const tokenLocal = localStorage.getItem('token')

const ForgetForm = ({ location }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const { enqueueSnackbar } = useSnackbar()

	const state = useContext(UserContext)
	const { data, setValues } = useData()

	const [token] = state.token
	const [patchCart] = state.patchCart

	const { isSuccess, isError, message } = useSelector((state) => state.user)
	useEffect(() => {
		message.length > 0 && enqueueSnackbar(message, { variant: isSuccess ? 'success' : 'error' })
		dispatch(closeSnackbar())
	}, [message, isError, isSuccess])

	const actionPostForgotPassword = (email) => dispatch(postForgotPassword(email))

	//useEffect
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
		if (token && patchCart) {
			history.push('/')
		}
		document.getElementById('email').addEventListener('blur', (e) => {
			let email = e.target.value.toLowerCase()
			setValue('email', email)
		}) // eslint-disable-next-line
	}, [tokenLocal, token])

	// form
	const {
		register,
		setValue,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: data.value,
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const { isSubmitting } = useFormState({ control })
	const onSubmit = async (value) => {
		if (value) {
			setValues({ value: value.email })
			actionPostForgotPassword(value)
		}
	}

	return (
		<SubLayout>
			<Grid container className={classes.root}>
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} elevation={6} className={classes.pageCenter}>
					<Box className={classes.paper}>
						<Typography variant="h5">
							<b>Đặt lại mật khẩu</b>
						</Typography>
						<Typography variant="body1" style={{ marginTop: '1rem' }}>
							Nhập email được liên kết với tài khoản và chúng tôi sẽ gửi email kèm theo hướng dẫn để
							đặt lại mật khẩu.
						</Typography>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Input
								{...register('email')}
								id="email"
								type="text"
								placeholder="Email"
								name="email"
								error={!!errors.email}
								helperText={errors?.email?.message}
								disabled={isSubmitting}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<MailOutlineIcon color="disabled" />
										</InputAdornment>
									),
								}}
							/>

							<Box position="relative">
								<SignupBtn disabled={isSubmitting}>Gửi hướng dẫn</SignupBtn>
								{isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
							</Box>
						</Form>
						{/* sign up */}
						<Box display="flex" justifyContent="center">
							<Typography variant="body2">Chưa phải thành viên?&nbsp;</Typography>
							<Link to="/register">
								<Typography variant="body2" color="secondary">
									<b>Đăng ký</b>
								</Typography>
							</Link>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</SubLayout>
	)
}

export default ForgetForm

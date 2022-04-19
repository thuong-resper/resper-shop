import { yupResolver } from '@hookform/resolvers/yup'
import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	InputAdornment,
	Typography,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { unwrapResult } from '@reduxjs/toolkit'
import { Form } from 'components/Form/Form'
import { Input } from 'components/Input/Input'
import { LogInBtn } from 'components/UI/Button/Button'
import { useData } from 'contexts/DataContextProvider.js'
import { loginGoogle, loginUser } from 'features/User/pathAPI'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useForm, useFormState } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { useStyles } from './styles'
import './styles.css'
import { SubLayout } from 'components/Layout'
import { UserContext } from 'contexts/index.js'
import { closeSnackbar } from 'features/User/UserSlice.js'

const schema = yup.object().shape({
	email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
	password: yup.string().required('Vui lòng nhập mật khẩu'),
})

const googleClientId = '97775254401-l7nq4tc328dgqvb20ru95acl3pqn4quv.apps.googleusercontent.com'
const tokenLocal = localStorage.getItem('token')

const LoginPage = ({ location }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	const { enqueueSnackbar } = useSnackbar()

	const state = useContext(UserContext)
	const { setValues, data } = useData()

	const [token, setToken] = state.token
	const [, setUser] = state.user
	const [, setIdUser] = state.idUser
	const componentMounted = useRef(true)

	const { isSuccess, isError, message } = useSelector((state) => state.user)
	useEffect(() => {
		message.length > 0 && enqueueSnackbar(message, { variant: isSuccess ? 'success' : 'error' })
		return () => {
			dispatch(closeSnackbar())
			componentMounted.current = false
		}
	}, [message, isError, isSuccess])

	const redirect = location.search ? location.search.slice(location.search.indexOf('=') + 1) : '/'

	useEffect(() => {
		if (tokenLocal || token) {
			history.push(redirect)
		}
		document.getElementById('email').addEventListener('blur', (e) => {
			let email = e.target.value.toLowerCase()
			setValue('email', email)
		}) // eslint-disable-next-line
	}, [tokenLocal, token])

	const handleForget = () => {
		history.push('./recover')
		const value = getValues('email')
		if (value) {
			setValues({ value: value })
		}
	}

	// form
	const {
		register,
		setValue,
		getValues,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: data.email,
			password: data.password,
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const { isSubmitting } = useFormState({ control })

	// submit form
	const onSubmit = async (values) => {
		const data = {
			email: values.email.toLowerCase().trim(),
			password: values.password,
		}
		const resultLogin = await dispatch(loginUser(data))
		const currentUser = unwrapResult(resultLogin)
		if (currentUser) {
			setToken(currentUser.accessToken)
			setUser(currentUser.user)
			setIdUser(currentUser.user._id)
		}
		if (values) {
			setValues(values)
		}
	}

	// login with Google
	const responseGoogle = async (response) => {
		const { tokenId } = response
		try {
			const resultLogin = await dispatch(loginGoogle(tokenId))
			const currentUser = unwrapResult(resultLogin)
			if (currentUser) {
				setToken(currentUser.accessToken)
				setUser(currentUser.user)
				setIdUser(currentUser.user._id)
			}
		} catch (err) {}
	}

	//hide and show password field
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev)
	}
	const handleMouseDownPassword = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<SubLayout>
			<Grid container className={classes.root}>
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} elevation={6} className={classes.pageCenter}>
					<Box className={classes.paper}>
						<Typography variant="h5">
							<strong>Đăng nhập</strong>
						</Typography>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Input
								{...register('email')}
								id="email"
								type="text"
								placeholder="Email"
								autoComplete="username"
								name="email"
								size="medium"
								error={!!errors.email}
								helperText={errors?.email?.message}
								disabled={isSubmitting}
							/>
							<Input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								id="password"
								placeholder="Mật khẩu"
								autoComplete="current-password"
								name="password"
								size="medium"
								error={!!errors.password}
								helperText={errors?.password?.message}
								disabled={isSubmitting}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? (
													<Visibility fontSize="small" />
												) : (
													<VisibilityOff fontSize="small" />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<Box position="relative">
								<LogInBtn disabled={isSubmitting}>Đăng nhập</LogInBtn>
								{isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
							</Box>
						</Form>
						<Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
							<Typography variant="body2" onClick={handleForget} style={{ cursor: 'pointer' }}>
								Quên mật khẩu?
							</Typography>
							{/* sign up */}
							<Box display="flex">
								<Typography variant="body2">Chưa phải thành viên?&nbsp;</Typography>
								<Link to="/register">
									<Typography variant="body2" color="secondary">
										<b>Đăng ký</b>
									</Typography>
								</Link>
							</Box>
						</Box>
						<Grid container direction="column" justify="center" alignItems="center">
							<Box mt={3}>
								<Typography variant="body1">Đăng nhập với</Typography>
							</Box>
							<Box mt={3}>
								<GoogleLogin
									className="btn-google-login"
									clientId={googleClientId}
									onSuccess={responseGoogle}
									cookiePolicy={'single_host_origin'}
									buttonText={false}
									icon={true}
								/>
							</Box>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</SubLayout>
	)
}

export default LoginPage

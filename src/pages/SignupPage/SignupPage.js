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
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { Form } from 'components/Form/Form'
import { Input } from 'components/Input/Input'
import { SignupBtn } from 'components/UI/Button/Button'
import { useData } from 'contexts/DataContextProvider.js'
import { registerUser } from 'features/User/pathAPI'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef, useState } from 'react'
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
	firstName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Mật khẩu phải có ít nhất 1 chữ số')
		.required('Vui lòng nhập họ')
		.min(2, 'Tên quá ngắn'),
	lastName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Mật khẩu phải có ít nhất 1 chữ số')
		.required('Vui lòng nhập tên'),
	email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
	password: yup
		.string()
		.required('Vui lòng nhập mật khẩu')
		.min(6, 'Mật khẩu phải có nhất nhất 6 ký tự')
		.matches(/(?=.*[0-9])/, 'Mật khẩu phải có ít nhất 1 chữ số'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp')
		.required('Vui lòng nhập xác nhận mật khẩu'),
})

const tokenLocal = localStorage.getItem('token')

const SignupPage = ({ location }) => {
	const classes = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()

	const { setValues, data } = useData()
	const componentMounted = useRef(true)

	const actionRegisterAccount = (account) => dispatch(registerUser(account))

	//store
	const { loading, isSuccess, isError, message } = useSelector((state) => state.user)
	useEffect(() => {
		message.length > 0 && enqueueSnackbar(message, { variant: isSuccess ? 'success' : 'error' })
		return () => {
			dispatch(closeSnackbar())
			componentMounted.current = false
		}
	}, [message, isError, isSuccess])

	useEffect(() => {
		if (tokenLocal) {
			history.push('/')
		}
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
		document.getElementById('email').addEventListener('blur', (e) => {
			let email = e.target.value.toLowerCase()
			setValue('email', email)
		}) // eslint-disable-next-line
	}, [tokenLocal, history])

	const onSubmit = async (values) => {
		const fullName = await (values.firstName + ' ' + values.lastName)
		const data = {
			name: fullName,
			email: values.email.toLowerCase().trim(),
			password: values.password,
		}
		if (values) {
			setValues(values)
			actionRegisterAccount(data)
		}
	}

	//hide and show password field
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev)
	}
	const handleMouseDownPassword = () => {
		setShowPassword((prev) => !prev)
	}
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword((prev) => !prev)
	}
	const handleMouseDownConfirmPassword = () => {
		setShowConfirmPassword((prev) => !prev)
	}

	const {
		register,
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			passwordConfirmation: data.passwordConfirmation,
		},
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const { isSubmitting } = useFormState({ control })

	return (
		<SubLayout>
			<Grid container className={classes.root}>
				{loading && <SimpleBackdrop />}
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} elevation={6} className={classes.pageCenter}>
					<Box className={classes.paper}>
						<Typography variant="h5">
							<strong>Đăng ký</strong>
						</Typography>
						<Typography variant="body1">Rất dễ dàng và nhanh chóng!</Typography>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<div className={classes.spacing}>
								<Input
									{...register('firstName')}
									id="firstName"
									type="text"
									placeholder="Họ"
									name="firstName"
									fullWidth={false}
									error={!!errors.firstName}
									helperText={errors?.firstName?.message}
									disabled={isSubmitting}
								/>
								<Input
									{...register('lastName')}
									id="lastName"
									type="text"
									placeholder="Tên"
									name="lastName"
									fullWidth={false}
									error={!!errors.lastName}
									helperText={errors?.lastName?.message}
									disabled={isSubmitting}
								/>
							</div>
							<Input
								{...register('email')}
								id="email"
								type="text"
								placeholder="Email"
								name="email"
								error={!!errors.email}
								helperText={errors?.email?.message}
								disabled={isSubmitting}
							/>
							<Input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								id="password"
								placeholder="Mật khẩu"
								name="password"
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
							<Input
								{...register('passwordConfirmation')}
								type={showConfirmPassword ? 'text' : 'password'}
								id="passwordConfirmation"
								placeholder="Xác nhận mật khẩu"
								name="passwordConfirmation"
								error={!!errors.passwordConfirmation}
								helperText={errors?.passwordConfirmation?.message}
								disabled={isSubmitting}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowConfirmPassword}
												onMouseDown={handleMouseDownConfirmPassword}
											>
												{showConfirmPassword ? (
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
								<SignupBtn disabled={isSubmitting}>Đăng ký</SignupBtn>
								{isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
							</Box>
						</Form>
						<Box mt={3} display="flex" justifyContent="center">
							<Typography variant="body2">Đã có tài khoản?&nbsp;</Typography>
							<Link to="/login">
								<Typography variant="body2" color="secondary">
									<b> Đăng nhập </b>
								</Typography>
							</Link>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</SubLayout>
	)
}

export default SignupPage

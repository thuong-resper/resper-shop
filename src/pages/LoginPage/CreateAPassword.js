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
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { Form } from 'components/Form/Form'
import { Input } from 'components/Input/Input'
import { SignupBtn } from 'components/UI/Button/Button'
import { UserContext } from 'contexts/UserContext'
import { putResetPassword } from 'features/User/pathAPI'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { useStyles } from './styles'
import './styles.css'
import { SubLayout } from 'components/Layout'
import { closeSnackbar } from 'features/User/UserSlice.js'

//yup validation
const schema = yup.object().shape({
	password: yup
		.string()
		.required('Vui lòng nhập mật khẩu')
		.min(6, 'Mật khẩu cần ít nhất 6 ký tự')
		.matches(/(?=.*[0-9])/, 'Mật khẩu phải có ít nhất 1 chữ số'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Mật khẩu không trùng nhau')
		.required('Vui lòng nhập xác nhận mật khẩu'),
})

const CreateAPassword = () => {
	const classes = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const { accessToken } = useParams()
	const { enqueueSnackbar } = useSnackbar()

	const state = useContext(UserContext)
	// create
	const [token, setToken] = state.token
	const [, setUser] = state.user
	const [, setIdUser] = state.idUser
	const [patchCart] = state.patchCart

	//store
	const { loading, isSuccess, isError, message, isAdmin } = useSelector((state) => state.user)
	useEffect(() => {
		message.length > 0 && enqueueSnackbar(message, { variant: isSuccess ? 'success' : 'error' })
		dispatch(closeSnackbar())
	}, [message, isError, isSuccess])

	// useEffect
	useEffect(() => {
		if (token && patchCart) {
			history.push(patchCart)
		}
		if (isAdmin && token) {
			history.push('/admin/dashboard')
		} else {
			history.push('/')
		}
		// eslint-disable-next-line
	}, [accessToken, token])

	const onSubmit = async (value) => {
		if (value && accessToken) {
			const data = { password: value.password.trim(), accessToken: accessToken }
			const actionResult = await dispatch(putResetPassword(data))
			const currentUser = unwrapResult(actionResult)
			if (currentUser) {
				setToken(currentUser.token)
				setUser(currentUser.user)
				setIdUser(currentUser.user._id)
			}
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
		control,
		formState: { errors },
	} = useForm({
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
						<Typography variant="h5" gutterBottom>
							<strong>Tạo mật khẩu mới</strong>
						</Typography>
						<Typography variant="body1">
							Mật khẩu mới cần khác với mật khẩu trước đó của bạn.
						</Typography>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								id="password"
								placeholder="Mật khẩu mới"
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
								<SignupBtn disabled={isSubmitting}>Xác nhận</SignupBtn>
								{isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
							</Box>
						</Form>
					</Box>
				</Grid>
			</Grid>
		</SubLayout>
	)
}

export default CreateAPassword

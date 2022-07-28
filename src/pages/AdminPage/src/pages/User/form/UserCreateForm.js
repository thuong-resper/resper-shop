import React, { useEffect, useState } from 'react'
import { Controller, useForm, useFormState } from 'react-hook-form'
import {
	Box,
	Button,
	CircularProgress,
	FormControlLabel,
	Grid,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	Tooltip,
	Typography,
} from '@material-ui/core'
import { BasicInput } from 'components/Input/Input'
import { Form } from 'components/Form/Form'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import './user-form.css'
import AvatarUpload from 'pages/AdminPage/src/pages/User/form/AvatarUpload'
import { gender } from 'staticOptions'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { useUserUpdate } from 'features/User'
import { useSnackbar } from 'notistack'
import Iconify from 'components/Iconify'
import { AddressDialog } from 'components/Dialog'
import { PaymentOptions } from 'components/Tab'

const defaultValues = {
	name: '',
	email: '',
	phone: '',
	gender: 'Nam',
	dob: '01/01/1990',
}

const defaultImgUrl =
	'https://res.cloudinary.com/dfxk0fqfp/image/upload/v1626342034/watchshopstorage/default-avatar-profile-icon-vector-social-media-user-portrait-176256935_qy5m6a.jpg'

function GridItem({ children }) {
	return (
		<Grid item xs={12}>
			{children}
		</Grid>
	)
}

const UserCreateForm = ({ user }) => {
	const { enqueueSnackbar } = useSnackbar()
	const [avatar, setAvatar] = useState(user?.avatar && defaultImgUrl)
	const [openAddressForm, setOpenAddressForm] = useState(false)

	const mutation = useUserUpdate((o, n) => Object.assign(o, n))

	const {
		handleSubmit,
		reset,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues,
	})
	const { isSubmitting } = useFormState({ control })

	useEffect(() => {
		if (user) {
			const fields = ['name', 'email', 'phone', 'gender', 'dob']
			fields.forEach((field) => setValue(field, user[field]))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onClose = () => {
		setOpenAddressForm(false)
	}

	const onSubmit = async (values) => {
		try {
			await mutation.mutateAsync(values)
		} catch (e) {
			enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
		}
	}

	return (
		<>
			{mutation.isLoading && <SimpleBackdrop />}

			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Paper>
						<Box padding={2} display="flex" justifyContent="center" flexDirection="column">
							<AvatarUpload avatar={avatar} setAvatar={setAvatar} />
							<Typography variant="caption" className="avatar-note">
								Cho phép *.jpeg, *.jpg, *.png, *.gif dung lượng tối đa 3.1 MB
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
						<Paper>
							<Box padding={2}>
								<Grid container spacing={2}>
									<GridItem>
										<Controller
											control={control}
											name="name"
											render={({ field }) => (
												<BasicInput
													{...field}
													placeholder="Họ và tên"
													label="Họ và tên"
													error={!!errors.name?.message}
													helperText={errors.name?.message}
												/>
											)}
										/>
									</GridItem>
									<GridItem>
										<Controller
											control={control}
											name="email"
											render={({ field }) => (
												<BasicInput
													{...field}
													placeholder="Email"
													label="Email"
													disabled
													error={!!errors.email?.message}
													helperText={errors.email?.message}
												/>
											)}
										/>
									</GridItem>
									<GridItem>
										<Controller
											control={control}
											name="phone"
											render={({ field }) => (
												<BasicInput
													{...field}
													placeholder="Số điện thoại"
													label="Số điện thoại"
													disabled
													error={!!errors.phone?.message}
													helperText={errors.phone?.message}
												/>
											)}
										/>
									</GridItem>
									<GridItem>
										<Typography>Giới tính</Typography>
										<Controller
											control={control}
											name="gender"
											render={({ field }) => (
												<RadioGroup row {...field}>
													{gender.map((v, i) => (
														<FormControlLabel
															key={i}
															value={v.value}
															control={<Radio color="primary" />}
															label={v.label}
														/>
													))}
												</RadioGroup>
											)}
										/>
									</GridItem>
									<GridItem>
										<Controller
											control={control}
											name="dob"
											render={({ field }) => (
												<KeyboardDatePicker
													variant="inline"
													inputVariant="outlined"
													label="Ngày sinh"
													size="small"
													value={field.value}
													onChange={(date) => {
														field.onChange(date)
													}}
													autoOk
													format="DD/MM/yyyy"
													fullWidth
												/>
											)}
										/>
									</GridItem>
									<GridItem>
										<Box display="flex" justifyContent="space-between" alignItems="center">
											<Typography variant="h6" gutterBottom>
												Địa chỉ của tôi
											</Typography>
											<Tooltip title={user ? 'Thay đổi' : 'Tạo mới'}>
												<IconButton onClick={() => setOpenAddressForm(true)}>
													<Iconify
														icon={user ? 'eva:edit-2-fill' : 'carbon:add'}
														width="1.5rem"
														height="1.5rem"
														color="#2065d1"
													/>
												</IconButton>
											</Tooltip>
										</Box>
										{user?.address && (
											<Typography>
												<b>{`${user?.address.name} - ${user?.address.phoneNumber}`}</b>
												{` - ${user?.address.address} - ${user?.address.commune} - ${user?.address.district} - ${user?.address.city}`}
											</Typography>
										)}
									</GridItem>
									<GridItem>
										<PaymentOptions user={user} />
									</GridItem>
									<Grid item xs={12}>
										<Box textAlign="end">
											<Button
												type="submit"
												variant="contained"
												color="primary"
												disabled={isSubmitting}
												endIcon={isSubmitting && <CircularProgress size={16} />}
											>
												Lưu
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Paper>
					</Form>
					<AddressDialog open={openAddressForm} onClose={onClose} address={user.address || null} />
				</Grid>
			</Grid>
		</>
	)
}

export default UserCreateForm

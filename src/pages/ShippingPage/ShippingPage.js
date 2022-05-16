import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import clsx from 'clsx'
import CheckoutSteps from 'components/Checkout/CheckoutSteps'
import { Form } from 'components/Form/Form'
import { Input } from 'components/Input/Input'
import { MainLayout } from 'components/Layout'
import SEO from 'components/SEO/SEO'
import { SignupBtn } from 'components/UI/Button/Button.js'
import dataCity from 'data.json'
import { saveAddressAndPayment } from 'features/Cart/CartSlice'
import { saveUserAddressAPI } from 'features/Cart/pathAPI'
import React, { useContext, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { paymentOptions } from 'staticOptions'
import * as yup from 'yup'
import { UserContext } from 'contexts'
import SimpleBackdrop from 'components/Backdrop/Backdrop'

const useStyles = makeStyles((theme) => ({
	layout: {
		width: 'auto',
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},

	title: { margin: '1rem 0' },

	form: {
		width: 270,
		[theme.breakpoints.down('sm')]: {
			width: '100%',
		},
	},

	f_right: {
		float: 'right',
		[theme.breakpoints.down('sm')]: {
			float: 'none',
		},
	},
}))

const schema = yup.object().shape({
	name: yup.string().required('Vui lòng nhập họ và tên'),
	numberPhone: yup.string().required('Vui lòng nhập số điện thoại'),
	city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
	district: yup.string().required('Vui lòng chọn quận/huyện'),
	commune: yup.string().required('Vui lòng chọn phường/xã/thị trấn'),
	street: yup.string().required('Vui lòng chọn nhập số nhà/tên đường'),
	payment: yup.string().required('Vui lòng chọn phương thức thanh toán'),
})

const defaultValues = {
	name: '',
	city: '',
	district: '',
	commune: '',
	street: '',
	numberPhone: '',
	payment: '',
}

const ShippingPage = () => {
	const history = useHistory()
	const classes = useStyles()
	const state = useContext(UserContext)
	const [token] = state.token

	if (!token) {
		history.push('/login?redirect=shipping')
	}

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: defaultValues,
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})
	const { isSubmitting } = useFormState({ control })

	const dispatch = useDispatch()
	const actionSaveAddress = (data) => dispatch(saveUserAddressAPI(data))
	const actionSaveAddressAndPayment = (data) => dispatch(saveAddressAndPayment(data))

	const [loading, setLoading] = useState(false)
	const [city, setCity] = useState([])
	const [district, setDistrict] = useState([])

	const onChangeCity = (city) => {
		setCity(city)
	}
	const onChangeDistrict = (district) => {
		setDistrict(district)
	}

	const onSubmit = async (values) => {
		setLoading(true)
		const { name, city, district, commune, street, numberPhone, payment } = values
		const data = {
			address: `${name} - ${numberPhone} - ${street} - ${commune} - ${district} - ${city}`,
			paymentMethod: payment,
		}
		// save shipping & paymentMethod to redux
		actionSaveAddressAndPayment(data)
		const res = await actionSaveAddress(data)
		if (res) {
			setLoading(false)
			history.push('/placeorder')
			reset({ defaultValues })
		}
	}

	return (
		<MainLayout>
			<SEO
				pageTitle={'Địa chỉ nhận hàng'}
				pageDescription={'Địa chỉ nhận hàng'}
				pageUrl={`${process.env.REACT_APP_CLIENT_URL}/shipping`}
			/>
			{loading && <SimpleBackdrop />}
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<CheckoutSteps step1 step2 />
					<Typography variant="h6" className={classes.title}>
						Địa chỉ và phương thức thanh toán
					</Typography>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Input
							{...register('name')}
							id="name"
							type="text"
							placeholder="Họ và tên"
							name="name"
							className={classes.form}
							error={!!errors.name}
							helperText={errors?.name?.message}
							disabled={isSubmitting}
						/>
						<Input
							{...register('numberPhone')}
							id="numberPhone"
							type="number"
							placeholder="Số điện thoại"
							name="numberPhone"
							className={clsx(classes.form, classes.f_right)}
							error={!!errors.numberPhone}
							helperText={errors?.numberPhone?.message}
							disabled={isSubmitting}
						/>
						<Autocomplete
							id="city"
							options={dataCity}
							getOptionLabel={(option) => option.name}
							onChange={(event, value) => onChangeCity(value)}
							autoHighlight
							renderInput={(params) => (
								<Input
									{...params}
									{...register('city')}
									id="city-input"
									type="text"
									placeholder="Tỉnh/thành phố"
									name="city"
									fullWidth={true}
									size="small"
									error={!!errors.city}
									helperText={errors?.city?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
						<Autocomplete
							id="district"
							options={city?.huyen ? city.huyen : []}
							getOptionLabel={(option) => option.name}
							noOptionsText={'Vui lòng chọn tỉnh/thành phố'}
							onChange={(event, value) => onChangeDistrict(value)}
							autoHighlight
							renderInput={(params) => (
								<Input
									{...params}
									{...register('district')}
									id="district-input"
									type="text"
									placeholder="Quận/huyện"
									name="district"
									fullWidth={true}
									size="small"
									error={!!errors.district}
									helperText={errors?.district?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
						<Autocomplete
							id="commune"
							options={district?.xa ? district.xa : []}
							getOptionLabel={(option) => option.name}
							noOptionsText={'Vui lòng chọn quận/huyện'}
							autoHighlight
							renderInput={(params) => (
								<Input
									{...params}
									{...register('commune')}
									id="commune-input"
									type="text"
									placeholder="Phường/xã/thị trấn"
									name="commune"
									fullWidth={true}
									size="small"
									error={!!errors.commune}
									helperText={errors?.commune?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
						<Input
							{...register('street')}
							id="street"
							type="text"
							placeholder="Số nhà/tên đường"
							name="street"
							multiline
							rows={4}
							fullWidth={true}
							error={!!errors.street}
							helperText={errors?.street?.message}
							disabled={isSubmitting}
						/>
						<Autocomplete
							id="payment"
							options={paymentOptions}
							getOptionLabel={(option) => option.label}
							getOptionDisabled={(option) =>
								option === paymentOptions[2] ||
								option === paymentOptions[3] ||
								option === paymentOptions[4]
							}
							autoHighlight
							renderInput={(params) => (
								<Input
									{...params}
									{...register('payment')}
									id="payment-input"
									type="text"
									placeholder="Phương thức thanh toán"
									name="payment"
									fullWidth={true}
									size="small"
									error={!!errors.payment}
									helperText={errors?.payment?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
						<Box position="relative">
							<SignupBtn disabled={isSubmitting}>Tiếp tục</SignupBtn>
						</Box>
					</Form>
				</Paper>
			</main>
		</MainLayout>
	)
}

export default ShippingPage

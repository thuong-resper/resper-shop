import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import { Box, Button, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Form } from 'components/Form/Form'
import { BasicInput } from 'components/Input/Input'
import dataCity from 'data.json'
import React, { useEffect, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useUserUpdate } from 'features/User'
import SimpleBackdrop from 'components/Backdrop/Backdrop'

const schema = yup.object().shape({
	name: yup.string().required('Vui lòng nhập họ và tên'),
	phoneNumber: yup.string().required('Vui lòng nhập số điện thoại'),
	city: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
	district: yup.string().required('Vui lòng chọn quận/huyện'),
	commune: yup.string().required('Vui lòng chọn phường/xã/thị trấn'),
	address: yup.string().required('Vui lòng chọn nhập số nhà/tên đường'),
})

const FormAddress = ({ address, onCloseForm }) => {
	const { enqueueSnackbar } = useSnackbar()

	const mutation = useUserUpdate((o, n) => Object.assign(o, { address: n.address }))

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	})
	const { isSubmitting } = useFormState({ control })

	useEffect(() => {
		if (address) {
			const fields = ['name', 'phoneNumber', 'city', 'district', 'commune', 'address']
			fields.forEach((field) => setValue(field, address[field]))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [cityUser, setCityUser] = useState('')
	const [districtUser, setDistrictUser] = useState('')

	const onChangeCity = (city) => {
		setCityUser(city)
	}
	const onChangeDistrict = (district) => {
		setDistrictUser(district)
	}

	const onSubmit = async (values) => {
		try {
			const data = {
				address: values,
			}
			await mutation.mutateAsync(data)
			onCloseForm()
		} catch (e) {
			enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
		}
	}

	return (
		<Box>
			{mutation.isLoading && <SimpleBackdrop />}
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<BasicInput
							{...register('name')}
							margin="dense"
							placeholder="Họ và tên"
							label="Họ và tên"
							error={!!errors.name?.message}
							helperText={errors.name?.message}
							disabled={isSubmitting}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<BasicInput
							{...register('phoneNumber')}
							margin="dense"
							placeholder="Số điện thoại"
							label="Số điện thoại"
							error={!!errors.phoneNumber?.message}
							helperText={errors.phoneNumber?.message}
							disabled={isSubmitting}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Autocomplete
							id="city"
							options={dataCity}
							getOptionLabel={(option) => option.name}
							onChange={(event, value) => onChangeCity(value)}
							autoHighlight
							renderInput={(params) => (
								<BasicInput
									{...params}
									{...register('city')}
									margin="dense"
									placeholder="Tỉnh/thành phố"
									label="Tỉnh/thành phố"
									error={!!errors.city?.message}
									helperText={errors.city?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Autocomplete
							id="district"
							options={cityUser?.huyen ? cityUser.huyen : []}
							getOptionLabel={(option) => option.name}
							noOptionsText={'Vui lòng chọn tỉnh/thành phố'}
							onChange={(event, value) => onChangeDistrict(value)}
							autoHighlight
							renderInput={(params) => (
								<BasicInput
									{...params}
									{...register('district')}
									margin="dense"
									placeholder="Quận/huyện"
									label="Quận/huyện"
									error={!!errors.district?.message}
									helperText={errors.district?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Autocomplete
							id="commune"
							options={districtUser?.xa ? districtUser.xa : []}
							getOptionLabel={(option) => option.name}
							noOptionsText={'Vui lòng chọn quận/huyện'}
							autoHighlight
							renderInput={(params) => (
								<BasicInput
									{...params}
									{...register('commune')}
									margin="dense"
									placeholder="Phường/xã/thị trấn"
									label="Phường/xã/thị trấn"
									error={!!errors.commune?.message}
									helperText={errors.commune?.message}
									disabled={isSubmitting}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<BasicInput
							{...register('address')}
							margin="dense"
							multiline
							rows={4}
							placeholder="Số nhà/tên đường"
							label="Số nhà/tên đường"
							error={!!errors.address?.message}
							helperText={errors.address?.message}
							disabled={isSubmitting}
						/>
					</Grid>
					<Grid item xs={12}>
						<Box textAlign="end" marginBottom="16px">
							<Button
								type="submit"
								variant="contained"
								color="primary"
								autoFocus
								disabled={isSubmitting}
							>
								Lưu
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Form>
		</Box>
	)
}

export default FormAddress

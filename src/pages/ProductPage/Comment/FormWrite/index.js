import { yupResolver } from '@hookform/resolvers/yup'
import { Button, CircularProgress } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import { Form } from 'components/Form/Form'
import { Input } from 'components/Input/Input'
import React, { useEffect, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import * as yup from 'yup'
import SimpleAlerts from 'components/UI/Alerts/Alerts'
import './style.css'

const labels = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
}

const schema = yup.object().shape({
	content: yup.string().max(700),
})

const styles = {
	rating: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
	root: { width: 200, display: 'flex', alignItems: 'center' },
}

export default function FormWrite({ infoProduct, token, user, socket }) {
	const [start, setStart] = useState(3)
	const [hover, setHover] = React.useState(-1)
	const [contentCmt, setContentCmt] = useState(0)
	const [isFormValid, setIsFormValid] = useState(true)
	const [idProduct, setIdProduct] = useState(null)

	useEffect(() => {
		if (socket && infoProduct) {
			setIdProduct(infoProduct._id)

			if (token) {
				socket.emit('waitWriteComment', { idProduct, message: 'Ai đó đang viết bình luận...' })
				socket.emit('waitWriteComment', { idProduct, message: '' })
			}
			socket.on('waitWriteComment', (msg) => {
				document.getElementById('waitWriteComment').innerHTML = msg
			})
		}
		return () => socket.off('waitWriteComment') // eslint-disable-next-line
	}, [contentCmt, token])

	const onChangeTextArea = (e) => {
		setContentCmt(e.target.value.length)
		if (e.target.value.trim() === '') {
			setIsFormValid(true)
		} else {
			setIsFormValid(false)
		}
	}

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	})

	const { isSubmitting } = useFormState({ control })

	const onSubmit = async (values) => {
		if (token) {
			socket.emit('userCreateComment', {
				id_product: idProduct,
				content: values.content.trim(),
				start,
				token: token,
				idUser: user._id,
			})
			setStart(0)
			setContentCmt(0)
			reset({})
		}
	}

	return (
		<>
			{token ? (
				<div className="group-form-comment">
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Box style={styles.rating}>
							<Box component="fieldset" style={styles.root}>
								<Rating
									name="simple-controlled"
									value={start}
									onChange={(e, newValue) => {
										setStart(newValue)
									}}
									onChangeActive={(event, newHover) => {
										setHover(newHover)
									}}
								/>
								{start !== null && <Box ml={2}>{labels[hover !== -1 ? hover : start]}</Box>}
							</Box>
							<div className="group-length-content">
								<p>{contentCmt}/700</p>
							</div>
						</Box>
						<Input
							{...register('content')}
							type="text"
							placeholder="Mời bạn chia sẻ cảm nhận ..."
							multiline
							rows={4}
							id="message"
							className="from-write"
							error={!!errors.content}
							helperText={errors?.content?.message}
							disabled={isSubmitting}
							onChange={onChangeTextArea}
						/>
						<Box position="relative">
							<Button disabled={isFormValid} type="submit" color="primary">
								Gửi đánh giá
							</Button>
							{isSubmitting && <CircularProgress size={24} />}
						</Box>
					</Form>
				</div>
			) : (
				<SimpleAlerts
					title="Đánh giá"
					message="Vui lòng đăng nhập để viết đánh giá"
					titleLink="Đăng nhập"
					to={`/login?redirect=product/${infoProduct._id}`}
				/>
			)}
		</>
	)
}

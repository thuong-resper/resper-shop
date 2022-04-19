import { Box, Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Autocomplete } from '@material-ui/lab'
import { useUpdateOrder } from 'features/Order/index.js'
import SimpleBackdrop from 'components/Backdrop/Backdrop'

const options = ['Chưa thực hiện', 'Đang xử lý', 'Đang vận chuyển', 'Đã hủy', 'Hoàn thành']

const OrderUpdated = ({ order, handleStatusChange }) => {
	const [status, setStatus] = useState(options[0])
	const [inputStatus, setInputStatus] = useState('')

	const updated = useUpdateOrder()

	const handleUpdateStatus = async () => {
		const data = {
			orderId: order._id,
			orderStatus: status,
		}
		updated.mutate(data)
	}

	return (
		<Box mt={1}>
			{updated.isLoading && <SimpleBackdrop />}
			<Typography variant="body1">Trạng thái</Typography>
			<Autocomplete
				value={status}
				onChange={(event, newValue) => {
					setStatus(newValue)
				}}
				inputValue={inputStatus}
				onInputChange={(event, newInputValue) => {
					setInputStatus(newInputValue)
				}}
				id="status"
				options={options}
				autoHighlight
				renderInput={(params) => (
					<TextField
						{...params}
						id="status-input"
						type="text"
						placeholder={order?.orderStatus}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						name="status"
						size="small"
					/>
				)}
			/>
			<Box m="0.5rem 0" textAlign="right">
				<Button variant="contained" color="primary" onClick={handleUpdateStatus}>
					Lưu
				</Button>
			</Box>
		</Box>
	)
}

export default OrderUpdated

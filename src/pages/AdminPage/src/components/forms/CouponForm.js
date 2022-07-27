import { Box, InputAdornment, TextField } from '@material-ui/core'
import React from 'react'

const CouponForm = ({ item, name, setName, discount, setDiscount, expiry, setExpiry }) => (
	<Box display="flex" flexDirection="column">
		<TextField
			value={name}
			size="small"
			onChange={(e) => setName(e.target.value)}
			placeholder="Mã coupon"
			variant="outlined"
		/>
		<TextField
			value={discount}
			size="small"
			style={{ margin: '8px 0' }}
			onChange={(e) => setDiscount(e.target.value)}
			placeholder="Giảm giá"
			type="number"
			variant="outlined"
			InputProps={{
				startAdornment: <InputAdornment position="start">%</InputAdornment>,
				inputProps: {
					max: 50,
					min: 0,
				},
			}}
		/>
		<TextField
			value={expiry}
			id="datetime-local"
			type="datetime-local"
			size="small"
			onChange={(e) => setExpiry(e.target.value)}
			variant="outlined"
		/>
	</Box>
)

export default CouponForm

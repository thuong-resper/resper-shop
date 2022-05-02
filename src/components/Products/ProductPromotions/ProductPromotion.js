import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { fVNDCurrency } from 'utils/formatNumber'

export const useStyles = makeStyles((theme) => ({
	promotionTagItem: {
		marginBottom: theme.spacing(1),
		position: 'relative',
		border: '1px solid #00000014',
		'& div': {
			width: '100%',
		},
	},

	top: { backgroundColor: '#f6f6f6', borderBottom: '1px solid #e0e0e0', padding: '8px 10px' },
	content: { padding: '8px 10px' },
}))

const ProductPromotion = ({ product }) => {
	const classes = useStyles()

	//get the expiry date of promotions
	function getExpiryDate(index) {
		let output = 0
		const days = 3 * (index + 1)
		const date = new Date()
		const d = new Date(date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000))
		const month = d.getMonth() + 1
		const day = d.getDate()
		output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month
		return output
	}

	const { promotions } = product
	return (
		<Box m="0.5rem 0">
			{promotions.map((item, index) => (
				<div className={classes.promotionTagItem} key={index}>
					<div
						className={classes.top}
					>{`Giá và khuyến mãi dự kiến áp dụng đến 23:59 ${getExpiryDate(index)}`}</div>
					<div className={classes.content}>
						{`Nhập mã ${item.name.substr(0, item.name.indexOf(' ')).toUpperCase()} giảm ${
							2 * (index + 1)
						}% tối đa ${fVNDCurrency(
							(index + 1) * 50000
						)} khi thanh toán bằng hình thức ${item.detail.toUpperCase()}`}
					</div>
				</div>
			))}
		</Box>
	)
}

export default ProductPromotion

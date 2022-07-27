import { withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { paymentOptions } from 'staticOptions'
import { useUserUpdate } from 'features/User'
import { useSnackbar } from 'notistack'
import SimpleBackdrop from 'components/Backdrop/Backdrop'

const PaymentTabs = withStyles({
	flexContainer: {
		flexWrap: 'wrap',
	},
	indicator: {
		display: 'none',
	},
})((props) => <Tabs {...props} />)

const PaymentTab = withStyles((theme) => ({
	root: {
		border: '1px solid',
		borderRadius: '4px',
		background: '#fff',
		textTransform: 'none',
		color: '#a7a7a7',
		whiteSpace: 'nowrap',
		minWidth: 72,
		margin: '0.5rem 0.25rem',
		minHeight: 'auto',
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover': {
			color: '#3f51b5',
			opacity: 1,
		},
		'&$selected': {
			color: '#3f51b5 !important',
			fontWeight: 600,
		},
		'&:focus': {
			color: '#000',
		},
	},
	selected: {},
}))((props) => <Tab {...props} />)

const getPaymentIndex = (array, value) => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].label === value) {
			return i
		}
	}
}

export function PaymentOptions({ user }) {
	const { enqueueSnackbar } = useSnackbar()
	const [payment, setPayment] = useState(0)

	useEffect(() => {
		if (user) {
			setPayment(getPaymentIndex(paymentOptions, user.paymentMethod))
		}
	}, [user])

	const mutation = useUserUpdate((o, n) => Object.assign(o, n))

	const handleChange = async (e, idx) => {
		try {
			if (payment !== idx) {
				const payment = { paymentMethod: paymentOptions[idx].label }
				await mutation.mutateAsync(payment)
				setPayment(idx)
			}
		} catch (e) {
			enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
		}
	}

	return (
		<Box>
			{mutation.isLoading && <SimpleBackdrop />}
			<Box>
				<Typography variant="h6" gutterBottom>
					Phương thức thanh toán
				</Typography>
			</Box>
			<PaymentTabs
				value={payment}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
			>
				{paymentOptions.map((p) => (
					<PaymentTab key={p.label} label={p.label} />
				))}
			</PaymentTabs>
		</Box>
	)
}

import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core'
import Iconify from 'components/Iconify'
import FormAddress from 'components/Form/FormAddress'
import React from 'react'
import { useWindowDimensions } from 'hooks'

export function AddressDialog({ open, onClose, address }) {
	const { width } = useWindowDimensions()
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="form-dialog-address"
			fullScreen={width < 600}
		>
			<DialogTitle id="form-dialog-title">
				{address ? `Cập nhật địa chỉ` : 'Thêm địa chỉ'}
				{onClose ? (
					<IconButton
						style={{
							position: 'absolute',
							right: 8,
							top: 8,
						}}
						onClick={onClose}
					>
						<Iconify icon={'carbon:close'} width="1.5rem" height="1.5rem" />
					</IconButton>
				) : null}
			</DialogTitle>

			<DialogContent style={{ flex: 'none' }}>
				<FormAddress address={address} onCloseForm={onClose} />
			</DialogContent>
		</Dialog>
	)
}

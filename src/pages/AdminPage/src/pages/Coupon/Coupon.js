import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	makeStyles,
	Typography,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import SimpleBackdrop from 'components/Backdrop/Backdrop'
import { clearState } from 'features/Admin/Category/CategorySlice'
import { createCoupon, deleteCoupon, getCoupons } from 'features/Admin/Coupon/pathAPI'
import moment from 'moment-timezone'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CouponForm from '../../components/forms/CouponForm'
import LocalSearch from '../../components/forms/LocalSearch'
import { UserContext } from 'contexts/index.js'
import { AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	item: {
		padding: '0.5rem',
		margin: '0.5rem 0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'relative',
		borderRadius: '0.5rem',
		backgroundColor: '#e8eaf6',
	},
	dialog: { minWidth: '400px' },
	itemBtn: { display: 'flex' },
	table: {
		minWidth: 650,
	},
}))

const Coupon = () => {
	// --Contexts
	const state = useContext(UserContext)
	const classes = useStyles()
	const dispatch = useDispatch()
	const [token] = state.token
	const { enqueueSnackbar } = useSnackbar()
	const [name, setName] = useState('')
	const [discount, setDiscount] = useState(0)
	const [expiry, setExpiry] = useState('2021-01-01T00:00')
	const [openDelete, setOpenDelete] = useState(false)
	const [couponId, setCouponId] = useState('')
	const [keyword, setKeyword] = useState('')

	// dispatch API
	const actionGetCoupons = () => dispatch(getCoupons(token))
	const actionCreateCoupon = (coupon, token) => dispatch(createCoupon(coupon, token))
	const actionDeleteCoupon = (couponId, token) => dispatch(deleteCoupon(couponId, token))

	//store
	const coupons = useSelector((state) => state.coupon.coupons)
	const isSuccess = useSelector((state) => state.coupon.isSuccess)
	const isError = useSelector((state) => state.coupon.isError)
	const message = useSelector((state) => state.coupon.message)
	const loading = useSelector((state) => state.coupon.loading)

	// snackbar
	useEffect(() => {
		return () => {
			dispatch(clearState())
		} // eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (isError) {
			enqueueSnackbar(message, { variant: 'error' })
			dispatch(clearState())
		}

		if (isSuccess) {
			enqueueSnackbar(message, { variant: 'success' })
			dispatch(clearState())
			actionGetCoupons()
		} // eslint-disable-next-line
	}, [isError, isSuccess])

	useEffect(() => {
		actionGetCoupons() // eslint-disable-next-line
	}, [])

	const handleClickDeleteOpen = (_id) => {
		setOpenDelete(true)
		setCouponId(_id)
	}

	const handleCloseDelete = () => {
		setOpenDelete(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const coupon = {
			name,
			discount,
			expiry,
		}
		actionCreateCoupon(coupon, token)
		actionGetCoupons()
		setName('')
		setDiscount('')
		setExpiry('')
	}

	const handleRemove = () => {
		actionDeleteCoupon(couponId, token)
		actionGetCoupons()
		handleCloseDelete()
	}

	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

	return (
		<AdminLayout>
			<SEO pageTitle={'Admin | Khuyến mãi'} />
			{loading && <SimpleBackdrop />}
			<main className={classes.content}>
				<Box display="flex" spacing={1}>
					<CouponForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
						discount={discount}
						setDiscount={setDiscount}
						expiry={expiry}
						setExpiry={setExpiry}
						title="Tạo mới voucher"
					/>
					<LocalSearch keyword={keyword} setKeyword={setKeyword} placeholder="Tên voucher" />
				</Box>

				{/* step 5 */}
				<Box m="0.5rem">
					<Typography variant="body1">Danh sách Voucher&nbsp;({coupons.length})</Typography>

					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Tên voucher</TableCell>
									<TableCell align="left">Ngày hết hạn</TableCell>
									<TableCell align="left">Giảm giá&nbsp;(%)</TableCell>
									<TableCell align="left">Hành động</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{coupons.length > 0 &&
									coupons.filter(searched(keyword)).map((c, index) => (
										<TableRow key={c.name}>
											<TableCell component="th" scope="row">
												{c.name}
											</TableCell>
											<TableCell align="left">
												{moment(c.expiry).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY HH:mm:ss')}
											</TableCell>
											<TableCell align="left">{c.discount}</TableCell>
											<TableCell align="left">
												<IconButton onClick={() => handleClickDeleteOpen(c._id)} size="small">
													<DeleteOutlineIcon color="secondary" />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>

					{/* Box delete */}
					<Box>
						<Dialog
							open={openDelete}
							onClose={handleCloseDelete}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">Xóa danh mục</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									Bạn có chắc chắn xóa?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCloseDelete} color="primary">
									Đóng
								</Button>
								<Button onClick={handleRemove} color="primary" autoFocus>
									Xác nhận
								</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</Box>
			</main>
		</AdminLayout>
	)
}

export default Coupon

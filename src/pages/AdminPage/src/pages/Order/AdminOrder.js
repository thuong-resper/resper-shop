import { Box, makeStyles, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Pagination } from '@material-ui/lab'
import moment from 'moment-timezone'
import queryString from 'query-string'
import React, { useContext, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from 'contexts/index.js'
import { AdminContent, AdminLayout } from 'components/Layout/index.js'
import SEO from 'components/SEO/SEO.js'
import SimpleBackdrop from 'components/Backdrop/Backdrop.js'
import { usePaginatedAdminOrders } from 'features/Admin/Order/index.js'

const columns = [
	{ field: 'id', headerName: 'ID đơn hàng' },
	{
		field: 'Ngày mua',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params) =>
			`${params.getValue(params.id, 'firstName') || ''} ${
				params.getValue(params.id, 'lastName') || ''
			}`,
	},
]

const useStyles = makeStyles((theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}))

const AdminOrder = ({ location }) => {
	const classes = useStyles()
	const formatter = new Intl.NumberFormat('vn')

	const divRef = useRef(null)
	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth' })
	})

	const state = useContext(UserContext)
	const history = useHistory()
	const [token] = state.token
	if (!token) {
		history.push('/login?redirect=admin/order')
	}

	const page = Number(queryString.parse(location.search).page) || 1
	const params = {
		limit: 20,
		page: page,
	}
	const { status, data, error, isFetching } = usePaginatedAdminOrders(params)

	const onChangePage = (page, newPage) => {
		const data = {
			page: newPage,
			limit: 20,
		}
		const params = queryString.stringify(data)
		const url = `/admin/order?${params}`
		history.push(url)
	}

	const showPagination = (length) => {
		if (length > 0) {
			return (
				<Box display="flex" justifyContent="end" width="100%" m="0.5rem 0">
					<Pagination
						variant="outlined"
						shape="rounded"
						count={Math.ceil(length / 20)}
						page={page}
						onChange={onChangePage}
					/>
				</Box>
			)
		}
	}

	return (
		<AdminLayout>
			<div ref={divRef} />
			<AdminContent>
				{status === 'loading' ? (
					<SimpleBackdrop />
				) : (
					<>
						{status === 'error' ? (
							<span>Error: {error.message}</span>
						) : (
							<>
								<SEO pageTitle={'Admin | Đơn hàng'} />
								<Box mb={4}>
									<Typography variant="h6">{`Đơn hàng (${data.length})`}</Typography>
								</Box>
								<TableContainer component={Paper}>
									<Table className={classes.table} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>Mã đơn hàng</TableCell>
												<TableCell align="left">Ngày mua</TableCell>
												<TableCell align="left">Sản phẩm</TableCell>
												<TableCell align="left">Tổng tiền</TableCell>
												<TableCell align="left">Trạng thái</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{data.orders.map((c) => (
												<TableRow key={c._id} hover>
													<TableCell component="th" scope="row">
														<Link
															style={{ color: '#007ff0', cursor: 'pointer' }}
															to={`/order/${c._id}`}
														>
															{c._id}
														</Link>
													</TableCell>
													<TableCell align="left">
														{moment(c.timeOrder).format('DD/MM/YYYY')}
													</TableCell>
													<TableCell align="left">
														{c?.products.map((p) => (
															<p key={p._id}>
																{p?.product.name}&nbsp;x&nbsp;{p.quantity}
															</p>
														))}
													</TableCell>
													<TableCell align="left">
														{formatter.format(c.totalPayable)}&nbsp;đ
													</TableCell>
													<TableCell align="left">{c.orderStatus}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
								{showPagination(data.length)}
							</>
						)}
					</>
				)}
				{isFetching ? <SimpleBackdrop /> : null}
			</AdminContent>
		</AdminLayout>
	)
}

export default AdminOrder

import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from 'components/SEO/SEO'
import { UserLayout } from 'components/Layout/UserLayout'
import { useGetUserOrders } from 'features/Order'
import { escapeRegExp } from 'utils/regex'
import { DataGrid } from '@mui/x-data-grid'
import SearchBar from 'components/Search/SearchBar'

function RowIdCell(props) {
	return (
		<Link style={{ color: '#007ff0', cursor: 'pointer' }} to={`/order/${props.row._id}`}>
			{props.row._id}
		</Link>
	)
}

function RowProductCell(props) {
	return props.row.products.map((p) => (
		<Box key={p._id}>
			{p.product.name}&nbsp;x&nbsp;{p.quantity}
		</Box>
	))
}

const columns = [
	{ field: '_id', headerName: 'ID', renderCell: RowIdCell },
	{
		field: 'products',
		headerName: 'Sản phẩm',
		minWidth: 300,
		renderCell: RowProductCell,
		sortable: false,
		filterable: false,
		disableColumnMenu: true,
		disableReorder: true,
	},
	{
		field: 'totalPayable',
		headerName: 'Tổng tiền',
		type: 'number',
		minWidth: 150,
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		field: 'timeOrder',
		headerName: 'Ngày mua',
		minWidth: 150,
		valueFormatter: ({ value }) => moment(value).format('DD/MM/YYYY'),
	},
	{
		field: 'orderStatus',
		headerName: 'Trạng thái',
		minWidth: 150,
	},
]

const UserOrders = ({ location }) => {
	const [rows, setRows] = useState([])
	const [searched, setSearched] = useState('')
	const [rowsState, setRowsState] = useState({
		page: 0,
		pageSize: 20,
	})
	const [rowCountState, setRowCountState] = useState(0)

	const params = {
		limit: rowsState.pageSize,
		page: rowsState.page,
	}

	const { isLoading, data, error } = useGetUserOrders(params)

	useEffect(() => {
		if (data) {
			setRows(data.orders)
			setRowCountState(data.length)
		}
	}, [data])

	const requestSearch = (searchedVal) => {
		setSearched(searchedVal)
		const searchRegex = new RegExp(escapeRegExp(searchedVal), 'i')
		const filteredRows = data.orders.filter((row) => {
			return Object.keys(row).some((field) => {
				return searchRegex.test(row[field].toString())
			})
		})
		setRows(filteredRows)
	}

	const cancelSearch = () => {
		setSearched('')
		requestSearch('')
	}

	return (
		<>
			<UserLayout>
				<SEO pageTitle={'Đơn hàng của tôi'} />
				{error ? (
					<span>Error: {error.message}</span>
				) : (
					<>
						<Box mb={4}>
							{isLoading ? (
								<Skeleton variant="rect" width={150} height={30} />
							) : (
								<Typography variant="h6">{`Đơn hàng (${data?.length})`}</Typography>
							)}
						</Box>
						<SearchBar
							value={searched}
							onChange={(searchVal) => requestSearch(searchVal)}
							onCancelSearch={() => cancelSearch()}
							placeholder="Tìm kiếm"
						/>
						<Box mt={2} width="100%">
							<DataGrid
								loading={isLoading}
								rows={rows}
								getRowId={(row) => row._id}
								columns={columns}
								rowCount={rowCountState}
								pagination
								{...rowsState}
								paginationMode="server"
								onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
								onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
								rowsPerPageOptions={[rowsState.pageSize]}
								componentsProps={{
									toolbar: {
										value: searched,
										onChange: (event) => requestSearch(event.target.value),
										clearSearch: () => requestSearch(''),
									},
								}}
								autoHeight
								hideFooterSelectedRowCount
							/>
						</Box>
					</>
				)}
			</UserLayout>
		</>
	)
}

export default UserOrders

import { createSlice } from '@reduxjs/toolkit'
import {
	createOrderAPI,
	deleteOrderAPI,
	getOrderByIdAPI,
	putOrderAddressesAPI,
	putPayOrderAPI,
	updateOrderStatus,
} from './pathAPI'

const OrderSlice = createSlice({
	name: 'order',
	initialState: {
		dataOrder: [],
		loading: false,
		isSuccess: false,
		isError: false,
		message: '',
		successPay: false,
	},
	reducers: {
		clearState: (state) => {
			state.isError = false
			state.isSuccess = false
			state.loading = false
			return state
		},
	},
	extraReducers: {
		// post cart API
		[createOrderAPI.pending]: (state) => {
			state.loading = true
		},
		[createOrderAPI.fulfilled]: (state, action) => {
			state.loading = false
			state.isSuccess = true
			state.message = 'Đặt hàng thành công'

			const { data } = action.payload
			state.dataOrder = data
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		},
		// get history cart user
		[getOrderByIdAPI.pending]: (state) => {
			state.loading = true
		},
		[getOrderByIdAPI.rejected]: (state, action) => {
			state.loading = false
		},
		[getOrderByIdAPI.fulfilled]: (state, action) => {
			state.loading = false
			state.dataOrder = action.payload
		},
		// upload data status oder cart
		[putPayOrderAPI.pending]: (state) => {
			state.loading = true
		},
		[putPayOrderAPI.rejected]: (state, action) => {
			state.loading = false
		},
		[putPayOrderAPI.fulfilled]: (state, action) => {
			const { data } = action.payload
			state.dataOrder = data
			state.loading = false
			state.isSuccess = true
			state.successPay = true
			state.message = 'Thanh toán thành công'
		},
		[putOrderAddressesAPI.pending]: (state) => {
			state.loading = true
		},
		[putOrderAddressesAPI.fulfilled]: (state, action) => {
			const { dataOrder } = state
			const id = action.payload.data[0]._id
			const cartReq = action.payload.data[0]
			const index = dataOrder.findIndex((cart) => cart._id === id)
			dataOrder[index] = cartReq
			state.isSuccess = true
			state.loading = false
			state.message = 'Đã cập nhật'
		},
		[putOrderAddressesAPI.rejected]: (state, action) => {
			state.loading = false
		},
		// delete cart
		[deleteOrderAPI.pending]: (state) => {
			state.loading = true
		},
		[deleteOrderAPI.fulfilled]: (state, action) => {
			const { dataOrder } = state
			const { _id } = action.payload.data
			state.loading = false
			const index = dataOrder.findIndex((cart) => cart._id === _id)
			dataOrder.splice(index, 1)
			state.isSuccess = true
			state.message = 'Đã xóa'
		},
		[updateOrderStatus.pending]: (state) => {
			state.loading = true
		},
		[updateOrderStatus.rejected]: (state, action) => {
			state.loading = false
			state.isError = true
			state.message = 'Cập nhật thất bại'
		},
		[updateOrderStatus.fulfilled]: (state, action) => {
			state.loading = false
			state.isSuccess = true
			state.message = 'Đã cập nhật'
		},
	},
})
export const { clearState } = OrderSlice.actions
const { reducer } = OrderSlice

export default reducer

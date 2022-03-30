import { createSlice } from '@reduxjs/toolkit'
import { createCoupon, deleteCoupon, getCoupons } from './pathAPI'

const CouponSlice = createSlice({
	name: 'category',
	initialState: {
		coupons: [],
		loading: false,
		isSuccess: false,
		isError: false,
		message: '',
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
		[createCoupon.pending]: (state) => {
			state.loading = true
		},
		[createCoupon.fulfilled]: (state, action) => {
			state.message = 'Tạo mới thành công'
			state.loading = false
			state.isSuccess = true
		},
		[createCoupon.rejected]: (state) => {
			state.message = 'Tạo mới thất bại'
			state.loading = false
			state.isError = true
		},

		[getCoupons.pending]: (state) => {
			state.loading = true
		},
		[getCoupons.fulfilled]: (state, action) => {
			state.coupons = action.payload
			state.loading = false
		},
		[getCoupons.rejected]: (state) => {
			state.loading = false
			state.isError = true
		},

		[deleteCoupon.pending]: (state) => {
			state.loading = true
		},
		[deleteCoupon.fulfilled]: (state, action) => {
			state.message = 'Xóa thành công'
			state.loading = false
			state.isSuccess = true
		},
		[deleteCoupon.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Xóa thất bại'
		},
	},
})

export const { clearState } = CouponSlice.actions
const { reducer } = CouponSlice
export default reducer

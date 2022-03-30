import { createSlice } from '@reduxjs/toolkit'
import { createSub, deleteSub, getSub, getSubs, updateSub } from './pathAPI'

const SubSlice = createSlice({
	name: 'category',
	initialState: {
		subs: [],
		sub: {},
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
		[createSub.pending]: (state) => {
			state.loading = true
		},
		[createSub.fulfilled]: (state) => {
			state.loading = false
			state.isSuccess = true
			state.message = 'Tạo mới thành công'
		},
		[createSub.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Tạo mới thất bại'
		},

		[getSubs.pending]: (state) => {
			state.loading = true
		},
		[getSubs.fulfilled]: (state, action) => {
			state.subs = action.payload
			state.loading = false
		},
		[getSubs.rejected]: (state) => {
			state.loading = false
			state.isError = true
		},

		[getSub.pending]: (state) => {
			state.loading = true
		},
		[getSub.fulfilled]: (state, action) => {
			state.sub = action.payload
			state.loading = false
		},
		[getSub.rejected]: (state) => {
			state.loading = false
			state.isError = true
		},

		[updateSub.pending]: (state) => {
			state.loading = true
		},
		[updateSub.fulfilled]: (state, action) => {
			state.message = 'Cập nhật thành công'
			state.loading = false
			state.isSuccess = true
		},
		[updateSub.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Cập nhật thất bại'
		},

		[deleteSub.pending]: (state) => {
			state.loading = true
		},
		[deleteSub.fulfilled]: (state, action) => {
			state.message = 'Xóa thành công'
			state.loading = false
			state.isSuccess = true
		},
		[deleteSub.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Xóa thất bại'
		},
	},
})

export const { clearState } = SubSlice.actions
const { reducer } = SubSlice
export default reducer

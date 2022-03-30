import { createSlice } from '@reduxjs/toolkit'
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategory,
	getCategorySubs,
	updateCategory,
} from './pathAPI'

const CategorySlice = createSlice({
	name: 'category',
	initialState: {
		categories: [],
		category: {},
		subs: [],
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
		[createCategory.pending]: (state) => {
			state.loading = true
		},
		[createCategory.fulfilled]: (state, action) => {
			state.message = 'Tạo mới thành công'
			state.loading = false
			state.isSuccess = true
		},
		[createCategory.rejected]: (state) => {
			state.message = 'Tạo mới thất bại'
			state.loading = false
			state.isError = true
		},

		[getCategories.pending]: (state) => {
			state.loading = true
		},
		[getCategories.fulfilled]: (state, action) => {
			state.categories = action.payload
			state.loading = false
		},
		[getCategories.rejected]: (state) => {
			state.loading = false
			state.isError = true
		},

		[getCategory.pending]: (state) => {
			state.loading = true
		},
		[getCategory.fulfilled]: (state, action) => {
			state.category = action.payload
			state.loading = false
		},
		[getCategory.rejected]: (state) => {
			state.loading = false
			state.isError = true
		},

		[updateCategory.pending]: (state) => {
			state.loading = true
		},
		[updateCategory.fulfilled]: (state, action) => {
			state.message = 'Cập nhật thành công'
			state.loading = false
			state.isSuccess = true
		},
		[updateCategory.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Cập nhật thất bại'
		},

		[deleteCategory.pending]: (state) => {
			state.loading = true
		},
		[deleteCategory.fulfilled]: (state, action) => {
			state.message = 'Xóa thành công'
			state.loading = false
			state.isSuccess = true
		},
		[deleteCategory.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Xóa thất bại'
		},

		[getCategorySubs.pending]: (state) => {
			state.loading = true
		},
		[getCategorySubs.fulfilled]: (state, action) => {
			state.subs = action.payload
			state.loading = false
		},
		[getCategorySubs.rejected]: (state) => {
			state.loading = false
			state.isError = true
		},
	},
})

export const { clearState } = CategorySlice.actions
const { reducer } = CategorySlice
export default reducer

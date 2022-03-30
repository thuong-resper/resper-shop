import { createSlice } from '@reduxjs/toolkit'
import { getListProducts } from './pathApi'

const ListProductSlice = createSlice({
	name: 'products',
	initialState: {
		data: [],
		length: 0,
		loading: true,
		error: '',
	},
	reducers: {},
	extraReducers: {
		[getListProducts.pending]: (state) => {
			state.loading = true
		},
		[getListProducts.fulfilled]: (state, action) => {
			const { data, length } = action.payload
			state.loading = false
			state.length = length
			state.data = data
		},
		[getListProducts.rejected]: (state, action) => {
			state.loading = false
			state.error = action.error
		},
	},
})
const { reducer } = ListProductSlice
export default reducer

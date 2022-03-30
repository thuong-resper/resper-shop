import { createSlice } from '@reduxjs/toolkit'
import { getRelated } from './pathApi'

const ListRelatedSlice = createSlice({
	name: 'listRelated',
	initialState: {
		listProductSlider: [],
		loading: true,
		length: null,
	},
	reducers: {},
	extraReducers: {
		[getRelated.pending]: (state) => {
			state.loading = true
		},
		[getRelated.rejected]: (state, action) => {
			state.loading = false
		},
		[getRelated.fulfilled]: (state, action) => {
			state.loading = false
			state.listProductSlider = action.payload.data
			state.length = action.payload.length
		},
	},
})
const { reducer } = ListRelatedSlice
export default reducer

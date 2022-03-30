import { createSlice } from '@reduxjs/toolkit'

import { getSearch } from './patchAPI'

const SearchProductSlice = createSlice({
	name: 'search',
	initialState: {
		data: [],
		length: 0,
		loading: true,
		search: '',
	},
	reducers: {
		updateSearch: (state, action) => {
			state.search = action.payload
		},
	},
	extraReducers: {
		[getSearch.pending]: (state) => {
			state.loading = true
		},
		[getSearch.rejected]: (state, action) => {
			state.loading = false
		},
		[getSearch.fulfilled]: (state, action) => {
			const { data, length } = action.payload
			state.data = data
			state.length = length
			state.loading = false
		},
	},
})
export const { updateSearch } = SearchProductSlice.actions
const { reducer } = SearchProductSlice
export default reducer

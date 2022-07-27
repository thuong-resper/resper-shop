import { createSlice } from '@reduxjs/toolkit'

const SearchProductSlice = createSlice({
	name: 'search',
	initialState: {
		search: '',
	},
	reducers: {
		updateSearch: (state, action) => {
			state.search = action.payload
		},
	},
})
export const { updateSearch } = SearchProductSlice.actions
const { reducer } = SearchProductSlice
export default reducer

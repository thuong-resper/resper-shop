import { createAsyncThunk } from '@reduxjs/toolkit'
import searchAPI from 'apis/searchAPI'

export const getSearch = createAsyncThunk('getSearch', async (params) => {
	return await searchAPI.getSearch(params)
})

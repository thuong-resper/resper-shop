import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from 'apis/adminAPI'

export const createSub = createAsyncThunk('createSub', async (data, token) => {
	return await adminAPI.createSub(data, token)
})

export const getSubs = createAsyncThunk('getSubs', async () => {
	return await adminAPI.getSubs()
})

export const getSub = createAsyncThunk('getSub', async (slug) => {
	return await adminAPI.getSub(slug)
})

export const updateSub = createAsyncThunk('updateSub', async (data, token) => {
	return await adminAPI.updateSub(data, token)
})

export const deleteSub = createAsyncThunk('deleteSub', async (slug, token) => {
	return await adminAPI.deleteSub(slug, token)
})

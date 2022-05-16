import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from 'apis/adminAPI'

export const createCategory = createAsyncThunk('createCategory', async (data, token) => {
	return await adminAPI.createCategory(data, token)
})

export const getCategories = createAsyncThunk('getCategories', async () => {
	return await adminAPI.getCategories()
})

export const getCategory = createAsyncThunk('getCategory', async () => {
	return await adminAPI.getCategory()
})

export const getCategorySubs = createAsyncThunk('getCategorySubs', async (id) => {
	return await adminAPI.getCategorySubs(id)
})

export const updateCategory = createAsyncThunk('updateCategory', async (data, token) => {
	return await adminAPI.updateCategory(data, token)
})

export const deleteCategory = createAsyncThunk('deleteCategory', async (slug, token) => {
	return await adminAPI.deleteCategory(slug, token)
})

export const getSubs = createAsyncThunk('getSubs', async () => {
	return await adminAPI.getSubs()
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from 'apis/adminAPI'

export const createProduct = createAsyncThunk('createProduct', async (data, token) => {
	return await adminAPI.createProduct(data, token)
})

export const removeImage = createAsyncThunk('removeImage', async (data, token) => {
	return await adminAPI.removeImage(data, token)
})

export const updateProduct = createAsyncThunk('updateProduct', async (data, token) => {
	return await adminAPI.updateProduct(data, token)
})

export const getProducts = createAsyncThunk('getProducts', async (id) => {
	return await adminAPI.getProducts(id)
})

export const readProduct = createAsyncThunk('readProduct', async (params) => {
	return await adminAPI.readProduct(params)
})

export const getCommentProduct = createAsyncThunk('commentProduct', async (params, token) => {
	return await adminAPI.CommentProduct(params, token)
})

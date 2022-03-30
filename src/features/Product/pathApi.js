import { createAsyncThunk } from '@reduxjs/toolkit'
import productAPI from 'apis/productsApi'

export const getListProducts = createAsyncThunk('product/getListProducts', async (params) => {
	return await productAPI.getListProducts(params)
})

export const getProductId = createAsyncThunk('product/getProductId', async (id) => {
	return await productAPI.getProductId(id)
})

export const getRelated = createAsyncThunk('product/getRelated', async (params) => {
	return await productAPI.getRelated(params)
})

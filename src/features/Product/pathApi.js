import { createAsyncThunk } from '@reduxjs/toolkit'
import productAPI from 'apis/productsApi'

export const getListProducts = createAsyncThunk('product/getListProducts', async (params) => {
	return await productAPI.getListProducts(params)
})

export const getparams = createAsyncThunk('product/getparams', async (id) => {
	return await productAPI.getparams(id)
})

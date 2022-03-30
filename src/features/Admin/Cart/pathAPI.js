import { createAsyncThunk } from '@reduxjs/toolkit'
import CartSlice from 'api/adminAPI'

export const getCart = createAsyncThunk('getCart', async (params) => {
	return await CartSlice.getCart(params)
})

export const checkOutCart = createAsyncThunk('putCart', async (id_cart, token) => {
	return await CartSlice.checkOutCart(id_cart, token)
})

export const deleteCart = createAsyncThunk('delete', async (id_cart, token) => {
	return await CartSlice.deleteCart(id_cart, token)
})

export const messagesCart = createAsyncThunk('messages', async (data, token) => {
	return await CartSlice.messagesCart(data, token)
})
// Products

import { createAsyncThunk } from '@reduxjs/toolkit'
import cartAPI from 'apis/cartAPI'

export const userCartAPI = createAsyncThunk('userCartAPI', async (cart, token) => {
	const response = await cartAPI.userCartAPI(cart, token)
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(response)
		}, 1300)
	})
})

export const getUserCartAPI = createAsyncThunk('getUserCartAPI', async (token) => {
	return await cartAPI.getUserCartAPI(token)
})

export const deleteCartAPI = createAsyncThunk('deleteCartAPI', async (token) => {
	return await cartAPI.deleteCartAPI(token)
})

export const saveUserAddressAPI = createAsyncThunk('saveUserAddressAPI', async (data, token) => {
	return await cartAPI.saveUserAddressAPI(data, token)
})

export const applyCouponAPI = createAsyncThunk('applyCouponAPI', async (coupon, token) => {
	return await cartAPI.applyCouponAPI(coupon, token)
})

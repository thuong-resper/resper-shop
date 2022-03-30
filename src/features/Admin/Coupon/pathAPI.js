import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from 'apis/adminAPI'

export const createCoupon = createAsyncThunk('createCoupon', async (coupon, token) => {
	return await adminAPI.createCoupon(coupon, token)
})

export const getCoupons = createAsyncThunk('getCoupons', async (token) => {
	return await adminAPI.getCoupons(token)
})

export const deleteCoupon = createAsyncThunk('deleteCoupon', async (couponId, token) => {
	return await adminAPI.deleteCoupon(couponId, token)
})

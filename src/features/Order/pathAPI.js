import { createAsyncThunk } from '@reduxjs/toolkit'
import orderAPI from 'apis/orderAPI'

export const createOrderAPI = createAsyncThunk('createOrderAPI', async (order, token) => {
	const response = await orderAPI.createOrderAPI(order, token)
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(response)
		}, 1300)
	})
})

export const getOrderByIdAPI = createAsyncThunk('getOrderByIdAPI', async (_id, token) => {
	return await orderAPI.getOrderByIdAPI(_id, token)
})

export const getOrderUserAPI = createAsyncThunk('getOrderUserAPI', async (params) => {
	return await orderAPI.getUserOrdersAPI(params)
})

export const putOrderAddressesAPI = createAsyncThunk('putOrderAddress', async (data, token) => {
	return await orderAPI.putToOrderAddressesAPI(data, token)
})

export const putPayOrderAPI = createAsyncThunk('payOrder', async (data, token) => {
	return await orderAPI.putToPaymentOrderAPI(data, token)
})

export const deleteOrderAPI = createAsyncThunk('deleteOrder', async (id_card, token) => {
	return await orderAPI.deleteToOrderAPI(id_card, token)
})

export const getAllOrders = createAsyncThunk('getAllOrders', async (params) => {
	return await orderAPI.getAllOrders(params)
})

export const updateOrderStatus = createAsyncThunk('updateOrderStatus', async (data) => {
	return await orderAPI.updateOrderStatus(data)
})

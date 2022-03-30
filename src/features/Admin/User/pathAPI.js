import { createAsyncThunk } from '@reduxjs/toolkit'
import adminAPI from 'apis/adminAPI'

export const getUser = createAsyncThunk('getUser', async (params, token) => {
	return await adminAPI.getAllUser(params, token)
})

export const getListCommentsUser = createAsyncThunk('listCommentUser', async (params, token) => {
	return await adminAPI.getListCommentsUser(params, token)
})

export const deleteCommentUser = createAsyncThunk('deleteCommentUser', async (params, token) => {
	return await adminAPI.deleteCommentUser(params, token)
})

export const deleteAccountUser = createAsyncThunk('deleteAccount', async (params, token) => {
	return await adminAPI.deleteAccountUser(params, token)
})

export const getListCartUser = createAsyncThunk('getCartUser', async (params, token) => {
	return await adminAPI.getListCommentsCart(params, token)
})

export const postActiveRoleUser = createAsyncThunk('activeRoleUser', async (id_user, token) => {
	return await adminAPI.postActiveRoleUser(id_user, token)
})

export const deleteAllCart = createAsyncThunk('deleteCartAll', async (id_user, token) => {
	return await adminAPI.deleteAllCart(id_user, token)
})

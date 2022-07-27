import { createAsyncThunk } from '@reduxjs/toolkit'
import userAPI from 'apis/userAPI'

export const loginUser = createAsyncThunk('login', async (data) => {
	return await userAPI.login(data)
})

export const loginGoogle = createAsyncThunk('Google', async (tokenId) => {
	return await userAPI.loginGoogle(tokenId)
})

export const ChangePassword = createAsyncThunk('password', async (pass, token) => {
	return await userAPI.ChangePassword(pass, token)
})

export const getProfile = createAsyncThunk('profile', async () => {
	return await userAPI.profile()
})

export const registerUser = createAsyncThunk('register', async (data) => {
	return await userAPI.register(data)
})

export const uploadImageUser = createAsyncThunk('upload', async (image, token) => {
	return await userAPI.uploadImage(image, token)
})

export const getDiaryComment = createAsyncThunk('getDiaryComment', async (params, token) => {
	return await userAPI.diaryComment(params, token)
})

export const postActiveEmail = createAsyncThunk('activeEmail', async (accessToken) => {
	return await userAPI.activeEmail(accessToken)
})

export const postForgotPassword = createAsyncThunk('forgotPassword', async (email) => {
	return await userAPI.forgotPassword(email)
})

export const putResetPassword = createAsyncThunk('resetPassword', async (data) => {
	return await userAPI.resetPassword(data)
})

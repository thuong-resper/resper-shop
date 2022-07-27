import { createAsyncThunk } from '@reduxjs/toolkit'
import commentAPI from 'apis/commentAPI'

export const getCommentOne = createAsyncThunk('getCommentOne', async (params) => {
	return await commentAPI.getCommentOne(params)
})

export const deleteComment = createAsyncThunk('deleteComment', async (data, token) => {
	return await commentAPI.deleteComment(data, token)
})

import { createAsyncThunk } from "@reduxjs/toolkit";
import commentAPI from "apis/commentAPI";

export const getCommentOne = createAsyncThunk('getCommentOne', async (params) => {
  const response = await commentAPI.getCommentOne(params);
  return response;
});

export const deleteComment = createAsyncThunk('deleteComment', async (data, token) => {
  const response = await commentAPI.deleteComment(data, token);
  return response;
})
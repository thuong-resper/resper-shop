import { createAsyncThunk } from '@reduxjs/toolkit';
import adminAPI from 'apis/adminAPI';

export const getUser = createAsyncThunk('getUser', async (params, token) => {
  const response = await adminAPI.getAllUser(params, token);
  return response;
});

export const getListCommentsUser = createAsyncThunk('listCommentUser', async (params, token) => {
  const response = await adminAPI.getListCommentsUser(params, token);
  return response;
});

export const deleteCommentUser = createAsyncThunk('deleteCommentUser', async (params, token) => {
  const response = await adminAPI.deleteCommentUser(params, token);
  return response;
});

export const deleteAccountUser = createAsyncThunk('deleteAccount', async (params, token) => {
  const response = await adminAPI.deleteAccountUser(params, token);
  return response;
});

export const getListCartUser = createAsyncThunk('getCartUser', async (params, token) => {
  const response = await adminAPI.getListCommentsCart(params, token);
  return response;
});

export const postActiveRoleUser = createAsyncThunk('activeRoleUser', async (id_user, token) => {
  const response = await adminAPI.postActiveRoleUser(id_user, token);
  return response;
});

export const deleteAllCart = createAsyncThunk('deleteCartAll', async (id_user, token) => {
  const response = await adminAPI.deleteAllCart(id_user, token);
  return response;
});

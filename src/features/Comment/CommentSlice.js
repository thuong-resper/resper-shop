import { createSlice } from '@reduxjs/toolkit';
import SimpleAlerts from 'components/UI/Alerts/Alerts';
import { deleteComment, getCommentOne } from './pathAPI';
const CommentSlice = createSlice({
  name: 'comment',
  initialState: {
    data: [],
    length: 0,
    loading: true,
    loadingDeleteCmtAPI: false,
  },
  extraReducers: {
    // get comment
    [getCommentOne.pending]: (state) => {
      state.loading = true;
    },
    [getCommentOne.fulfilled]: (state, action) => {
      state.loading = false;
      state.length = action.payload.length;
      state.data = action.payload.data;
    },
    [getCommentOne.rejected]: (state, action) => {
      state.loading = false;
    },

    // delete comment
    [deleteComment.pending]: (state) => {
      state.loadingDeleteCmtAPI = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      const id = action.payload.data._id;
      const index = state.data.findIndex((comment) => comment._id === id);
      if (index !== -1) {
        state.data.splice(index, 1);
        state.length = action.payload.length;
        <SimpleAlerts severity="success" message="Delete success" />;
      }
      state.loadingDeleteCmtAPI = false;
    },
    [deleteComment.rejected]: (state) => {
      state.loadingDeleteCmtAPI = false;
    },
  },
});
const { reducer } = CommentSlice;
export default reducer;

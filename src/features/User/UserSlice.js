import { createSlice } from '@reduxjs/toolkit'
import { deleteComment } from 'features/Comment/pathAPI'
import {
	getDiaryComment,
	getProfile,
	loginGoogle,
	loginUser,
	postActiveEmail,
	postForgotPassword,
	putResetPassword,
	registerUser,
	uploadImageUser,
} from './pathAPI'

const UserSlice = createSlice({
	name: 'user',
	initialState: {
		userSlice: [],
		tokenSlice: null,
		loading: false,
		isSuccess: false,
		isError: false,
		message: '',
		// history comment
		diaryComment: [],
		diaryCommentLength: 0,
		loadingDiaryComment: false,
		loadingGetProfile: false,
		isAdmin: false,
	},
	reducers: {
		closeSnackbar: (state) => {
			state.isError = false
			state.isSuccess = false
			state.loading = false
			state.message = ''
			return state
		},
	},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.loading = true
		},
		[loginUser.fulfilled]: (state, action) => {
			const { accessToken, user } = action.payload
			state.userSlice = user
			state.tokenSlice = accessToken
			state.loading = false
			state.isSuccess = true
			state.message = 'Đăng nhập thành công'
			if (user.role === 1) {
				state.isAdmin = true
			}
			if (user.role === 0) {
				state.isAdmin = false
			}
			localStorage.setItem('token', accessToken)
		},
		[loginUser.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Sai tài khoản hoặc mật khẩu'
		},
		// active email
		[postActiveEmail.pending]: (state) => {
			state.loading = true
		},
		[postActiveEmail.fulfilled]: (state, action) => {
			state.loading = false
			const { token, user } = action.payload
			state.userSlice = user
			if (user.role === 1) {
				state.isAdmin = true
			}
			if (user.role === 0) {
				state.isAdmin = false
			}
			state.tokenSlice = token
			state.isSuccess = true
			state.message = 'Đăng nhập thành công'
			localStorage.setItem('token', token)
		},
		[postActiveEmail.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Lỗi kích hoạt'
		},
		// forget password
		[postForgotPassword.fulfilled]: (state) => {
			state.loading = false
			state.isSuccess = true
			state.message = 'Vui lòng kiểm tra email'
		},
		[postForgotPassword.rejected]: (state) => {
			state.isError = true
			state.loading = false
			state.message = 'Email không tồn tại'
		},
		// login google
		[loginGoogle.pending]: (state) => {
			state.loading = true
		},
		[loginGoogle.fulfilled]: (state, action) => {
			const { accessToken, user } = action.payload
			if (user.role === 1) {
				state.isAdmin = true
			}
			if (user.role === 0) {
				state.isAdmin = false
			}
			const token = accessToken
			state.userSlice = user
			state.tokenSlice = token
			state.loading = false
			state.isSuccess = true
			state.message = 'Đăng nhập thành công'
			localStorage.setItem('token', token)
		},
		[loginGoogle.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Đăng nhập bằng Google thất bại'
		},
		// get when token
		[getProfile.pending]: (state) => {
			state.loadingGetProfile = true
		},
		[getProfile.fulfilled]: (state, action) => {
			const { user } = action.payload
			if (user.role === 1) {
				state.isAdmin = true
			}
			if (user.role === 0) {
				state.isAdmin = false
			}
			state.userSlice = user
			state.loadingGetProfile = false
			state.tokenSlice = localStorage.getItem('token')
		},
		[getProfile.rejected]: (state) => {
			state.userSlice = []
			localStorage.removeItem('token')
			state.tokenSlice = null
			state.loadingGetProfile = false
		},
		// post register user
		[registerUser.pending]: (state) => {
			state.loading = true
		},
		[registerUser.fulfilled]: (state) => {
			state.loading = false
			state.isSuccess = true
			state.message = 'Vui lòng kiểm tra email'
		},
		[registerUser.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Email đã tồn tại'
		},
		// reset password
		[putResetPassword.pending]: (state) => {
			state.loading = true
		},
		[putResetPassword.fulfilled]: (state, action) => {
			state.loading = false
			const { token, user } = action.payload
			state.userSlice = user
			if (user.role === 1) {
				state.isAdmin = true
			}
			if (user.role === 0) {
				state.isAdmin = false
			}
			state.tokenSlice = token
			localStorage.setItem('token', token)
			state.isSuccess = true
			state.message = 'Đổi mật khẩu thành công'
		},
		[putResetPassword.rejected]: (state) => {
			state.loading = false
			state.isError = true
			state.message = 'Lỗi tạo mới mật khẩu'
		},
		[uploadImageUser.fulfilled]: (state, action) => {
			state.userSlice = action.payload.data
		}, //  Diary Comment user
		[getDiaryComment.pending]: (state) => {
			state.loadingDiaryComment = true
		},
		[getDiaryComment.fulfilled]: (state, action) => {
			const { comment, length } = action.payload
			state.loadingDiaryComment = false
			state.diaryComment = comment
			state.diaryCommentLength = length
		},
		[getDiaryComment.rejected]: (state) => {
			state.loadingDiaryComment = false
		},
		[deleteComment.fulfilled]: (state, action) => {
			const id = action.payload.data._id
			const index = state.diaryComment.findIndex((comment) => comment._id === id)
			state.diaryComment.splice(index, 1)
			state.diaryCommentLength = state.diaryCommentLength - 1
		},
	},
})
export const { closeSnackbar } = UserSlice.actions

const { reducer } = UserSlice
export default reducer

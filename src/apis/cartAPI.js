import axiosClient from './axiosClient'

const cartAPI = {
	userCartAPI: (cart) => {
		const url = '/api/user/cart'
		return axiosClient.post(url, cart)
	},
	getUserCartAPI: () => {
		const url = `/api/user/cart`
		return axiosClient.get(url)
	},
	deleteCartAPI: () => {
		const url = '/api/user/cart'
		return axiosClient.delete(url)
	},
	applyCouponAPI: (coupon) => {
		const url = '/api/user/cart/coupon'
		return axiosClient.post(url, coupon)
	},
}
export default cartAPI

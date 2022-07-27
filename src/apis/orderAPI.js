import axiosClient from './axiosClient'

const orderAPI = {
	createOrderAPI: (order) => {
		const url = '/api/user/order'
		return axiosClient.post(url, order)
	},
	getOrderByIdAPI: (_id) => {
		const url = `/api/user/order/${_id}`
		return axiosClient.get(url)
	},
	getUserOrdersAPI: (params) => {
		const url = '/api/user/orders'
		return axiosClient.get(url, { params })
	},
	putToPaymentOrderAPI: (data) => {
		const { id } = data
		const url = `/api/user/order/${id}/pay`
		return axiosClient.put(url, data)
	},
	putToOrderAddressesAPI(data, token) {
		// const url = '/api/admin/order-status'
		// return axiosClient.put(url, { data })
	},
	deleteToOrderAPI(id_card, data) {
		const url = `/api/user/order/${id_card}`
		return axiosClient.delete(url, { data })
	},
	getAllOrders: (params) => {
		const url = '/api/admin/orders'
		return axiosClient.get(url, { params })
	},
	updateOrderStatus: (data) => {
		const url = '/api/admin/order-status'
		return axiosClient.put(url, { data })
	},
}
export default orderAPI

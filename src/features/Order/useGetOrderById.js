import { useQuery } from 'react-query'
import orderAPI from 'apis/orderAPI.js'
import { orderKeys } from 'features/Order/queryKeys.js'

export function useGetOrderById(id) {
	const getOrderById = async (id) => {
		return await orderAPI.getOrderByIdAPI(id)
	}

	return useQuery(orderKeys.detail(id), () => getOrderById(id), {
		retry: 1,
		staleTime: 5 * 60 * 1000,
	})
}

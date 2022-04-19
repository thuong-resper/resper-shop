import { useQuery } from 'react-query'
import orderAPI from 'apis/orderAPI.js'
import { adminOrderKeys } from 'features/Admin/Order/queryKeys.js'

export function usePaginatedAdminOrders(params) {
	const getOrders = async (params) => {
		return await orderAPI.getAllOrders(params)
	}

	return useQuery(adminOrderKeys.pagination(params), () => getOrders(params), {
		keepPreviousData: true,
		staleTime: 5 * 60 * 1000,
	})
}

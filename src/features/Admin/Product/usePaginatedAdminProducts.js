import { useQuery } from 'react-query'
import { adminProductKeys } from 'features/Admin/Product/queryKeys.js'
import productAPI from 'apis/productsApi.js'

export function usePaginatedAdminProducts(params) {
	const getProducts = async (params) => {
		return await productAPI.getListProducts(params)
	}

	return useQuery(adminProductKeys.pagination(params), () => getProducts(params), {
		keepPreviousData: true,
		staleTime: 5 * 60 * 1000,
	})
}

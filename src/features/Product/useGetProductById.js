import { useQuery } from 'react-query'
import productsApi from 'apis/productsApi.js'
import { productKeys } from 'features/Product/queryKeys.js'

export function useGetProductById(id) {
	const getProductById = async (id) => {
		return await productsApi.getProductById(id)
	}

	return useQuery(productKeys.detail(id), () => getProductById(id), {
		retry: 1,
		staleTime: 5 * 60 * 1000,
	})
}

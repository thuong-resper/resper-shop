import { useQuery } from 'react-query'
import { productKeys } from 'features/Product/queryKeys.js'
import productsApi from 'apis/productsApi.js'

export function useGetRelatedProducts(param) {
	const getRelatedProducts = async (param) => {
		const response = await productsApi.getRelated(param)
		return response.data
	}

	return useQuery(productKeys.relate(param), () => getRelatedProducts(param), {
		retry: 1,
		staleTime: 5 * 60 * 1000,
		keepPreviousData: true,
	})
}

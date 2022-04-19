import { useQuery } from 'react-query'
import cartAPI from 'apis/cartAPI.js'
import { cartKeys } from 'features/Cart/queryKeys.js'

export function useGetUserCart() {
	const getUserCartById = async () => {
		return await cartAPI.getUserCartAPI()
	}

	return useQuery(cartKeys.detail(), () => getUserCartById(), {
		retry: 1,
		staleTime: 5 * 60 * 1000,
	})
}

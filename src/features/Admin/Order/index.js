import { useFetch } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { adminRoutes } from 'routes'

export const useGetOrders = (params) =>
	useFetch(pathToUrl(adminRoutes.order), params, {
		staleTime: 5 * 60 * 1000,
	})

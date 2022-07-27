import { useFetch, useUpdate } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { clientRoutes } from 'routes'
import { staleTime5m } from 'staticOptions'

export * from 'features/Order/useUpdateOrder.js'

export const useGetOrderById = (id) => useFetch(id ? pathToUrl(clientRoutes.order, { id }) : null)

export const useGetUserOrders = (params) =>
	useFetch(pathToUrl(clientRoutes.myOrder), params, { staleTime: staleTime5m })

export const usePatchOrderStatus = (id, updater) =>
	useUpdate(id ? pathToUrl(clientRoutes.order, { id }) : null, undefined, updater)

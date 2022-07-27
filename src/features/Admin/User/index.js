import { useDelete, useFetch } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { adminRoutes } from 'routes'
import { staleTime5m } from 'staticOptions'

export const useGetUsers = (params) =>
	useFetch(pathToUrl(adminRoutes.user), params, { staleTime: staleTime5m })

export const useDeleteUser = (params, updater) =>
	useDelete(pathToUrl(adminRoutes.user), params, updater)

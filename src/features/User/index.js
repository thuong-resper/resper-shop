import { useFetch, useUpdate } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { clientRoutes } from 'routes'
import { staleTime5m } from 'staticOptions'

export const useGetUserProfile = () =>
	useFetch(pathToUrl(clientRoutes.profile), undefined, {
		staleTime: staleTime5m,
	})

export const useGetUserAddress = (id) => useFetch(pathToUrl(clientRoutes.userAddress), { id })

export const useUserUpdate = (updater) =>
	useUpdate(pathToUrl(clientRoutes.profile), undefined, updater)

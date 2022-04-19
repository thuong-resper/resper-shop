import { useDelete, useFetch, usePost, useUpdate } from 'utils/reactQuery.js'
import { adminRoutes } from 'routes.js'
import { pathToUrl } from 'utils/router.js'

export const useGetSubs = () =>
	useFetch(pathToUrl(adminRoutes.sub), undefined, { staleTime: 5 * 60 * 1000 })

export const useAddSub = (updater) => usePost(pathToUrl(adminRoutes.sub), undefined, updater)

export const usePatchSub = (updater) => useUpdate(pathToUrl(adminRoutes.sub), undefined, updater)

export const useDeleteSub = (updater) => useDelete(pathToUrl(adminRoutes.sub), undefined, updater)

import { useDelete, useFetch, usePost, useUpdate } from 'utils/reactQuery.js'
import { adminRoutes } from 'routes.js'
import { pathToUrl } from 'utils/router.js'

export const useGetCategories = () =>
	useFetch(pathToUrl(adminRoutes.category), undefined, { staleTime: 5 * 60 * 1000 })

export const useAddCategory = (updater) =>
	usePost(pathToUrl(adminRoutes.category), undefined, updater)

export const usePatchCategory = (updater) =>
	useUpdate(pathToUrl(adminRoutes.category), undefined, updater)

export const useDeleteCategory = (updater) =>
	useDelete(pathToUrl(adminRoutes.category), undefined, updater)

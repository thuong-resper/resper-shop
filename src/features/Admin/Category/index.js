import { useDelete, useFetch, usePost, useUpdate } from 'utils/reactQuery'
import { adminRoutes } from 'routes'
import { pathToUrl } from 'utils/router'
import { staleTime5m } from 'staticOptions'

export const useGetCategories = () =>
	useFetch(pathToUrl(adminRoutes.category), undefined, { staleTime: 5 * 60 * 1000 })

export const useGetSubsByCategory = (id) =>
	useFetch(id ? pathToUrl(adminRoutes.getCategorySubs, { id }) : null, undefined, {
		staleTime: staleTime5m,
	})

export const useAddCategory = (updater) =>
	usePost(pathToUrl(adminRoutes.category), undefined, updater)

export const usePatchCategory = (updater) =>
	useUpdate(pathToUrl(adminRoutes.category), undefined, updater)

export const useDeleteCategory = (updater) =>
	useDelete(pathToUrl(adminRoutes.category), undefined, updater)

import { useDelete, useFetch, usePost, useUpdate } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { adminRoutes } from 'routes'

export const useGetProducts = (params) =>
	useFetch(pathToUrl(adminRoutes.adminProduct), params, {
		staleTime: 5 * 60 * 1000,
	})

export const useAddProduct = (updater) =>
	usePost(pathToUrl(adminRoutes.product), undefined, updater)

export const usePatchProduct = (updater) =>
	useUpdate(pathToUrl(adminRoutes.product), undefined, updater)

export const useDeleteProduct = (updater) =>
	useDelete(pathToUrl(adminRoutes.product), undefined, updater)

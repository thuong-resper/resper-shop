import { useDelete, useFetch, usePost, useUpdate } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { adminRoutes } from 'routes'

export const useGetProducts = (params) => useFetch(pathToUrl(adminRoutes.adminProduct), params)

export const useGetProductById = (id) =>
	useFetch(id ? pathToUrl(adminRoutes.adminProduct, { id }) : null, undefined)

export const useAddProduct = (updater) =>
	usePost(pathToUrl(adminRoutes.adminProduct), undefined, updater)

export const usePatchProduct = (updater) =>
	useUpdate(pathToUrl(adminRoutes.adminProduct), undefined, updater)

export const useDeleteProduct = (params, updater) =>
	useDelete(pathToUrl(adminRoutes.adminProduct), params, updater)

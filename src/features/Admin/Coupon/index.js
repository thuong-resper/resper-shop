import { useDelete, useFetch, usePost, useUpdate } from 'utils/reactQuery'
import { adminRoutes } from 'routes'
import { pathToUrl } from 'utils/router'

export const useGetCoupons = () =>
	useFetch(pathToUrl(adminRoutes.coupon), undefined, { staleTime: 5 * 60 * 1000 })

export const useAddCoupon = (updater) => usePost(pathToUrl(adminRoutes.coupon), undefined, updater)

export const usePatchCoupon = (updater) =>
	useUpdate(pathToUrl(adminRoutes.coupon), undefined, updater)

export const useDeleteCoupon = (updater) =>
	useDelete(pathToUrl(adminRoutes.coupon), undefined, updater)

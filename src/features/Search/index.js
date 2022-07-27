import { useFetch } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { clientRoutes } from 'routes'
import { staleTime5m } from 'staticOptions'

export const useGetCategories = () =>
	useFetch(pathToUrl(clientRoutes.category), undefined, { staleTime: Infinity })

export const useGetCategorySubs = (id) =>
	useFetch(id ? pathToUrl(clientRoutes.categorySubs, { id }) : null, undefined, {
		staleTime: staleTime5m,
	})

export const useGetSearch = (params) => useFetch(pathToUrl(clientRoutes.search), params)

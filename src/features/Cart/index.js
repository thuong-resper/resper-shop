import { useFetch } from 'utils/reactQuery'
import { pathToUrl } from 'utils/router'
import { clientRoutes } from 'routes'

export const useGetUserCart = (user) => useFetch(user ? pathToUrl(clientRoutes.cart) : null)

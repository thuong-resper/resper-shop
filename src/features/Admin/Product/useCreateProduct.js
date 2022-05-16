import { useMutation, useQueryClient } from 'react-query'
import adminAPI from 'apis/adminAPI.js'
import { useSnackbar } from 'notistack'
import { adminRoutes } from 'routes'

export function useCreateProduct() {
	const queryClient = useQueryClient()
	const { enqueueSnackbar } = useSnackbar()

	const createProduct = async (data) => {
		return await adminAPI.createProduct(data)
	}

	return useMutation(createProduct, {
		onMutate: async (newProduct) => {
			await queryClient.cancelQueries(adminRoutes.product)
			const previousProduct = queryClient.getQueryData(adminRoutes.product)
			queryClient.setQueryData(adminRoutes.product, (oldProduct) => [...oldProduct, newProduct])
			return { previousProduct }
		},
		onSuccess: (data) => {
			enqueueSnackbar(`Tạo mới thành công: ${data.name}`, { variant: 'success' })
		},
		onError: (err, newProduct, context) => {
			queryClient.setQueryData(adminRoutes.product, context.previousProduct)
		},
		onSettled: () => {
			queryClient.invalidateQueries(adminRoutes.product)
		},
	})
}

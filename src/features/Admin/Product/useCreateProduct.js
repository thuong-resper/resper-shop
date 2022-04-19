import { useMutation, useQueryClient } from 'react-query'
import adminAPI from 'apis/adminAPI.js'
import { adminProductKeys } from 'features/Admin/Product/queryKeys.js'
import { useSnackbar } from 'notistack'

export function useCreateProduct(options) {
	const queryClient = useQueryClient()
	const { enqueueSnackbar } = useSnackbar()

	const createProduct = async (data) => {
		return await adminAPI.createProduct(data)
	}

	return useMutation(createProduct, {
		onMutate: async (newProduct) => {
			await queryClient.cancelQueries(adminProductKeys.all)
			const previousProduct = queryClient.getQueryData(adminProductKeys.all)
			queryClient.setQueryData(adminProductKeys.all, (oldProduct) => [...oldProduct, newProduct])
			return { previousProduct }
		},
		onSuccess: (data) => {
			enqueueSnackbar(`Tạo mới thành công: ${data.name}`, { variant: 'success' })
		},
		onError: (err, newProduct, context) => {
			queryClient.setQueryData(adminProductKeys.all, context.previousProduct)
		},
		onSettled: () => {
			queryClient.invalidateQueries(adminProductKeys.all)
		},
	})
}

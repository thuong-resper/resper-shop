import { useMutation, useQueryClient } from 'react-query'
import orderAPI from 'apis/orderAPI.js'
import { orderKeys } from 'features/Order/queryKeys.js'

export function useUpdateOrder() {
	const queryClient = useQueryClient()

	const editOrder = async (data) => {
		return await orderAPI.updateOrderStatus(data)
	}

	return useMutation(editOrder, {
		onMutate: async (updatedOrder) => {
			await queryClient.cancelQueries(orderKeys.detail(updatedOrder._id))
			const previousOrder = queryClient.getQueryData(orderKeys.detail(updatedOrder._id))
			queryClient.setQueryData(orderKeys.detail(updatedOrder._id), updatedOrder)
			return { previousOrder, updatedOrder }
		},
		onError: (err, updatedOrder, context) => {
			queryClient.setQueryData(orderKeys.detail(updatedOrder._id), context.previousOrder)
		},
		onSettled: () => {
			queryClient.invalidateQueries(orderKeys.all)
		},
	})
}

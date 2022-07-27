import { useQuery } from 'react-query'
import { commentKeys } from 'features/Comment/queryKeys.js'
import commentAPI from 'apis/commentAPI.js'

export function useGetCommentById(params) {
	const getCommentById = async (params) => {
		return await commentAPI.getCommentOne(params)
	}

	return useQuery(commentKeys.detail(params), () => getCommentById(params), {
		retry: 1,
		staleTime: 5 * 60 * 1000,
	})
}

export const commentKeys = {
	all: ['comments'],
	details: () => [...commentKeys.all, 'detail'],
	detail: (param) => [...commentKeys.details(), param],
}

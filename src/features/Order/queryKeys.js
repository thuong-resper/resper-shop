export const orderKeys = {
	all: ['order'],
	create: (param) => [...orderKeys.all, param],
	details: () => [...orderKeys.all, 'detail'],
	detail: (id) => [...orderKeys.details(), id],
}

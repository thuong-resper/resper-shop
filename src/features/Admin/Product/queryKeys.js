export const adminProductKeys = {
	all: ['adminProduct'],
	create: (param) => [...adminProductKeys.all, param],
	details: () => [...adminProductKeys.all, 'detail'],
	detail: () => [...adminProductKeys.details()],
	pagination: (param) => [...adminProductKeys.all, param],
}

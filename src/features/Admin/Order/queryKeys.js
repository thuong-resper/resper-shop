export const adminOrderKeys = {
	all: ['adminOrder'],
	pagination: (param) => [...adminOrderKeys.all, param],
	details: () => [...adminOrderKeys.all, 'detail'],
	detail: () => [...adminOrderKeys.details()],
}

export const cartKeys = {
	all: ['cart'],
	create: (param) => [...cartKeys.all, param],
	details: () => [...cartKeys.all, 'detail'],
	detail: () => [...cartKeys.details()],
}

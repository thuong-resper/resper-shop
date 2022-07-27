const escapeRegExpMatch = function (s) {
	// eslint-disable-next-line no-useless-escape
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
export const isExactMatch = (str, match) => {
	return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str)
}

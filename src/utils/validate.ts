export const isNullOrWhiteSpace = (value: string | undefined | null): boolean => {
	if (!value) {
		return true
	}
	return value.length === 0
}

export const isExternalLink = (path: string): boolean => {
	return /^(https:|http:|mailto:|tel:)/.test(path)
}

export const isMobile = (value: string): boolean => {
	const reg = /^[1](([3-9][0-9]))[0-9]{8}$/
	return reg.test(value)
}

export const isEmail = (value: string): boolean => {
	const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	return reg.test(value)
}

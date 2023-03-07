import { isEmail, isMobile, isNullOrWhiteSpace } from './validate'

export const emailValidator = (_rule: any, value: any, callback: (_e?: Error) => any) => {
	if (value && value.length > 0 && isEmail(value)) {
		callback()
	} else {
		callback(new Error('Email格式不正确'))
	}
}

export const canEmptyEmailValidator = (rule: any, value: any, callback: (_e?: Error) => any) => {
	if (isNullOrWhiteSpace(value)) {
		callback()
		return
	}

	emailValidator(rule, value, callback)
}

export const mobileValidator = (_rule: any, value: any, callback: (_e?: Error) => any) => {
	if (value && value.length > 0 && isMobile(value)) {
		callback()
	} else {
		callback(new Error('手机号码格式不正确'))
	}
}

export const canEmptyMobileValidator = (rule: any, value: any, callback: (_e?: Error) => any) => {
	if (isNullOrWhiteSpace(value)) {
		callback()
		return
	}

	mobileValidator(rule, value, callback)
}

export const gt0Validator = (_rule: any, value: any, callback: (_e?: Error) => any) => {
	if (!value || value === '' || isNaN(value) || value <= 0) {
		callback(new Error('请输入大于0的数字'))
	} else {
		callback()
	}
}

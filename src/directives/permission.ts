import { hasPermission, hasRole } from '@/permissions'
import { Directive, DirectiveBinding } from 'vue'

export const permissions: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
		const { value } = binding
		if (value && value.length > 0) {
			const ok = hasPermission(value)
			if (!ok) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		} else {
			throw new Error("need permissions! Like v-permissions=\"['Permission:Users:Create','Permission:Users:Edit']\"") // eslint-disable-line
		}
	}
}

export const roles: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
		const { value } = binding
		if (value && value.length > 0) {
			const ok = hasRole(value)
			if (!ok) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		} else {
			throw new Error("need roles! Like v-role=\"['admin','user']\"") // eslint-disable-line
		}
	}
}

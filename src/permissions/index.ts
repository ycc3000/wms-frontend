import { useUserStore } from '@/store'

export const hasPermission = (requiredPermissions: string[]) => {
	const { permissions } = useUserStore()
	return permissions?.some((item: string) => {
		return requiredPermissions.includes(item)
	})
}

export const hasRole = (requiredRoles: string[]) => {
	const { roles } = useUserStore()
	return roles?.some((item: string) => {
		return requiredRoles.includes(item)
	})
}

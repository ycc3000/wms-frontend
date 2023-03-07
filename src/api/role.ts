import { EditRole, Role } from '@/types/role'
import { get, post } from '@/utils/request'

export const getRoles = (data: { name?: string; enabled?: boolean }) => {
	return get<Role[]>('/api/role/list', data)
}

export const createOrUpdate = (data: EditRole) => {
	return post('/api/role/create-or-update', data)
}

export const getMenus = (roleId: string) => {
	return get<string[]>('/api/role/menus', { roleId })
}

export const setMenus = (roleId: string, menuIds: string[]) => {
	return post('/api/role/set-menus', { roleId, menuIds })
}

export const getPermissions = (roleId: string) => {
	return get<string[]>('/api/role/permissions', { roleId })
}

export const setPermissions = (roleId: string, permissions: string[]) => {
	return post('/api/role/set-permissions', { roleId, permissions })
}

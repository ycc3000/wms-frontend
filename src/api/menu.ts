import { EditMenu, Menu } from '@/types/menu'
import { get, post } from '@/utils/request'

export const getTree = () => {
	return get<Menu[]>('/api/menu/tree')
}

export const createOrUpdate = (data: EditMenu) => {
	return post('/api/menu/create-or-update', data)
}

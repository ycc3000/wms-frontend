import { Permission } from '@/types/permission'
import { get } from '@/utils/request'

export const getTree = () => {
	return get<Permission[]>('/api/permission/tree')
}

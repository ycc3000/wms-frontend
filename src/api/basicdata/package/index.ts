import { Package, EditPackage } from '@/types/basicdata/package'
import { get, post } from '@/utils/request'

export const getItems = (keyword?: string) => {
	return get<Package[]>('/api/basic-data/package/items', { keyword })
}

export const createOrUpdate = (data: EditPackage) => {
	return post('/api/basic-data/package/create-or-update', data)
}

import { Warehouse, EditWarehouse } from '@/types/basicdata/warehouse'
import { get, post } from '@/utils/request'

export const getItems = (keyword?: string) => {
	return get<Warehouse[]>('/api/basic-data/warehouse/items', { keyword })
}

export const createOrUpdate = (data: EditWarehouse) => {
	return post('/api/basic-data/warehouse/create-or-update', data)
}

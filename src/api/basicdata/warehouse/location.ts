import { EditLocation, GroupedLocation } from '@/types/basicdata/warehouse'
import { get, post } from '@/utils/request'

export const getGroupedItems = (warehouseId: string) => {
	return get<GroupedLocation[]>('/api/basic-data/warehouse/location/grouped-items', { warehouseId })
}

export const createOrUpdate = (data: EditLocation) => {
	return post('/api/basic-data/warehouse/location/create-or-update', data)
}

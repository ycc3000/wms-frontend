import { GroupedZone, EditZone } from '@/types/basicdata/warehouse'
import { get, post } from '@/utils/request'

export const getGroupedItems = () => {
	return get<GroupedZone[]>('/api/basic-data/warehouse/zone/grouped-items')
}

export const createOrUpdate = (data: EditZone) => {
	return post('/api/basic-data/warehouse/zone/create-or-update', data)
}

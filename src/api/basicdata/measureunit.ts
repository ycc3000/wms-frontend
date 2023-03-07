import { MeasureUnit, EditMeasureUnit } from '@/types/basicdata/measureunit'
import { get, post } from '@/utils/request'

export const getItems = () => {
	return get<MeasureUnit[]>('/api/basic-data/measure-unit/items')
}

export const createOrUpdate = (data: EditMeasureUnit) => {
	return post('/api/basic-data/measure-unit/create-or-update', data)
}

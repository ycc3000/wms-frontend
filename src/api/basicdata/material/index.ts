import { EditMaterial, Material } from '@/types/basicdata/material'
import { get, post } from '@/utils/request'

export const getItems = (keyword?: string) => {
	return get<Material[]>('/api/basic-data/material/items', { keyword })
}

export const createOrUpdate = (data: EditMaterial) => {
	return post('/api/basic-data/material/create-or-update', data)
}

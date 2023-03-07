import { EditMaterialSupplier, MaterialSupplier } from '@/types/basicdata/material'
import { get, post } from '@/utils/request'

export const getItem = (materialId: string, supplierId: string) => {
	return get<MaterialSupplier>('/api/basic-data/material-supplier/item', { materialId, supplierId })
}

export const getItems = (materialId: string) => {
	return get<MaterialSupplier[]>('/api/basic-data/material-supplier/items', { materialId })
}

export const createOrUpdate = (data: EditMaterialSupplier) => {
	return post('/api/basic-data/material-supplier/create-or-update', data)
}

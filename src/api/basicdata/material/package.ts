import { EditMaterialPackage, MaterialPackage } from '@/types/basicdata/material'
import { get, post } from '@/utils/request'

export const getItem = (materialId: string, supplierId: string, packageId: string) => {
	return get<MaterialPackage>('/api/basic-data/material-package/item', { materialId, supplierId, packageId })
}

export const getItems = (materialId: string, supplierId: string) => {
	return get<MaterialPackage[]>('/api/basic-data/material-package/items', { materialId, supplierId })
}

export const createOrUpdate = (data: EditMaterialPackage) => {
	return post('/api/basic-data/material-package/create-or-update', data)
}

import { EditMaterialDloc, MaterialDloc } from '@/types/basicdata/material'
import { get, post } from '@/utils/request'

export const createOrUpdate = (data: EditMaterialDloc) => {
	return post('/api/basic-data/material-dloc/create-or-update', data)
}

export const getItem = (warehouseId: string, materialId: string) => {
	return get<MaterialDloc>('/api/basic-data/material-dloc', { warehouseId, materialId })
}

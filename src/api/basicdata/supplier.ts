import { Supplier, EditSupplier } from '@/types/basicdata/supplier'
import { get, post } from '@/utils/request'

export const getItems = (keyword?: string) => {
	return get<Supplier[]>('/api/basic-data/supplier/items', { keyword })
}

export const createOrUpdate = (data: EditSupplier) => {
	return post('/api/basic-data/supplier/create-or-update', data)
}

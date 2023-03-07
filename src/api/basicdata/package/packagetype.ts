import { PackageType, EditPackageType } from '@/types/basicdata/package'
import { get, post } from '@/utils/request'

export const getItems = (keyword?: string) => {
	return get<PackageType[]>('/api/basic-data/package-type/items', { keyword })
}

export const createOrUpdate = (data: EditPackageType) => {
	return post('/api/basic-data/package-type/create-or-update', data)
}

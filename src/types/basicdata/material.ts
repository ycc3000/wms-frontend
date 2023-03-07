import { NameCode } from '@/types'

export type Material = {
	id: string
	code: string
	name: string
	description: string
	baseMeasureUnitId: string
	enabled: boolean
}

export type EditMaterial = {
	id?: string
	code: string
	name: string
	enabled: boolean
	baseMeasureUnitId: string
	description?: string
}

export type MaterialDloc = {
	id: string
	warehouseId: string
	materialId: string
	receiveDlocId: string
}

export type EditMaterialDloc = {
	id?: string
	warehouseId: string
	materialId: string
	receiveDlocId: string
}

export type MaterialSupplier = {
	id: string
	materialId: string
	supplierId: string
	snp: number
	material: NameCode
	supplier: NameCode
}

export type EditMaterialSupplier = {
	id?: string
	materialId: string
	supplierId: string
}

export type MaterialPackage = {
	id: string
	packageId: string
	materialId: string
	supplierId: string
	snp: number
	material: NameCode
	supplier: NameCode
	package: NameCode
}

export type EditMaterialPackage = {
	id?: string
	packageId: string
	materialId: string
	supplierId: string
	snp: number
}

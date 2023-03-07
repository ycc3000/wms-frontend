import { NameCode } from '..'

export type StockOut = {
	id: string
	stockOutNo: string
	businessType: string
	warehouseId: string
	status: number
	comments: string
	hasDetails: boolean
	creationTime: Date
	warehouse: NameCode
}

export type EditStockOut = {
	id?: string
	businessType: string
	warehouseId: string
	comments?: string
}

export type OutboundInputItem = {
	id: string
	qty: number
}

export type OutboundInput = {
	id: string
	items: OutboundInputItem[]
}

export type StockOutDetail = {
	id: string
	stockOutId: string
	materialId: string
	supplierId: string
	packageId: string
	dlocId: string
	snp: number
	requiredQty: number
	actualQty: number
	currentQty?: number
	stockQty?: number
	loading?: boolean
}

export type EditStockOutDetail = {
	id?: string
	stockOutId: string
	materialId: string
	supplierId: string
	packageId: string
	dlocId: string
	snp: number
	requiredQty: number
}

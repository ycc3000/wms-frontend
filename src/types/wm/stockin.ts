import { NameCode } from '..'

export type StockIn = {
	id: string
	stockInNo: string
	businessType: string
	warehouseId: string
	estimatedArrivalTime: Date
	status: number
	statusText: string
	comments: string
	hasDetails: boolean
	creationTime: Date
	warehouse: NameCode
}

export type EditStockIn = {
	id?: string
	businessType: string
	warehouseId: string
	estimatedArrivalTime?: Date
	comments?: string
}

export type InboundInputItem = {
	id: string
	qty: number
}

export type InboundInput = {
	id: string
	items: InboundInputItem[]
}

export type StockInDetail = {
	id: string
	stockInId: string
	materialId: string
	supplierId: string
	packageId: string
	dlocId: string
	snp: number
	batchNo: string
	requiredQty: number
	actualQty: number
	currentQty?: number
}

export type EditStockInDetail = {
	id?: string
	stockInId: string
	materialId: string
	supplierId: string
	packageId: string
	dlocId: string
	snp: number
	batchNo: string
	requiredQty: number
}

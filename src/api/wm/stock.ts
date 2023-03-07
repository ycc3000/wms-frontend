import { get } from '@/utils/request'

export const getStockQty = (materialId: string, supplierId: string) => {
	return get<number>('/api/wm/stock/stockqty', { materialId, supplierId })
}

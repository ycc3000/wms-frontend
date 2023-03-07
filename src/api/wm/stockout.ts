import { EditStockOut, StockOutDetail, EditStockOutDetail, StockOut, OutboundInput } from '@/types/wm/stockout'
import { get, post } from '@/utils/request'

export const getById = (id: string) => {
	return get<StockOut>('/api/wm/stock-out/get-by-id', { id })
}

export const getItem = (id: string) => {
	return get<StockOut>('/api/wm/stock-out/item', { id })
}

export const create = (data: EditStockOut) => {
	return post<string>('/api/wm/stock-out/create', data)
}

export const update = (data: EditStockOut) => {
	return post('/api/wm/stock-out/update', data)
}

export const publish = (id: string) => {
	return post('/api/wm/stock-out/publish', { id })
}

export const outbound = (data: OutboundInput) => {
	return post('/api/wm/stock-out/outbound', data)
}

export const close = (id: string) => {
	return post('/api/wm/stock-out/close', { id })
}

export const getDetails = (id: string) => {
	return get<StockOutDetail[]>('/api/wm/stock-out/details', { id })
}

export const saveDetail = (data: EditStockOutDetail) => {
	return post('/api/wm/stock-out/detail/save', data)
}

export const deleteDetail = (id: string) => {
	return post('/api/wm/stock-out/detail/delete', { id })
}

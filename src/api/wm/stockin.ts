import { EditStockIn, StockInDetail, EditStockInDetail, StockIn, InboundInput } from '@/types/wm/stockin'
import { get, post } from '@/utils/request'

export const getById = (id: string) => {
	return get<StockIn>('/api/wm/stock-in/get-by-id', { id })
}

export const getItem = (id: string) => {
	return get<StockIn>('/api/wm/stock-in/item', { id })
}

export const create = (data: EditStockIn) => {
	return post<string>('/api/wm/stock-in/create', data)
}

export const update = (data: EditStockIn) => {
	return post('/api/wm/stock-in/update', data)
}

export const publish = (id: string) => {
	return post('/api/wm/stock-in/publish', { id })
}

export const inbound = (data: InboundInput) => {
	return post('/api/wm/stock-in/inbound', data)
}

export const close = (id: string) => {
	return post('/api/wm/stock-in/close', { id })
}

export const getDetails = (id: string) => {
	return get<StockInDetail[]>('/api/wm/stock-in/details', { id })
}

export const saveDetail = (data: EditStockInDetail) => {
	return post('/api/wm/stock-in/detail/save', data)
}

export const deleteDetail = (id: string) => {
	return post('/api/wm/stock-in/detail/delete', { id })
}

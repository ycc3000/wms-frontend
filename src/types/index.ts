export type NameCode = {
	name: string
	code: string
	enabled: boolean
}

export type PagedResult<T> = {
	total: number
	items: T[]
}

export type PagedInput = {
	pageNumber: number
	pageSize: number
}

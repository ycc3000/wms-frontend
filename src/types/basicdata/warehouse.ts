export type Warehouse = {
	id: string
	code: string
	name: string
	description: string
	enabled: boolean
}

export type EditWarehouse = {
	id?: string
	code: string
	name: string
	enabled: boolean
	description?: string
}

export type Zone = {
	id: string
	warehouseId: string
	code: string
	name: string
	enabled: boolean
	description: string
}

export type GroupedZone = {
	groupName: string
	zones: Zone[]
}

export type EditZone = {
	id?: string
	warehouseId: string
	code: string
	name: string
	enabled: boolean
	description?: string
}

export type Location = {
	id: string
	zoneId: string
	code: string
	name: string
	description: string
	enabled: boolean
}

export type EditLocation = {
	id?: string
	zoneId: string
	code: string
	name: string
	enabled: boolean
	description?: string
}

export type GroupedLocation = {
	groupName: string
	locations: Location[]
}

export type Role = {
	id: string
	name: string
	description: string
	enabled: boolean
}

export type EditRole = {
	id?: string
	name: string
	description?: string
	enabled: boolean
}

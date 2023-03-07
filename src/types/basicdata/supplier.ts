export type Supplier = {
	id: string
	code: string
	name: string
	description: string
	address: string
	contactName: string
	contactMobile: string
	contactEmail: string
	enabled: boolean
}

export type EditSupplier = {
	id?: string
	code: string
	name: string
	enabled: boolean
	description?: string
	address?: string
	contactName?: string
	contactMobile?: string
	contactEmail?: string
}

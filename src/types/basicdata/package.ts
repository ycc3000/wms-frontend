export type Package = {
	id: string
	code: string
	name: string
	description: string
	typeId: string
	enabled: boolean
}

export type EditPackage = {
	id?: string
	code: string
	name: string
	enabled: boolean
	typeId: string
	description?: string
}

export type PackageType = {
	id: string
	code: string
	name: string
	description: string
	sort: number
	enabled: boolean
}

export type EditPackageType = {
	id?: string
	code: string
	name: string
	enabled: boolean
	sort: number
	description?: string
}

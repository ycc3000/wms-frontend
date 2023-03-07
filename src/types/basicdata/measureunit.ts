export type MeasureUnit = {
	id: string
	code: string
	name: string
	description: string
	sort: number
	enabled: boolean
}

export type EditMeasureUnit = {
	id?: string
	code: string
	name: string
	enabled: boolean
	sort: number
	description?: string
}

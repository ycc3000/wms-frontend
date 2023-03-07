export type Menu = {
	id: string
	parentId?: string
	type: number
	name: string
	component?: string
	url?: string
	icon?: string
	sort: number
	hidden: boolean
	children?: Menu[]
}

export type EditMenu = {
	id?: string
	parentId?: string
	type: number
	name: string
	component?: string
	url?: string
	icon?: string
	sort: number
	hidden: boolean
}

export enum MenuType {
	Menu = 0,
	ExternalLink = 1,
	MobileMenu = 2
}

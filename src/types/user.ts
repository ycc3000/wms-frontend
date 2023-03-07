import { Menu } from './menu'

export type LoginResult = {
	success: boolean
	reason: number
	token: {
		accessToken: string
		refreshToken: string
		expires: Date
	}
	data: {
		name: string
		shouldChangePassword: boolean
		roles: string[]
		menus: Menu[]
		permissions: string[]
	}
}

export type RefreshTokenResult = {
	accessToken: string
	refreshToken: string
	expires: Date
}

export type User = {
	id: string
	loginName: string
	realName: string
	mobile?: string
	email?: string
	gender?: string
	isActive: boolean
	roleIds: string[]
}

export type EditUser = {
	id?: string
	loginName: string
	realName: string
	mobile?: string
	email?: string
	gender?: string
	isActive: boolean
	roleIds: string[]
}

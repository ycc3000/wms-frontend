export const CacheKey = {
	SidebarOpenedKey: 'sidebarOpened',
	LangKey: 'lang',
	ComponentSizeKey: 'componentSize',
	ThemeKey: 'theme',
	ApplicationKey: 'application',
	UserSessionKey: 'user-session-info',
	UserTokenKey: 'user-authorized-access-token',
	UserDataKey: 'user-authorized-data'
}

export const localCache = {
	setItem(key: string, value: any) {
		window.localStorage.setItem(key, JSON.stringify(value))
	},
	getItem(key: string) {
		const json: any = window.localStorage.getItem(key)
		return JSON.parse(json)
	},
	removeItem(key: string) {
		window.localStorage.removeItem(key)
	},
	clear() {
		window.localStorage.clear()
	}
}

export const sessionCache = {
	setItem(key: string, value: any) {
		window.sessionStorage.setItem(key, JSON.stringify(value))
	},
	getItem(key: string) {
		const json: any = window.sessionStorage.getItem(key)
		return JSON.parse(json)
	},
	removeItem(key: string) {
		window.sessionStorage.removeItem(key)
	},
	clear() {
		window.sessionStorage.clear()
	}
}

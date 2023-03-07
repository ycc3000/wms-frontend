import { defineStore } from 'pinia'
import { login as _login, refreshToken as _refreshToken } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { CacheKey, sessionCache } from '@/utils/cache'
import { resetRouter } from '@/router'
import { useTabsStore } from '@/store'

type PageLoginResult = {
	success: boolean
	reason: number
	shouldChangePassword?: boolean
}

export const userStore = defineStore('userStore', {
	state: () => ({
		name: sessionCache.getItem(CacheKey.UserSessionKey)?.name ?? '',
		roles: sessionCache.getItem(CacheKey.UserSessionKey)?.roles ?? [],
		menus: sessionCache.getItem(CacheKey.UserDataKey)?.menus ?? [],
		permissions: sessionCache.getItem(CacheKey.UserDataKey)?.permissions ?? []
	}),
	actions: {
		async LOGIN(username: string, password: string): Promise<PageLoginResult> {
			const loginResult = await _login({ username, password })
			const result: PageLoginResult = { success: loginResult.success, reason: loginResult.reason }
			if (!result.success) {
				return result
			}

			const { accessToken, refreshToken, expires } = loginResult.token
			setToken({
				accessToken: accessToken,
				expires: expires,
				refreshToken: refreshToken
			})

			const { name, roles, menus, permissions, shouldChangePassword } = loginResult.data
			this.name = name
			this.roles = roles
			this.menus = menus
			this.permissions = permissions

			sessionCache.setItem(CacheKey.UserSessionKey, {
				name,
				roles
			})

			sessionCache.setItem(CacheKey.UserDataKey, {
				menus,
				permissions
			})

			if (shouldChangePassword) {
				result.shouldChangePassword = true
			}
			return result
		},
		async REFRESH_TOKEN(accessToken: string, refreshToken: string) {
			const r = await _refreshToken({ accessToken, refreshToken })
			setToken({
				accessToken: r.accessToken,
				expires: r.expires,
				refreshToken: r.refreshToken
			})
			return r
		},
		LOGOUT() {
			this.name = ''
			this.roles = []
			this.menus = []
			removeToken()
			resetRouter()
			sessionCache.clear()
			useTabsStore().DELETE_ALL()
		}
	}
})

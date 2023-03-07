import { defineStore } from 'pinia'
import { ITheme, DefaultTheme } from '@/types/theme'
import { CacheKey, sessionCache, localCache } from '@/utils/cache'
import { type Application } from '@/types/app'
import { getApplication } from '@/api/app'
import { useTitle } from '@vueuse/core'

const defaultApplication: Application = {
	title: '后台管理',
	logo: '',
	description: ''
}

export const appStore = defineStore('appStore', {
	state: () => ({
		sidebarOpened: localCache.getItem(CacheKey.SidebarOpenedKey) ?? true,
		language: localCache.getItem(CacheKey.LangKey) ?? 'zh-CN',
		componentSize: localCache.getItem(CacheKey.ComponentSizeKey) ?? 'default',
		theme: (sessionCache.getItem(CacheKey.ThemeKey) as ITheme) ?? DefaultTheme,
		settings: (localCache.getItem(CacheKey.ApplicationKey) as Application) ?? defaultApplication
	}),
	actions: {
		SET_SIDEBAR_OPENED() {
			this.sidebarOpened = !this.sidebarOpened
			localCache.setItem(CacheKey.SidebarOpenedKey, this.sidebarOpened)
		},
		SET_LANGUAGE(locale: string) {
			this.language = locale
			localCache.setItem(CacheKey.LangKey, locale)
		},
		SET_COMPONENT_SIZE(size: string) {
			this.componentSize = size
			localCache.setItem(CacheKey.ComponentSizeKey, size)
		},
		SET_THEME(theme: ITheme) {
			this.theme = theme
			sessionCache.setItem(CacheKey.ThemeKey, theme)
		},
		async SET_SETTINGS() {
			try {
				const settings = await getApplication()
				this.settings = settings
				localCache.setItem(CacheKey.ApplicationKey, settings)
				useTitle(settings.title)
			} catch (e) {
				console.error('获取应用信息出错', e)
			}
		},
		REMOVE_THEME() {
			sessionCache.removeItem(CacheKey.ThemeKey)
		}
	}
})

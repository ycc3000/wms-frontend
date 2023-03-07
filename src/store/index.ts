import { userStore } from './modules/user'
import { routerStore } from './modules/router'
import { appStore } from './modules/app'
import { tabsStore } from './modules/tabs'

export function useAppStore() {
	return appStore()
}

export function useUserStore() {
	return userStore()
}

export function useRouterStore() {
	return routerStore()
}

export function useTabsStore() {
	return tabsStore()
}

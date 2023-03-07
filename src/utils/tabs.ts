import { useTabsStore } from '@/store'

// 关闭tab
export const closeTab = (router: any, tab: any) => {
	if (tab.meta && tab.meta.affix) {
		return
	}

	const tabsStore = useTabsStore()
	tabsStore.DELETE(tab)
	toLastView(router, tabsStore.visitedViews, tab)
}

// 关闭其他tabs
export const closeOthersTabs = (router: any, tab: any) => {
	router.push(tab)
	const tabsStore = useTabsStore()
	tabsStore.DELETE_OTHERS(tab)
}

// 关闭全部tabs
export const closeAllTabs = (router: any, tab: any) => {
	const tabsStore = useTabsStore()
	tabsStore.DELETE_ALL()
	toLastView(router, tabsStore.visitedViews, tab)
}

// 跳转到最后一个tab
export const toLastView = (router: any, visitedViews: any[], view: any) => {
	const latestView = visitedViews.slice(-1)[0]
	if (latestView) {
		router.push(latestView.fullPath)
	} else {
		if (view.name === 'Home') {
			router.replace({ path: '/redirect' + view.fullPath })
		} else {
			router.push('/')
		}
	}
}

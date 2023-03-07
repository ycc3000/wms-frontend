import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes, errorRoute } from '@/router'
import { pathToCamel } from '@/utils/tool'
import { Menu } from '@/types/menu'
import { isExternalLink } from '@/utils/validate'

const modules = import.meta.glob('../../views/**/**.vue')
const Layout = () => import('@/layout/index.vue')

// const hasPermission = (roles: string[], route: RouteRecordRaw) => {
// 	if (route.meta && route.meta.roles) {
// 		if (roles.includes('ROOT')) {
// 			return true
// 		}
// 		return roles.some(role => {
// 			if (route.meta?.roles !== undefined) {
// 				return (route.meta.roles as string[]).includes(role)
// 			}
// 		})
// 	}
// 	return true
// }

const getComponent = (component?: string) => {
	if (!component || component.length === 0) {
		return Layout
	}

	const module = modules[`../../views/${component}.vue`] as any
	if (module) {
		return module
	} else {
		return modules['../../views/error-page/404.vue']
	}
}

const generateRoutes = (menus: Menu[]) => {
	const res: RouteRecordRaw[] = []
	menus.forEach(menu => {
		if (!menu.url || menu.url.length === 0) {
			return
		}

		if ((!menu.component || menu.component.length === 0) && !menu.parentId && menu.children && menu.children.length == 0) {
			return
		}

		if (isExternalLink(menu.url)) {
			menu.url = '/_/' + menu.url
		}

		const route = {
			path: menu.url,
			name: pathToCamel(menu.url),
			children: [],
			meta: {
				title: menu.name
			}
		} as RouteRecordRaw

		route.component = getComponent(menu.component)

		if (menu.icon && route.meta) {
			route.meta.icon = menu.icon
		}

		if (menu.hidden && route.meta) {
			route.meta.hidden = menu.hidden
		}

		if (menu.children && menu.children.length > 0) {
			//route.redirect = menu.children?.find(f => f.url && f.url.length > 0)?.url
			if (menu.parentId && menu.parentId.length > 0) {
				route.component = undefined
			}
			route.children = generateRoutes(menu.children)
		}

		res.push(route)
	})
	return res
}

export const routerStore = defineStore('routerStore', {
	state: () => ({
		menuRoutes: [] as RouteRecordRaw[],
		routes: [] as RouteRecordRaw[]
	}),
	actions: {
		SET_MENUS(menus: Menu[]) {
			const menuRoutes = generateRoutes(menus)
			menuRoutes.push(errorRoute)

			this.menuRoutes = menuRoutes
			this.routes = constantRoutes.concat(menuRoutes)
		},
		RESET_ROUTES() {
			this.menuRoutes = []
			this.routes = []
		}
	}
})

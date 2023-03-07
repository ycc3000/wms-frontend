import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useRouterStore, useUserStore } from '@/store'
import { i18n } from '@/i18n'

export const Layout = () => import('@/layout/index.vue')
NProgress.configure({ showSpinner: false })

export const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/redirect',
		component: Layout,
		meta: { hidden: true },
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('@/views/redirect.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: { hidden: true }
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404.vue'),
		meta: { hidden: true }
	},
	{
		path: '/403',
		component: () => import('@/views/error-page/403.vue'),
		meta: { hidden: true }
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401.vue'),
		meta: { hidden: true }
	},
	{
		path: '/',
		component: Layout,
		redirect: '/home',
		children: [
			{
				path: '/home',
				component: () => import('@/views/index.vue'),
				name: 'Home',
				meta: {
					//@ts-ignore
					title: i18n.global.t('router.home'),
					hidden: true,
					affix: true
				}
			},
			{
				path: '/profile/change-password',
				name: 'ChangePassword',
				component: () => import('@/views/profile/change-password.vue'),
				meta: {
					//@ts-ignore
					title: i18n.global.t('router.changePassword'),
					hidden: true
				}
			}
		]
	}
]

export const errorRoute: RouteRecordRaw = {
	path: '/:pathMatch(.*)',
	redirect: '/404'
}

export const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRouter() {
	const routerStore = useRouterStore()
	routerStore.routes.forEach(route => {
		const name = route.name
		if (name && router.hasRoute(name)) {
			router.removeRoute(name)
		}
	})
	routerStore.RESET_ROUTES()
}

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
	NProgress.start()

	if (whiteList.indexOf(to.path) > -1) {
		next()
		return
	}

	const userStore = useUserStore()
	if (!userStore.name) {
		next('/login')
		return
	}

	if (to.path === '/login') {
		next('/')
		return
	}

	const routerStore = useRouterStore()
	if (!routerStore.routes || routerStore.routes.length == 0) {
		try {
			routerStore.SET_MENUS(userStore.menus)
			routerStore.menuRoutes.forEach((route: any) => {
				router.addRoute(route)
			})
			next({ ...to, replace: true })
		} catch (error) {
			console.log(error)
			userStore.LOGOUT()
			next(`/login?redirect=${to.path}`)
		}
	} else {
		next()
	}
})

router.afterEach(() => {
	NProgress.done()
})

import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export const tabsStore = defineStore('tabsStore', {
	state: () => ({
		visitedViews: [] as any[],
		cachedViews: [] as any[]
	}),
	actions: {
		ADD(view: RouteLocationNormalizedLoaded) {
			if (this.visitedViews.some(value => value.path === view.path)) {
				return
			}
			this.visitedViews.push(
				Object.assign({}, view, {
					title: view.meta?.title || 'unknown'
				})
			)
		},
		ADD_CACHED(view: RouteLocationNormalizedLoaded) {
			if (this.cachedViews.includes(view.name)) {
				return
			}

			if (view.meta.cache) {
				this.cachedViews.push(view.name)
			}
		},
		DELETE(view: RouteLocationNormalizedLoaded) {
			for (const [i, v] of this.visitedViews.entries()) {
				if (v.path === view.path) {
					this.visitedViews.splice(i, 1)
					break
				}
			}

			this.DELETE_CACHED(view).then()
		},
		DELETE_CACHED(view: RouteLocationNormalizedLoaded) {
			return new Promise(resolve => {
				const index = this.cachedViews.indexOf(view.name)
				if (index > -1) {
					this.cachedViews.splice(index, 1)
				}
				resolve([...this.cachedViews])
			})
		},
		DELETE_OTHERS(view: RouteLocationNormalizedLoaded) {
			this.visitedViews = this.visitedViews.filter(v => {
				return v.meta.affix || v.path === view.path
			})

			const index = this.cachedViews.indexOf(view.name)
			if (index > -1) {
				this.cachedViews = this.cachedViews.slice(index, index + 1)
			} else {
				this.cachedViews = []
			}
		},
		DELETE_ALL() {
			this.visitedViews = this.visitedViews.filter(tab => tab.meta.affix)
			this.cachedViews = []
		}
	}
})

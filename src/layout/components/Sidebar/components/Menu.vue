<template>
	<el-scrollbar>
		<el-menu
			:default-active="defaultActive"
			:collapse="collapsed"
			:unique-opened="appStore.theme.uniqueOpened"
			:collapse-transition="false"
			background-color="transparent"
			mode="vertical"
		>
			<menu-item v-for="item in routerStore.routes" :key="item.path" :item="item" />
		</el-menu>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { useAppStore, useRouterStore } from '@/store'
import MenuItem from './MenuItem.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const appStore = useAppStore()
const routerStore = useRouterStore()

const collapsed = computed(() => !appStore.sidebarOpened)

const defaultActive = computed(() => {
	const { meta, path } = route
	if (meta?.activeMenu) {
		return meta.activeMenu
	}
	return path
})
</script>

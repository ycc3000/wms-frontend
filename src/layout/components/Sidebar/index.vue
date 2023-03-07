<template>
	<el-aside class="layout-sidebar" :class="sidebarClass">
		<Logo v-if="appStore.theme.isLogo" />
		<Menu />
		<div v-if="appStore.sidebarOpened" class="support">
			<el-divider>
				<el-icon><star-filled /></el-icon>
			</el-divider>
			<div>&copy; {{ appStore.settings.title }} {{ new Date().getFullYear() }}</div>
			<div>支持：PP(ycc3000@qq.com)</div>
		</div>
	</el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
import { StarFilled } from '@element-plus/icons-vue'

const appStore = useAppStore()
const sidebarClass = computed(() => {
	const sidebarOpened = appStore.sidebarOpened ? 'aside-expend' : 'aside-compress'
	const isDark = appStore.theme.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
	return sidebarOpened + ' ' + isDark
})
</script>

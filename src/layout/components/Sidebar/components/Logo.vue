<template>
	<div>
		<div v-if="appStore.sidebarOpened" class="sidebar-logo" @click="gotoHomePage">
			<img :src="settings.logo || '/images/logo.png'" class="logo" alt="" />
			<span class="logo-title"> {{ settings.title || '管理' }}</span>
		</div>
		<div v-else class="sidebar-logo sidebar-logo-expend" :title="settings.title" @click="gotoHomePage">
			<img :src="settings.logo || '/images/logo.png'" class="logo" alt="" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { router } from '@/router'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const settings = computed(() => {
	return appStore.settings
})

const gotoHomePage = () => {
	router.push('/')
}
</script>

<style lang="scss" scoped>
.sidebar-logo {
	width: var(--theme-aside-width) !important;
	height: var(--theme-header-height);
	line-height: var(--theme-header-height);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: rgb(0 21 41 / 2%) 0 1px 4px;
	color: var(--theme-logo-text-color);
	font-size: 18px;
	cursor: pointer;

	.logo {
		width: 25px;
		height: 25px;
	}

	.logo-title {
		margin-left: 10px;
	}
}

.sidebar-logo-expend {
	width: 100% !important;
}
</style>

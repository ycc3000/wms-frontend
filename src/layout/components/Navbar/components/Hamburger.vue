<template>
	<div @click="toogle">
		<svg-icon :icon="icon" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const toogle = () => {
	appStore.SET_SIDEBAR_OPENED()
}

const icon = computed(() => (appStore.sidebarOpened ? 'icon-outdent' : 'icon-indent'))
</script>

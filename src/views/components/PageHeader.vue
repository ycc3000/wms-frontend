<template>
	<span v-if="!showTabs">
		<slot></slot>
	</span>
	<span v-else></span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const showTabs = computed(() => {
	return appStore.theme.isTabsView
})
</script>

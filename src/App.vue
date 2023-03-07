<template>
	<el-config-provider :locale="locale" :size="size">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/store'
import { messages } from '@/i18n'
import { setThemeStyle } from '@/utils/theme'

const appStore = useAppStore()
const locale = computed(() => messages[appStore.language].el)
const size = computed(() => appStore.componentSize)

onMounted(async () => {
	await appStore.SET_SETTINGS()
	nextTick(() => {
		setThemeStyle(appStore.theme)
	})
})
</script>

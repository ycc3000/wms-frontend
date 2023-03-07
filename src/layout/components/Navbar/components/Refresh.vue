<template>
	<svg-icon icon="icon-reload" @click="refresh" />
</template>

<script setup lang="ts">
import { useTabsStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { nextTick } from 'vue'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()

const refresh = () => {
	tabsStore.DELETE_CACHED(route).then(() => {
		nextTick(() => {
			router.replace({ path: '/redirect' + route.path }).catch(err => {
				console.warn(err)
			})
		})
	})
}
</script>

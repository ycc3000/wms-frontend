<template>
	<el-card class="layout-home">
		<h2>{{ settings.title }}</h2>
		<div>{{ settings.description }}</div>
	</el-card>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store'

const { settings } = useAppStore()
</script>
<style scoped>
.layout-home {
	line-height: 2;
	font-size: 15px;
}

.layout-home h2 {
	margin: 6px 0;
}
</style>

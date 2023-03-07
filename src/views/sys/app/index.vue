<template>
	<el-tabs type="border-card">
		<el-tab-pane label="系统配置">
			<Settings />
		</el-tab-pane>
		<el-tab-pane label="系统缓存">
			<Cache />
		</el-tab-pane>
	</el-tabs>
</template>
<script setup lang="ts">
import Settings from './_Settings.vue'
import Cache from './_Cache.vue'
</script>

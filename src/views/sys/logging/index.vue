<template>
	<el-tabs type="border-card" model-value="audit" @tab-change="change">
		<el-tab-pane label="审计日志" name="audit">
			<audit-log />
		</el-tab-pane>
		<el-tab-pane label="Web日志" name="web">
			<web-log ref="webLogRef" />
		</el-tab-pane>
	</el-tabs>
</template>
<script setup lang="ts">
import { TabPaneName } from 'element-plus'
import { ref } from 'vue'
import AuditLog from './_AuditLog.vue'
import WebLog from './_WebLog.vue'

const webLogRef = ref()

const change = (name: TabPaneName) => {
	if (name == 'web') {
		webLogRef.value.init()
	}
}
</script>

<template>
	<el-dialog v-model="state.visible" width="90%" destroy-on-close>
		<json-viewer :data="state.data" />
		<template #footer>
			<el-button @click="state.visible = false">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import JsonViewer from '@/components/JsonViewer.vue'

const state = reactive({
	visible: false,
	data: {}
})

const init = (value: string) => {
	if (value.length == 0) {
		value = '{}'
	}
	state.data = JSON.parse(value)
	state.visible = true
}

defineExpose({
	init
})
</script>

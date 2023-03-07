<template>
	<el-scrollbar>
		<vue-json-pretty :deep="3" :data="data" />
	</el-scrollbar>
</template>
<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
defineProps({
	data: {
		type: Object,
		default: () => {
			return {}
		}
	}
})
</script>

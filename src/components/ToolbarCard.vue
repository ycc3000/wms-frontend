<template>
	<div class="toolbar">
		<div class="header">
			<div class="title"><slot name="title"></slot></div>
			<div><svg-icon :icon="icon" @click="toogle" class="hand" /></div>
		</div>
		<el-collapse-transition>
			<div v-show="opened"><slot></slot></div>
		</el-collapse-transition>
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
	open: {
		type: Boolean,
		default: true
	}
})
const opened = ref(props.open)
const icon = computed(() => (opened.value ? 'icon-down' : 'icon-up'))

const toogle = () => {
	opened.value = !opened.value
}
</script>
<style scoped>
.toolbar {
	background-color: var(--el-bg-color);
	padding: 3px;
}
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--el-fill-color-light);
	padding: 3px;
}
</style>

<template>
	<el-popover ref="selectorRef" :placement="placement" trigger="click" :width="380">
		<template #reference>
			<el-input v-model="data.selected" placeholder="选择图标" readonly>
				<template v-if="data.selected !== ''" #prepend><svg-icon :icon="data.selected" /></template>
				<template #suffix>
					<svg-icon v-if="data.selected !== ''" style="cursor: pointer" icon="icon-close-circle" @click.stop="data.selected = ''" />
				</template>
			</el-input>
		</template>
		<el-input v-model="data.filtername" clearable placeholder="请输入图标名称" @clear="filterIcons" @input="filterIcons">
			<template #suffix><svg-icon icon="icon-search" /></template>
		</el-input>
		<el-scrollbar :max-height="230" noresize>
			<el-row class="iconfont-row" :gutter="10">
				<el-col v-for="(icon, idx) in data.icons" :key="idx" :span="4" class="iconfont-item" @click="select(icon)">
					<div :title="icon" class="iconfont-warp">
						<svg-icon :icon="icon" class-name="svg-size" />
					</div>
				</el-col>
			</el-row>
		</el-scrollbar>
	</el-popover>
</template>
<script setup lang="ts">
import { reactive, watch, onMounted, ref } from 'vue'
import { getIcons } from '@/utils/tool'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	placement: {
		type: String,
		default: 'bottom'
	}
})

const selectorRef = ref()
const emit = defineEmits(['update:modelValue'])

const data = reactive({
	selected: props.modelValue || '',
	_icons: [] as string[],
	icons: [] as string[],
	filtername: ''
})

const select = (icon: string) => {
	data.selected = icon
	selectorRef.value.hide()
}

const filterIcons = () => {
	if (data.filtername.length > 0) {
		data.icons = data._icons.filter(item => item.indexOf(data.filtername) !== -1)
	} else {
		data.icons = data._icons
	}
}

watch(
	() => props.modelValue,
	value => {
		data.selected = value
	}
)

watch(
	() => data.selected,
	value => {
		emit('update:modelValue', value)
	}
)

onMounted(() => {
	data.icons = data._icons = getIcons()
})
</script>
<style scoped lang="scss">
:deep(.svg-size) {
	width: 30px !important;
	height: 30px !important;
	margin-top: 5px;
	margin-bottom: 5px;
}

.iconfont-row {
	border-top: 1px solid var(--theme-border-color-light);
	border-left: 1px solid var(--theme-border-color-light);
}

.iconfont-item {
	text-align: center;
	border-right: 1px solid var(--theme-border-color-light);
	border-bottom: 1px solid var(--theme-border-color-light);
	overflow: hidden;
	display: flex;
	margin: auto;
	justify-content: space-around;
	cursor: pointer;

	&:hover {
		background-color: var(--el-border-color-extra-light);
	}
}

.iconfont-warp {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
}
</style>

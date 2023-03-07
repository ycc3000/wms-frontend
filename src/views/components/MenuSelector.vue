<template>
	<el-tree-select
		v-model="data.id"
		placeholder="请选择..."
		node-key="id"
		:props="{ label: 'name', children: 'children' }"
		:data="data.menus"
		:render-after-expand="false"
		:default-expanded-keys="['']"
		filterable
		check-strictly
	/>
</template>
<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { getTree } from '@/api/menu'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	topLevelName: {
		type: String,
		default: '顶级菜单'
	}
})

const emit = defineEmits(['update:modelValue'])

const data = reactive({
	id: props.modelValue || '',
	menus: [] as any
})

const getMenus = async () => {
	const menus = await getTree()
	data.menus.push({ id: '', name: props.topLevelName, children: menus })
}

watch(
	() => props.modelValue,
	value => {
		data.id = value || ''
	}
)

watch(
	() => data.id,
	value => {
		emit('update:modelValue', value)
	}
)

onMounted(() => {
	getMenus()
})
</script>

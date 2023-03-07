<template>
	<el-dialog v-model="state.visible" title="角色菜单" :close-on-click-modal="false" destroy-on-close @close="resetFields">
		<el-tree
			ref="treeRef"
			placeholder="请选择..."
			node-key="id"
			:props="{ label: 'name', children: 'children' }"
			:data="state.menus"
			:render-after-expand="false"
			default-expand-all
			show-checkbox
		/>
		<template #footer>
			<el-button @click="state.visible = false">取消</el-button>
			<el-button type="primary" @click="submit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { getTree } from '@/api/menu'
import { getMenus, setMenus } from '@/api/role'
import { Menu } from '@/types/menu'
import { message } from '@/utils/message'
import { reactive, ref } from 'vue'

const emit = defineEmits(['refresh'])
const treeRef = ref()

const state = reactive<{ visible: boolean; roleId?: string; menus: Menu[] }>({
	visible: false,
	menus: []
})

const init = async (id: string) => {
	if (id === '') {
		message.error('参数错误：id')
		state.visible = false
		return
	}

	state.visible = true
	state.roleId = id
	state.menus = await getTree()
	const checkedMenuIds = await getMenus(id)
	checkedMenuIds.forEach(menuId => {
		const node = treeRef.value.getNode(menuId)
		if (node && node.isLeaf) {
			treeRef.value.setChecked(node, true)
		}
	})
}

const submit = async () => {
	if (!state.roleId) {
		return
	}
	const halfCheckedKeys = treeRef.value.getHalfCheckedKeys()
	const checkedKeys = treeRef.value.getCheckedKeys(false)
	const keys = halfCheckedKeys.concat(checkedKeys)
	await setMenus(state.roleId, keys)
	message.success('操作成功')
	state.visible = false
	emit('refresh')
}

const resetFields = () => {
	state.menus = []
	state.roleId = undefined
}

defineExpose({
	init
})
</script>

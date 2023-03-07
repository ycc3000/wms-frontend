<template>
	<el-dialog v-model="state.visible" title="角色权限" :close-on-click-modal="false" destroy-on-close @close="resetFields">
		<el-tree
			ref="treeRef"
			placeholder="请选择..."
			node-key="name"
			:props="{ label: 'title', children: 'children' }"
			:data="state.permissions"
			:render-after-expand="false"
			default-expand-all
			show-checkbox
			check-strictly
			@check-change="checkChanged"
		/>
		<template #footer>
			<el-button @click="state.visible = false">取消</el-button>
			<el-button type="primary" @click="submit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { getTree } from '@/api/permission'
import { getPermissions, setPermissions } from '@/api/role'
import { Permission } from '@/types/permission'
import { message } from '@/utils/message'
import { reactive, ref } from 'vue'

const emit = defineEmits(['refresh'])
const treeRef = ref()

const state = reactive<{ visible: boolean; roleId?: string; permissions: Permission[]; checked: string[] }>({
	visible: false,
	permissions: [],
	checked: []
})

const init = async (id: string) => {
	if (id === '') {
		message.error('参数错误：id')
		state.visible = false
		return
	}

	state.visible = true
	state.roleId = id
	state.permissions = await getTree()
	const checked = await getPermissions(id)
	treeRef.value.setCheckedKeys(checked)
}

const checkChanged = (data: { name: string }, checked: boolean) => {
	const node = treeRef.value.getNode(data.name)
	if (!node) {
		return
	}

	if (checked) {
		if (node.parent && node.parent.key) {
			treeRef.value.setChecked(node.parent, true, false)
		}
	} else {
		if (node.childNodes && node.childNodes.length > 0) {
			node.childNodes.forEach((child: any) => {
				treeRef.value.setChecked(child, false, true)
			})
		}
	}
}

const submit = async () => {
	if (!state.roleId) {
		return
	}

	const keys = treeRef.value.getCheckedKeys(false)
	await setPermissions(state.roleId, keys)
	message.success('操作成功')
	state.visible = false
	emit('refresh')
}

const resetFields = () => {
	state.permissions = []
	state.roleId = undefined
}

defineExpose({
	init
})
</script>

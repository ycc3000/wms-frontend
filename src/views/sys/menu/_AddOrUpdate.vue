<template>
	<el-dialog
		v-model="state.visible"
		:title="!state.formdata.id ? '新增' : '修改'"
		:close-on-click-modal="false"
		destroy-on-close
		@close="resetFields"
	>
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px">
			<el-form-item prop="type" label="类型">
				<el-radio-group v-model="state.formdata.type" :disabled="!!state.formdata.id">
					<el-radio :label="MenuType.Menu">菜单</el-radio>
					<el-radio :label="MenuType.ExternalLink">外链</el-radio>
					<el-radio :label="MenuType.MobileMenu">PDA菜单</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="parentId" label="父级菜单">
				<menu-selector v-model="state.formdata.parentId" />
			</el-form-item>
			<el-form-item prop="name" label="名称">
				<el-input v-model="state.formdata.name" placeholder="名称" />
			</el-form-item>
			<el-form-item v-if="state.formdata.type == MenuType.ExternalLink" prop="url" label="外链地址">
				<el-input v-model="state.formdata.url" placeholder="http(s)://" />
			</el-form-item>
			<el-form-item v-if="state.formdata.type == MenuType.MobileMenu" prop="url" label="URL">
				<el-input v-model="state.formdata.url">
					<template #prepend>/pages/</template>
				</el-input>
			</el-form-item>
			<template v-if="state.formdata.type == MenuType.Menu">
				<el-form-item v-if="state.formdata.parentId && state.formdata.parentId !== ''" prop="component" label="页面组件">
					<el-input v-model="state.formdata.component" placeholder="sys/user/index">
						<template #prepend>/src/views/</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="url" label="页面路由">
					<el-input v-model="state.formdata.url" placeholder="/sys/user" />
				</el-form-item>
			</template>
			<el-form-item prop="icon" label="图标">
				<icon-selector v-model="state.formdata.icon" placement="top-start" />
			</el-form-item>
			<el-form-item prop="hidden" label="状态">
				<el-radio-group v-model="state.formdata.hidden">
					<el-radio :label="false">显示</el-radio>
					<el-radio :label="true">隐藏</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="state.formdata.sort" :min="0" label="排序" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="state.visible = false">取消</el-button>
			<el-button type="primary" @click="submit">提交</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import MenuSelector from '@/views/components/MenuSelector.vue'
import { message } from '@/utils/message'
import { createOrUpdate } from '@/api/menu'
import { MenuType, type Menu, type EditMenu } from '@/types/menu'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const getDefaultFormData = (): EditMenu => {
	return {
		parentId: '',
		name: '',
		type: 0,
		sort: 0,
		hidden: false
	}
}

const state = reactive({
	visible: false,
	roles: [],
	formdata: getDefaultFormData()
})

const add = (parentId?: string) => {
	state.visible = true
	state.formdata.parentId = parentId ?? ''
}

const edit = (item: Menu) => {
	if (!item) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	state.formdata = item
}

const dataRules = reactive({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	url: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const submit = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		const data = state.formdata
		if (data.parentId == '') {
			data.parentId = undefined
		}
		if (data.icon == '') {
			data.icon = undefined
		}

		await createOrUpdate(data)
		message.success('操作成功')
		state.visible = false
		emit('refresh')
	})
}

const resetFields = () => {
	state.formdata = getDefaultFormData()
}

defineExpose({
	add,
	edit
})
</script>

<template>
	<el-dialog
		v-model="state.visible"
		:title="!!state.formdata.id ? '修改' : '新增'"
		:close-on-click-modal="false"
		destroy-on-close
		@close="resetFields"
	>
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px" @keyup.enter="submit">
			<el-form-item prop="loginName" label="登录名">
				<el-input v-model="state.formdata.loginName" placeholder="登录名" />
			</el-form-item>
			<el-form-item prop="realName" label="姓名">
				<el-input v-model="state.formdata.realName" placeholder="姓名" />
			</el-form-item>
			<el-form-item prop="mobile" label="手机号">
				<el-input v-model="state.formdata.mobile" placeholder="手机号" />
			</el-form-item>
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="state.formdata.email" placeholder="邮箱" />
			</el-form-item>
			<el-form-item prop="isActive" label="状态">
				<el-radio-group v-model="state.formdata.isActive">
					<el-radio :label="true">启用</el-radio>
					<el-radio :label="false">禁用</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="所属角色">
				<el-select v-model="state.formdata.roleIds" multiple placeholder="所属角色" style="width: 100%">
					<el-option v-for="role in state.roles" :key="role.id" :disabled="!role.enabled" :label="role.name" :value="role.id" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="state.visible = false">取消</el-button>
			<el-button type="primary" @click="submit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getRoles } from '@/api/role'
import { EditUser } from '@/types/user'
import { message } from '@/utils/message'
import { canEmptyEmailValidator, canEmptyMobileValidator } from '@/utils/validator'
import { createOrUpdate } from '@/api/user'
import { Role } from '@/types/role'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const getDefaultFormData = (): EditUser => {
	return {
		loginName: '',
		realName: '',
		isActive: true,
		roleIds: []
	}
}

const state = reactive({
	visible: false,
	roles: [] as Role[],
	formdata: getDefaultFormData()
})

const add = async () => {
	state.visible = true
	state.formdata.id = undefined
	state.roles = await getRoles({})
}

const edit = async (user: EditUser) => {
	if (!user) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	state.formdata = user
	state.roles = await getRoles({})
}

const dataRules = reactive({
	loginName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	realName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mobile: [{ validator: canEmptyMobileValidator, trigger: 'blur' }],
	email: [{ validator: canEmptyEmailValidator, trigger: 'blur' }]
})

const submit = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		await createOrUpdate(state.formdata)
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

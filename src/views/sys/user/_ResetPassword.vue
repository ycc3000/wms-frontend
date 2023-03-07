<template>
	<el-dialog v-model="state.visible" title="重置密码" :close-on-click-modal="false" destroy-on-close @close="resetFields">
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px" @keyup.enter="submit">
			<el-form-item label="用户名">
				<span>{{ state.formdata.username }}</span>
			</el-form-item>
			<el-form-item prop="newPassword" label="新密码">
				<el-input v-model="state.formdata.newPassword" type="password" show-password />
			</el-form-item>
			<el-form-item prop="confirmPassword" label="确认新密码">
				<el-input v-model="state.formdata.confirmPassword" type="password" show-password />
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
import { message } from '@/utils/message'
import { resetPassword } from '@/api/user'

const dataFormRef = ref()

const state = reactive({
	visible: false,
	formdata: {
		username: '',
		newPassword: '',
		confirmPassword: ''
	}
})

const init = async (username: string) => {
	if (username.length == 0) {
		return
	}
	state.visible = true
	state.formdata.username = username
}

const confirmPasswordValidator = (_rule: any, value: any, callback: (_e?: Error) => any) => {
	if (!value || value === '') {
		callback(new Error('必填项不能为空'))
	} else if (value !== state.formdata.newPassword) {
		callback(new Error('确认密码与输入的新密码不一致'))
	} else {
		callback()
	}
}

const dataRules = reactive({
	newPassword: [
		{
			required: true,
			message: '必填项不能为空',
			trigger: 'blur'
		},
		{
			min: 6,
			message: '密码长度最少6位'
		}
	],
	confirmPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }]
})

const submit = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		await resetPassword({
			username: state.formdata.username,
			password: state.formdata.newPassword
		})
		message.success('操作成功')
		state.visible = false
	})
}

const resetFields = () => {
	state.formdata.username = state.formdata.newPassword = state.formdata.confirmPassword = ''
}

defineExpose({
	init
})
</script>

<template>
	<el-card>
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="200px" @keyup.enter="changePassword()">
			<el-form-item :label="$t('profile.username')">
				<span>{{ username }}</span>
			</el-form-item>
			<el-form-item prop="password" :label="$t('profile.oldPassword')">
				<el-input v-model="dataForm.password" type="password" />
			</el-form-item>
			<el-form-item prop="newPassword" :label="$t('profile.newPassword')">
				<el-input v-model="dataForm.newPassword" type="password" />
			</el-form-item>
			<el-form-item prop="confirmPassword" :label="$t('profile.confirmPassword')">
				<el-input v-model="dataForm.confirmPassword" type="password" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="changePassword">{{ $t('confirm') }}</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup lang="ts" name="ProfilePassword">
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { changePassword as _changePassword } from '@/api/user'
import { FormInstance } from 'element-plus'
import { closeTab } from '@/utils/tabs'
import { notification } from '@/utils/message'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const dataFormRef = ref<FormInstance>()

const username = computed(() => {
	return useUserStore()?.name
})

const dataForm = reactive({
	password: '',
	newPassword: '',
	confirmPassword: ''
})

const confirmPasswordValidator = (_rule: any, value: any, callback: (_e?: Error) => any) => {
	if (!value || value === '') {
		callback(new Error(t('required')))
	} else if (value !== dataForm.newPassword) {
		callback(new Error('确认密码与输入的新密码不一致'))
	} else {
		callback()
	}
}

const dataRules = reactive({
	password: [{ required: true, message: t('required'), trigger: 'blur' }],
	newPassword: [
		{
			required: true,
			message: t('required'),
			trigger: 'blur'
		},
		{
			min: 6,
			message: '密码长度最少6位'
		}
	],
	confirmPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }]
})

const changePassword = () => {
	if (!dataFormRef.value) {
		return
	}
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		await _changePassword({
			oldPassword: dataForm.password,
			newPassword: dataForm.newPassword
		})
		notification.success('修改成功')
		closeTab(router, route)
	})
}
</script>

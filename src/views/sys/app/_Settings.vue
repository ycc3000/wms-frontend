<template>
	<el-card v-loading="state.loading">
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px">
			<el-form-item prop="title" label="应用名称">
				<el-input v-model="state.formdata.title" placeholder="应用名称" />
			</el-form-item>
			<el-form-item label="LOGO">
				<base64-image-selector
					:data="state.formdata.logo"
					:limit-file-size="200"
					tip="只能上传 jpg/png 文件，且不超过 200K，最佳大小25*25"
					@selected="onLogoSelected"
				/>
			</el-form-item>
			<el-form-item prop="description" label="应用描述">
				<el-input v-model="state.formdata.description" :rows="2" type="textarea" placeholder="应用描述" />
			</el-form-item>
			<el-form-item prop="defaultUserPassword" label="默认用户密码">
				<el-input v-model="state.formdata.defaultUserPassword" placeholder="默认用户密码" type="password" show-password />
			</el-form-item>
			<el-form-item>
				<el-button v-permissions="[AppSettingPermission.Update]" type="primary" @click="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script setup lang="ts">
import { Setting } from '@/types/app'
import { message, notification } from '@/utils/message'
import { onMounted, reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { getSetting, setSetting } from '@/api/app'
import { AppSettingPermission } from '@/permissions/app'
import Base64ImageSelector from '@/components/Base64ImageSelector.vue'
import { UploadFileResult } from '@/types/file'

const dataFormRef = ref()
const state = reactive<{ loading: boolean; formdata: Setting }>({
	loading: false,
	formdata: {
		title: '',
		logo: '',
		description: '',
		defaultUserPassword: ''
	}
})

const dataRules = reactive({
	title: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	defaultUserPassword: [
		{ required: true, message: '必填项不能为空', trigger: 'blur' },
		{ min: 6, message: '密码长度最少6位' }
	]
})

const onLogoSelected = (result: UploadFileResult) => {
	if (!result.success) {
		notification.error(result.message)
		return
	}
	state.formdata.logo = result.data
}

const load = async () => {
	state.loading = true
	try {
		state.formdata = await getSetting()
	} finally {
		state.loading = false
	}
}

const submit = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		state.loading = true

		try {
			await setSetting(state.formdata)
			useAppStore().SET_SETTINGS()
			message.success('操作成功')
		} finally {
			state.loading = false
		}
	})
}

onMounted(() => {
	load()
})
</script>

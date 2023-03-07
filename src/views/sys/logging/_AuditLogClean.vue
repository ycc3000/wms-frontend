<template>
	<el-dialog v-model="state.visible" title="清理日志" :close-on-click-modal="false" destroy-on-close @close="resetFields">
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules">
			<el-form-item prop="before" label="该日期之前的所有日志都将被清空：">
				<el-date-picker
					v-model="state.formdata.before"
					type="date"
					placeholder="选择日期"
					:disabled-date="disabledDate"
					:shortcuts="shortcuts"
					format="YYYY-MM-DD"
					value-format="YYYY-MM-DD"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="state.visible = false">取消</el-button>
			<el-button type="danger" @click="submit">提交</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { messagebox, notification } from '@/utils/message'
import { clear } from '@/api/logging'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const state = reactive({
	visible: false,
	roles: [],
	formdata: {
		before: ''
	}
})

const dataRules = reactive({
	before: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const submit = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		messagebox.confirm(`确认要清理${state.formdata.before}之前的日志？`).then(async () => {
			await clear({ before: state.formdata.before })
			notification.success('操作成功')
			state.visible = false
			state.formdata.before = ''
			emit('refresh')
		})
	})
}

const shortcuts = [
	{
		text: '1年前',
		value: () => {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 365)
			return date
		}
	},
	{
		text: '半年前',
		value: () => {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 180)
			return date
		}
	},
	{
		text: '30天前',
		value: () => {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
			return date
		}
	},
	{
		text: '7天前',
		value: () => {
			const date = new Date()
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
			return date
		}
	}
]

const disabledDate = (time: Date) => {
	return time.getTime() > Date.now()
}

const init = () => {
	state.visible = true
}

const resetFields = () => {
	state.formdata.before = ''
}

defineExpose({
	init
})
</script>

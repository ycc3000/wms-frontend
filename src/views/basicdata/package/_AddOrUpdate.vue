<template>
	<el-dialog
		v-model="state.visible"
		:title="!!state.formdata.id ? '修改' : '新增'"
		:close-on-click-modal="false"
		destroy-on-close
		@close="resetFields"
	>
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px">
			<el-form-item prop="code" label="包装型号/编码">
				<el-input v-model="state.formdata.code" placeholder="包装型号/编码" />
			</el-form-item>
			<el-form-item prop="name" label="包装名称">
				<el-input v-model="state.formdata.name" placeholder="包装名称" />
			</el-form-item>
			<el-form-item prop="typeId" label="包装类型">
				<el-select v-model="state.formdata.typeId" filterable>
					<el-option v-for="(item, idx) in state.types" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
						<div class="line">
							<span>{{ item.name }}</span>
							<span class="sub">{{ item.code }}</span>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="description" label="备注">
				<el-input v-model="state.formdata.description" placeholder="备注" />
			</el-form-item>
			<el-form-item prop="enabled" label="状态">
				<el-radio-group v-model="state.formdata.enabled">
					<el-radio :label="true">启用</el-radio>
					<el-radio :label="false">禁用</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="state.visible = false">取消</el-button>
			<el-button type="primary" @click="submit">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { createOrUpdate } from '@/api/basicdata/package'
import { EditPackage } from '@/types/basicdata/package'
import { getItems as getTypes } from '@/api/basicdata/package/packagetype'
import { PackageType } from '@/types/basicdata/package'
import { message } from '@/utils/message'
import { reactive, ref, onMounted } from 'vue'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const getDefaultFormData = (): EditPackage => {
	return {
		code: '',
		name: '',
		typeId: '',
		enabled: true
	}
}

const state = reactive({
	visible: false,
	formdata: getDefaultFormData(),
	types: [] as PackageType[]
})

const add = async () => {
	state.visible = true
	state.formdata.id = undefined
}

const edit = async (item: EditPackage) => {
	if (!item) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	state.formdata = item
}

const dataRules = reactive({
	code: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	typeId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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

onMounted(async () => {
	state.types = await getTypes()
})

defineExpose({
	add,
	edit
})
</script>

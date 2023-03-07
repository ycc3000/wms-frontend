<template>
	<el-dialog
		v-model="state.visible"
		:title="!!state.formdata.id ? '修改' : '新增'"
		:close-on-click-modal="false"
		destroy-on-close
		@close="resetFields"
	>
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px">
			<el-form-item prop="materialId" label="物料">
				<el-select v-model="state.formdata.materialId" filterable>
					<el-option v-for="(item, idx) in state.materials" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
						<div class="line">
							<span>{{ item.name }}</span>
							<span class="sub">{{ item.code }}</span>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="supplierId" label="供应商">
				<el-select v-model="state.formdata.supplierId" filterable>
					<el-option v-for="(item, idx) in state.suppliers" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
						<div class="line">
							<span>{{ item.name }}</span>
							<span class="sub">{{ item.code }}</span>
						</div>
					</el-option>
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
import { getItems as getMaterials } from '@/api/basicdata/material'
import { getItems as getSuppliers } from '@/api/basicdata/supplier'
import { createOrUpdate } from '@/api/basicdata/material/supplier'
import { EditMaterialSupplier, Material } from '@/types/basicdata/material'
import { message } from '@/utils/message'
import { reactive, ref, onMounted } from 'vue'
import { Supplier } from '@/types/basicdata/supplier'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const getDefaultFormData = (): EditMaterialSupplier => {
	return {
		materialId: '',
		supplierId: ''
	}
}

const state = reactive({
	loading: false,
	visible: false,
	formdata: getDefaultFormData(),
	materials: [] as Material[],
	suppliers: [] as Supplier[]
})

const init = async () => {
	state.materials = await getMaterials()
	state.suppliers = await getSuppliers()
}

const add = async () => {
	state.visible = true
	state.formdata.id = undefined
}

const edit = async (item: EditMaterialSupplier) => {
	if (!item) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	state.formdata = item
}

const dataRules = reactive({
	materialId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	supplierId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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

onMounted(() => {
	init()
})

defineExpose({
	add,
	edit
})
</script>

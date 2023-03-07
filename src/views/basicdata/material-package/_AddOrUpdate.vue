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
				<el-select v-model="state.formdata.materialId" @change="onMaterialChanged" filterable>
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
					<el-option
						v-for="(item, idx) in state.suppliers"
						:key="idx"
						:label="item.supplier.name"
						:value="item.supplierId"
						:disabled="!item.supplier.enabled"
					>
						<div class="line">
							<span>{{ item.supplier.name }}</span>
							<span class="sub">{{ item.supplier.code }}</span>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="packageId" label="包装">
				<el-select v-model="state.formdata.packageId" filterable>
					<el-option v-for="(item, idx) in state.packages" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
						<div class="line">
							<span>{{ item.name }}</span>
							<span class="sub">{{ item.code }}</span>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="snp" label="包装标准收容数">
				<el-input-number v-model.number="state.formdata.snp" :min="0" />
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
import { getItems as getPackages } from '@/api/basicdata/package'
import { getItems as getMaterialSuppliers } from '@/api/basicdata/material/supplier'
import { createOrUpdate } from '@/api/basicdata/material/package'
import { EditMaterialPackage, Material, MaterialSupplier } from '@/types/basicdata/material'
import { message } from '@/utils/message'
import { reactive, ref, onMounted } from 'vue'
import { Package } from '@/types/basicdata/package'
import { gt0Validator } from '@/utils/validator'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const getDefaultFormData = (): EditMaterialPackage => {
	return {
		materialId: '',
		packageId: '',
		supplierId: '',
		snp: 1
	}
}

const state = reactive({
	loading: false,
	visible: false,
	formdata: getDefaultFormData(),
	materials: [] as Material[],
	packages: [] as Package[],
	suppliers: [] as MaterialSupplier[]
})

const init = async () => {
	state.materials = await getMaterials()
	state.packages = await getPackages()
}

const onMaterialChanged = async (val: string) => {
	state.suppliers = await getMaterialSuppliers(val)
}

const add = async () => {
	state.visible = true
	state.formdata.id = undefined
}

const edit = async (item: EditMaterialPackage) => {
	if (!item) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	state.formdata = item
}

const dataRules = reactive({
	packageId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	materialId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	supplierId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	snp: [
		{ required: true, message: '必填项不能为空', trigger: 'blur' },
		{
			validator: gt0Validator,
			trigger: 'blur'
		}
	]
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

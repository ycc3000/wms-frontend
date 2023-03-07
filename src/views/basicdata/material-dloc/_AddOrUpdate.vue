<template>
	<el-dialog
		v-model="state.visible"
		:title="!!state.formdata.id ? '修改' : '新增'"
		:close-on-click-modal="false"
		destroy-on-close
		@close="resetFields"
	>
		<el-form ref="dataFormRef" :model="state.formdata" :rules="dataRules" label-width="120px">
			<el-form-item prop="warehouseId" label="仓库">
				<el-select v-model="state.formdata.warehouseId" @change="onWarehouseChanged">
					<el-option v-for="(item, idx) in state.warehouses" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
						<div class="line">
							<span>{{ item.name }}</span>
							<span class="sub">{{ item.code }}</span>
						</div>
					</el-option>
				</el-select>
			</el-form-item>
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
			<el-form-item prop="receiveDlocId" label="默认收货库位">
				<el-select v-model="state.formdata.receiveDlocId" filterable>
					<el-option-group v-for="(group, gidx) in state.groupedLocations" :key="gidx" :label="group.groupName">
						<el-option v-for="(item, idx) in group.locations" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
							<div class="line">
								<span>{{ item.name }}</span>
								<span class="sub">{{ item.code }}</span>
							</div>
						</el-option>
					</el-option-group>
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
import { getItems as getWarehouses } from '@/api/basicdata/warehouse'
import { getGroupedItems } from '@/api/basicdata/warehouse/location'
import { getItems as getMaterials } from '@/api/basicdata/material'
import { createOrUpdate } from '@/api/basicdata/material/dloc'
import { EditMaterialDloc, Material } from '@/types/basicdata/material'
import { Warehouse, GroupedLocation } from '@/types/basicdata/warehouse'
import { message } from '@/utils/message'
import { reactive, ref, onMounted } from 'vue'

const emit = defineEmits(['refresh'])
const dataFormRef = ref()

const getDefaultFormData = (): EditMaterialDloc => {
	return {
		warehouseId: '',
		materialId: '',
		receiveDlocId: ''
	}
}

const state = reactive({
	loading: false,
	visible: false,
	formdata: getDefaultFormData(),
	warehouses: [] as Warehouse[],
	materials: [] as Material[],
	groupedLocations: [] as GroupedLocation[]
})

const init = async () => {
	state.warehouses = await getWarehouses()
	state.materials = await getMaterials()
}

const onWarehouseChanged = async (val: string) => {
	state.formdata.receiveDlocId = ''
	if (val == '') {
		return
	}
	state.groupedLocations = await getGroupedItems(val)
}

const add = async () => {
	state.visible = true
	state.formdata.id = undefined
}

const edit = async (item: EditMaterialDloc) => {
	if (!item) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	onWarehouseChanged(item.warehouseId)
	state.formdata = item
}

const dataRules = reactive({
	warehouseId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	materialId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	receiveDlocId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	code: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
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

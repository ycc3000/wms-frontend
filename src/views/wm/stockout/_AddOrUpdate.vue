<template>
	<el-dialog
		v-model="state.visible"
		:title="!!data.formdata.id ? `修改出库单：${state.stockOutNo}` : '新增出库单'"
		:close-on-click-modal="false"
		width="90%"
		destroy-on-close
		@close="resetFields"
	>
		<el-tabs v-model="state.activeTabName" type="border-card" @tab-change="onTabChanged">
			<el-tab-pane label="基本" name="base">
				<el-form ref="formRef" :model="data.formdata" :rules="dataRules" label-width="120px">
					<el-row>
						<el-col :span="8">
							<el-form-item prop="businessType" label="业务类型">
								<el-select v-model="data.formdata.businessType">
									<el-option label="正常出库" value="正常出库" />
									<el-option label="其他" value="其他" />
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item prop="warehouseId" label="仓库">
								<el-select v-model="data.formdata.warehouseId" :disabled="!!data.formdata.id && !state.canChangeWarehouse">
									<el-option v-for="(item, idx) in data.warehouses" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
										<div class="line">
											<span>{{ item.name }}</span>
											<span class="sub">{{ item.code }}</span>
										</div>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="备注">
								<el-input v-model="data.formdata.comments" placeholder="备注" />
							</el-form-item>
							<el-form-item>
								<el-button :loading="state.loading" type="primary" @click="submit">保存基本信息</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="明细" name="details" :disabled="!data.formdata.id">
				<detail-edit ref="detailRef" />
			</el-tab-pane>
		</el-tabs>
		<template #footer>
			<el-button @click="state.visible = false">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { message } from '@/utils/message'
import { reactive, ref, onMounted } from 'vue'
import { EditStockOut } from '@/types/wm/stockout'
import { Warehouse } from '@/types/basicdata/warehouse'
import { getItems as getWarehouses } from '@/api/basicdata/warehouse'
import { create, update, getById } from '@/api/wm/stockout'
import DetailEdit from './_DetailEdit.vue'

const emit = defineEmits(['refresh'])
const formRef = ref()
const detailRef = ref()

const getDefaultFormData = (): EditStockOut => {
	return {
		businessType: '',
		warehouseId: ''
	}
}

const state = reactive<{ visible: boolean; activeTabName: string; stockOutNo: string; canChangeWarehouse: boolean; loading: boolean }>({
	visible: false,
	activeTabName: 'base',
	loading: false,
	stockOutNo: '',
	canChangeWarehouse: false
})

const data = reactive<{ warehouses: Warehouse[]; formdata: EditStockOut }>({
	warehouses: [],
	formdata: getDefaultFormData()
})

const dataRules = reactive({
	warehouseId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	businessType: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const add = async () => {
	state.visible = true
	data.formdata.id = undefined
}

const edit = async (id: string) => {
	const item = await getById(id)
	if (!item) {
		message.error('未能加载数据，可能已被删除。')
		return
	}
	state.visible = true
	state.canChangeWarehouse = !item.hasDetails
	state.stockOutNo = item.stockOutNo
	data.formdata = item
}

const submit = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}

		try {
			state.loading = true
			if (data.formdata.id) {
				await update(data.formdata)
				message.success('操作成功')
				state.visible = false
			} else {
				data.formdata.id = await create(data.formdata)
				state.activeTabName = 'details'
			}
		} finally {
			state.loading = false
		}

		emit('refresh')
	})
}

const onTabChanged = () => {
	if (state.activeTabName == 'details') {
		detailRef.value.init(data.formdata.id, data.formdata.warehouseId)
	}
}

const resetFields = () => {
	state.activeTabName = 'base'
	data.formdata = getDefaultFormData()
	detailRef.value.resetFields()
}

onMounted(async () => {
	data.warehouses = await getWarehouses()
})

defineExpose({
	add,
	edit
})
</script>

<template>
	<div>
		<el-form ref="formRef" :model="data.formdata" :rules="dataRules" label-width="130px">
			<el-row>
				<el-col :span="8">
					<el-form-item prop="materialId" label="物料">
						<el-select v-model="data.formdata.materialId" @change="onMaterialChanged">
							<el-option v-for="(item, idx) in data.materials" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
								<div class="line">
									<span>{{ item.name }}</span>
									<span class="sub">{{ item.code }}</span>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="supplierId" label="供应商">
						<el-select v-model="data.formdata.supplierId" @change="onSupplierChanged">
							<el-option
								v-for="(item, idx) in data.suppliers"
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
				</el-col>
				<el-col :span="8">
					<el-form-item prop="packageId" label="包装型号">
						<el-select v-model="data.formdata.packageId" @change="getMaterialPackage">
							<el-option v-for="(item, idx) in data.materialPackages" :key="idx" :label="item.package.name" :value="item.packageId">
								<div class="line">
									<span>{{ item.package.name }}</span>
									<span class="sub">{{ item.package.code }}</span>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item prop="dlocId" label="出库库位">
						<el-select v-model="data.formdata.dlocId" filterable>
							<el-option-group v-for="(group, gidx) in data.dlocs" :key="gidx" :label="group.groupName">
								<el-option v-for="(item, idx) in group.locations" :key="idx" :label="item.name" :value="item.id" :disabled="!item.enabled">
									<div class="line">
										<span>{{ item.name }}</span>
										<span class="sub">{{ item.code }}</span>
									</div>
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="库存数量">
						<el-input v-model="data.stockQty" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="snp" label="包装收容数">
						<el-input v-model.number="data.formdata.snp" disabled />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form-item prop="requiredQty" label="需求物料数">
						<el-input-number v-model.number="data.formdata.requiredQty" @change="calcPackageQty" :min="0" :precision="2" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="需求包装数">
						<el-input v-model="data.requiredPackageQty" disabled />
					</el-form-item>
				</el-col>
				<el-col :span="8" />
			</el-row>
		</el-form>
		<div class="flex content-flex-end"><el-button type="primary" :loading="state.saving" @click="save">保存明细</el-button></div>
		<br />
		<el-table v-loading="state.loading" max-height="300px" :data="data.items" stripe border>
			<el-table-column label="物料">
				<template #default="scope">
					<span class="sub">({{ scope.row.material?.code }})</span>
					<span>{{ scope.row.material?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="物料单位">
				<template #default="scope">
					<span class="sub">({{ scope.row.baseUnit?.code }})</span>
					<span>{{ scope.row.baseUnit?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="供应商">
				<template #default="scope">
					<span class="sub">({{ scope.row.supplier?.code }})</span>
					<span>{{ scope.row.supplier?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="包装型号">
				<template #default="scope">
					<span class="sub">({{ scope.row.package?.code }})</span>
					<span>{{ scope.row.package?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="snp" label="包装收容数" />
			<el-table-column label="出库区">
				<template #default="scope">
					<span class="sub">({{ scope.row.zone?.code }})</span>
					<span>{{ scope.row.zone?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="出库库位">
				<template #default="scope">
					<span class="sub">({{ scope.row.dloc?.code }})</span>
					<span>{{ scope.row.dloc?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="requiredQty" label="需求物料数" />
			<el-table-column label="操作" fixed="right" width="80" align="center">
				<template #default="scope">
					<el-button type="primary" link @click="edit(scope.row)">
						<svg-icon icon="icon-edit" />
					</el-button>
					<el-popconfirm title="确认删除吗" @confirm="del(scope.row.id)">
						<template #reference>
							<el-button type="danger" link>
								<svg-icon icon="icon-close" />
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script setup lang="ts">
import { notification } from '@/utils/message'
import { reactive, ref } from 'vue'
import { EditStockOutDetail, StockOutDetail } from '@/types/wm/stockout'
import { GroupedLocation } from '@/types/basicdata/warehouse'
import { getItems as getMaterials } from '@/api/basicdata/material'
import { getItem as _getMaterialDloc } from '@/api/basicdata/material/dloc'
import { getItems as getMaterialSuppliers } from '@/api/basicdata/material/supplier'
import { getGroupedItems as getDlocs } from '@/api/basicdata/warehouse/location'
import { getItems as _getMaterialPackages, getItem as _getMaterialPackage } from '@/api/basicdata/material/package'
import { saveDetail, getDetails, deleteDetail } from '@/api/wm/stockout'
import { getStockQty as _getStockQty } from '@/api/wm/stock'
import { Material, MaterialPackage, MaterialSupplier } from '@/types/basicdata/material'
import { gt0Validator } from '@/utils/validator'

const formRef = ref()

const getDefaultFormData = (): EditStockOutDetail => {
	return {
		stockOutId: '',
		materialId: '',
		supplierId: '',
		packageId: '',
		dlocId: '',
		snp: 0,
		requiredQty: 0
	}
}

const state = reactive<{ saving: boolean; loading: boolean; stockOutId: string; warehouseId: string }>({
	loading: false,
	saving: false,
	stockOutId: '',
	warehouseId: ''
})

const data = reactive<{
	formdata: EditStockOutDetail
	materials: Material[]
	suppliers: MaterialSupplier[]
	materialPackages: MaterialPackage[]
	dlocs: GroupedLocation[]
	items: StockOutDetail[]
	stockQty: number | undefined
	requiredPackageQty: number | undefined
}>({
	formdata: getDefaultFormData(),
	materials: [],
	suppliers: [],
	materialPackages: [],
	dlocs: [],
	items: [],
	stockQty: undefined,
	requiredPackageQty: undefined
})

const dataRules = reactive({
	materialId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	supplierId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	packageId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	snp: [
		{ required: true, message: '必填项不能为空', trigger: 'blur' },
		{
			validator: gt0Validator,
			trigger: 'blur'
		}
	],
	requiredQty: [
		{ required: true, message: '必填项不能为空', trigger: 'blur' },
		{
			validator: gt0Validator,
			trigger: 'blur'
		}
	]
})

const getlist = async () => {
	try {
		state.loading = true
		data.items = await getDetails(state.stockOutId)
	} finally {
		state.loading = false
	}
}

const save = () => {
	formRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}
		try {
			state.saving = true
			data.formdata.stockOutId = state.stockOutId
			await saveDetail(data.formdata)
			await getlist()
		} finally {
			data.formdata.id = undefined
			data.formdata.requiredQty = 0
			data.formdata.packageId = ''
			data.formdata.snp = 0
			data.requiredPackageQty = undefined
			state.saving = false
		}
	})
}

const del = async (id: string) => {
	try {
		state.loading = true
		await deleteDetail(id)
	} finally {
		state.loading = false
	}
	getlist()
}

const edit = async (val: StockOutDetail) => {
	if (!val) {
		return
	}

	data.formdata = {
		id: val.id,
		stockOutId: val.stockOutId,
		materialId: val.materialId,
		supplierId: val.supplierId,
		packageId: val.packageId,
		dlocId: val.dlocId,
		snp: val.snp,
		requiredQty: val.requiredQty
	}

	await getMaterialDloc()
	data.suppliers = await getMaterialSuppliers(val.materialId)
	await getMaterialPackages()
	await getStockQty()
	calcPackageQty()
}

const onMaterialChanged = async () => {
	await getMaterialDloc()
	data.formdata.packageId = ''
	data.formdata.supplierId = ''
	data.formdata.snp = 0
	data.requiredPackageQty = undefined
	await getMaterialPackages()
	await getStockQty()
	data.suppliers = await getMaterialSuppliers(data.formdata.materialId)
}

const onSupplierChanged = async () => {
	data.formdata.packageId = ''
	data.formdata.snp = 0
	data.requiredPackageQty = undefined
	await getMaterialPackages()
	await getStockQty()
}

const getStockQty = async () => {
	const materialId = data.formdata.materialId
	const supplierId = data.formdata.supplierId

	if (materialId == '' || supplierId == '') {
		data.stockQty = undefined
		return
	}
	data.stockQty = await _getStockQty(materialId, supplierId)
}

const getMaterialDloc = async () => {
	const materialId = data.formdata.materialId
	if (materialId == '') {
		return
	}
	const item = await _getMaterialDloc(state.warehouseId, materialId)
	if (item) {
		data.formdata.dlocId = item.receiveDlocId
	}
}

const getMaterialPackages = async () => {
	const materialId = data.formdata.materialId
	const supplierId = data.formdata.supplierId

	if (materialId == '' || supplierId == '') {
		data.materialPackages = []
		return
	}
	data.materialPackages = await _getMaterialPackages(materialId, supplierId)
}

const getMaterialPackage = async () => {
	const materialId = data.formdata.materialId
	const supplierId = data.formdata.supplierId
	const packageId = data.formdata.packageId

	if (materialId == '' || supplierId == '' || packageId == '') {
		return
	}

	const item = await _getMaterialPackage(materialId, supplierId, packageId)
	if (item) {
		data.formdata.snp = item.snp
		calcPackageQty()
	}
}

const calcPackageQty = () => {
	if (data.formdata.snp <= 0 || data.formdata.requiredQty <= 0) {
		data.requiredPackageQty = 0
		return
	}
	data.requiredPackageQty = Math.ceil(data.formdata.requiredQty / data.formdata.snp)
}

const init = async (stockOutId: string, warehouseId: string) => {
	if (stockOutId == '' || warehouseId == '') {
		notification.error('参数错误，请刷新页面后重试。')
	}

	state.warehouseId = warehouseId
	state.stockOutId = stockOutId

	if (data.materials.length == 0) {
		data.materials = await getMaterials()
	}

	if (data.dlocs.length == 0) {
		data.dlocs = await getDlocs(warehouseId)
	}

	await getlist()
}

const resetFields = () => {
	data.formdata = getDefaultFormData()
}

defineExpose({
	init,
	resetFields
})
</script>

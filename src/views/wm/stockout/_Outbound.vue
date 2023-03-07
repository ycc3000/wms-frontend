<template>
	<el-dialog
		v-if="data.stockout"
		v-model="state.visible"
		:title="`出库：${data.stockout.stockOutNo}`"
		:close-on-click-modal="false"
		width="90%"
		destroy-on-close
	>
		<el-descriptions :column="4" border>
			<el-descriptions-item label="出库单号">{{ data.stockout.stockOutNo }}</el-descriptions-item>
			<el-descriptions-item label="业务类型：">{{ data.stockout.businessType }}</el-descriptions-item>
			<el-descriptions-item label="仓库：">
				<span>
					<span class="font-sub">({{ data.stockout.warehouse?.code }})</span>
					<span>{{ data.stockout.warehouse?.name }}</span>
				</span>
			</el-descriptions-item>
			<el-descriptions-item label="备注：">{{ data.stockout.comments }}</el-descriptions-item>
		</el-descriptions>
		<br />
		<el-table v-loading="state.loading" :data="data.details" max-height="300px" stripe border>
			<el-table-column label="物料" fixed>
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
			<el-table-column prop="status" label="状态" width="90" />
			<el-table-column prop="stockQty" label="库存数量" fixed="right" width="90">
				<template #default="scope">
					<span :style="getStockQtyStyle(scope.row)">{{ scope.row.stockQty }}</span>
					<svg-icon icon="icon-refresh" :rotating="scope.row.loading" class="icon" @click="getStockQty(scope.row)"></svg-icon>
				</template>
			</el-table-column>
			<el-table-column prop="requiredQty" label="需求数量" fixed="right" width="90" />
			<el-table-column prop="actualQty" label="已出数量" fixed="right" width="90" />
			<el-table-column label="本次出库数量" width="180" fixed="right">
				<template #default="scope">
					<el-input-number
						v-model="scope.row.currentQty"
						:precision="2"
						v-if="scope.row.requiredQty - scope.row.actualQty > 0"
						:min="0"
						:max="scope.row.requiredQty - scope.row.actualQty"
					/>
				</template>
			</el-table-column>
		</el-table>
		<template #footer>
			<el-button @click="state.visible = false">关闭</el-button>
			<el-button type="primary" @click="submit">确认出库</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { message, messagebox, notification } from '@/utils/message'
import { reactive } from 'vue'
import { OutboundInputItem, StockOut, StockOutDetail } from '@/types/wm/stockout'
import { getItem, getDetails, outbound } from '@/api/wm/stockout'
import { getStockQty as _getStockQty } from '@/api/wm/stock'

const emit = defineEmits(['refresh'])

const state = reactive<{ visible: boolean; loading: boolean }>({
	visible: false,
	loading: false
})

const data = reactive<{ stockout: StockOut | undefined; details: StockOutDetail[] }>({
	stockout: undefined,
	details: []
})

const submit = async () => {
	if (!data.stockout) {
		return
	}

	const id = data.stockout.id
	const items: OutboundInputItem[] = []
	let partial = false
	data.details.forEach(item => {
		if (item.currentQty && item.currentQty > 0) {
			items.push({ id: item.id, qty: item.currentQty })
			if (item.currentQty > (item.stockQty ?? 0)) {
				partial = true
			}
		}
	})

	if (items.length == 0) {
		notification.error('请至少填写一行明细数据')
		return
	}

	if (partial) {
		messagebox.confirm('要出库的数量比库存数量少，是否确认部分出库？').then(async () => {
			await _submit(id, items)
		})
	} else {
		await _submit(id, items)
	}
}

const _submit = async (id: string, items: OutboundInputItem[]) => {
	try {
		state.loading = true
		await outbound({ id, items })
		message.success('出库完成')
		state.visible = false
		emit('refresh')
	} finally {
		state.loading = false
	}
}

const getStockQty = async (row: StockOutDetail) => {
	try {
		row.loading = true
		row.stockQty = await _getStockQty(row.materialId, row.supplierId)
	} finally {
		row.loading = false
	}
}

const getStockQtyStyle = (row: StockOutDetail) => {
	if (!row.currentQty) {
		return {}
	}
	const stockQty = row.stockQty ?? 0
	if (row.currentQty > stockQty) {
		return {
			color: 'var(--el-color-danger)'
		}
	}
}

const init = async (id: string) => {
	try {
		state.loading = true
		const item = await getItem(id)
		if (!item) {
			message.error('未能加载数据，可能已被删除。')
			return
		}
		state.visible = true
		data.stockout = item
		data.details = await getDetails(id)
		data.details.forEach(async detail => {
			detail.currentQty = detail.requiredQty - detail.actualQty
			await getStockQty(detail)
		})
	} finally {
		state.loading = false
	}
}

defineExpose({
	init
})
</script>
<style scoped>
.title {
	font-weight: bold;
}
.icon {
	margin-left: 3px;
	cursor: pointer;
}
</style>

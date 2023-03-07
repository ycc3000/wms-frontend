<template>
	<el-dialog
		v-if="data.stockin"
		v-model="state.visible"
		:title="`入库：${data.stockin.stockInNo}`"
		:close-on-click-modal="false"
		width="90%"
		destroy-on-close
	>
		<el-descriptions :column="4" border>
			<el-descriptions-item label="入库单号">{{ data.stockin.stockInNo }}</el-descriptions-item>
			<el-descriptions-item label="业务类型：">{{ data.stockin.businessType }}</el-descriptions-item>
			<el-descriptions-item label="仓库：">
				<span>
					<span class="font-sub">({{ data.stockin.warehouse?.code }})</span>
					<span>{{ data.stockin.warehouse?.name }}</span>
				</span>
			</el-descriptions-item>
			<el-descriptions-item label="预计到货时间：">{{ format(data.stockin.estimatedArrivalTime, 'YYYY-MM-DD') }}</el-descriptions-item>
			<el-descriptions-item label="备注：">{{ data.stockin.comments }}</el-descriptions-item>
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
			<el-table-column label="收货区">
				<template #default="scope">
					<span class="sub">({{ scope.row.zone?.code }})</span>
					<span>{{ scope.row.zone?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="收货库位">
				<template #default="scope">
					<span class="sub">({{ scope.row.dloc?.code }})</span>
					<span>{{ scope.row.dloc?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="batchNo" label="批次号" />
			<el-table-column prop="status" label="状态" />
			<el-table-column prop="requiredQty" label="需求数量" />
			<el-table-column prop="actualQty" label="已收数量" />
			<el-table-column label="本次入库数量" width="180" fixed="right">
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
			<el-button type="primary" @click="submit">确认入库</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { message, notification } from '@/utils/message'
import { reactive } from 'vue'
import { InboundInputItem, StockIn, StockInDetail } from '@/types/wm/stockin'
import { getItem, getDetails, inbound } from '@/api/wm/stockin'
import { format } from '@/utils/date'

const emit = defineEmits(['refresh'])

const state = reactive<{ visible: boolean; loading: boolean }>({
	visible: false,
	loading: false
})

const data = reactive<{ stockin: StockIn | undefined; details: StockInDetail[] }>({
	stockin: undefined,
	details: []
})

const submit = async () => {
	if (!data.stockin) {
		return
	}
	const items: InboundInputItem[] = []
	data.details.forEach(item => {
		if (item.currentQty && item.currentQty > 0) {
			items.push({ id: item.id, qty: item.currentQty })
		}
	})
	if (items.length == 0) {
		notification.error('请至少填写一行明细数据')
		return
	}
	try {
		state.loading = true
		await inbound({ id: data.stockin.id, items })
		message.success('入库完成')
		state.visible = false
		emit('refresh')
	} finally {
		state.loading = false
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
		data.stockin = item
		data.details = await getDetails(id)
		data.details.forEach(detail => {
			detail.currentQty = detail.requiredQty - detail.actualQty
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
</style>

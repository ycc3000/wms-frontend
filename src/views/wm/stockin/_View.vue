<template>
	<el-dialog
		v-if="data.stockin"
		v-model="state.visible"
		:title="`入库单：${data.stockin.stockInNo}`"
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
		<el-table v-loading="state.loading" max-height="300px" :data="data.details" stripe border>
			<el-table-column label="物料" min-width="150" fixed>
				<template #default="scope">
					<span class="sub">({{ scope.row.material?.code }})</span>
					<span>{{ scope.row.material?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="基本单位" width="90">
				<template #default="scope">
					<span :title="scope.row.baseUnit?.name">{{ scope.row.baseUnit?.code }}</span>
				</template>
			</el-table-column>
			<el-table-column label="供应商" min-width="120">
				<template #default="scope">
					<span :title="scope.row.supplier?.name">{{ scope.row.supplier?.code }}</span>
				</template>
			</el-table-column>
			<el-table-column label="包装型号" min-width="120">
				<template #default="scope">
					<span :title="scope.row.package?.name">{{ scope.row.package?.code }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="snp" label="包装收容数" width="100" />
			<el-table-column label="收货区" min-width="120">
				<template #default="scope">
					<span :title="scope.row.zone?.name">{{ scope.row.zone?.code }}</span>
				</template>
			</el-table-column>
			<el-table-column label="收货库位" min-width="120">
				<template #default="scope">
					<span :title="scope.row.dloc?.name">{{ scope.row.dloc?.code }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="batchNo" label="批次号" min-width="90" />
			<el-table-column prop="status" label="状态" width="90" />
			<el-table-column prop="requiredQty" label="需求数" width="80" />
			<el-table-column prop="actualQty" label="已收数" width="80" />
		</el-table>
		<template #footer>
			<el-button @click="state.visible = false">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { message } from '@/utils/message'
import { reactive, ref } from 'vue'
import { StockIn, StockInDetail } from '@/types/wm/stockin'
import { getItem, getDetails } from '@/api/wm/stockin'
import { format } from '@/utils/date'

const state = reactive<{ visible: boolean; loading: boolean }>({
	visible: false,
	loading: false
})

const data = reactive<{ stockin: StockIn | undefined; details: StockInDetail[] }>({
	stockin: undefined,
	details: []
})

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

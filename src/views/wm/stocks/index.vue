<template>
	<el-card>
		<template #header>
			<div>
				<el-form :inline="true" @keyup.enter="getList()">
					<!-- <el-form-item>
						<el-select v-model="state.query.warehouseId" placeholder="仓库" clearable>
							<el-option v-for="(item, idx) in warehouses" :key="idx" :label="item.name" :value="item.id">
								<div class="line">
									<span>{{ item.name }}</span>
									<span class="sub">{{ item.code }}</span>
								</div>
							</el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item>
						<el-input v-model="state.query.stockInNo" placeholder="入库单号" clearable />
					</el-form-item>
					<el-form-item>
						<el-input v-model="state.query.material" placeholder="物料编码/名称" clearable />
					</el-form-item>
					<el-form-item>
						<el-input v-model="state.query.supplier" placeholder="供应商编码/名称" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="getList()">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
		</template>
		<!-- <div class="table-bar">
			<div></div>
			<el-button v-permissions="[StockInPermission.Create]" type="primary" @click="addItem()">新建出库单</el-button>
		</div> -->
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column label="仓库" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.warehouse?.code }})</span>
					<span>{{ scope.row.warehouse?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="存储区" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.zone?.code }})</span>
					<span>{{ scope.row.zone?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="库位" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.dloc?.code }})</span>
					<span>{{ scope.row.dloc?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="物料" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.material?.code }})</span>
					<span>{{ scope.row.material?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="stockQty" label="库存数量" class-name="no-wrap" />
			<el-table-column prop="stockStatus" label="库存状态" class-name="no-wrap" />
			<el-table-column prop="lpn" label="LPN" class-name="no-wrap" />
			<el-table-column label="基本单位" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.baseUnit?.code }})</span>
					<span>{{ scope.row.baseUnit?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="供应商" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.supplier?.code }})</span>
					<span>{{ scope.row.supplier?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="batchNo" label="批次号" class-name="no-wrap" />
			<el-table-column prop="inboundBatchNo" label="入库批次" class-name="no-wrap" />
			<el-table-column prop="stockInNo" label="入库单号" class-name="no-wrap" />
			<el-table-column label="创建时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.creationTime, 'YYYY-MM-DD HH:mm') }}</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged">
			<div class="qty">库存总量：{{ data.totalQty }}</div>
		</hook-paging>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive } from 'vue'
import HookPaging from '@/hooks/HookPaging.vue'
import { IHooksOptions } from '@/hooks'
import { format } from '@/utils/date'

const state: IHooksOptions = reactive({
	getListUrl: '/api/wm/stock/list',
	paging: true,
	query: {
		warehouseId: '',
		stockInNo: '',
		material: '',
		supplier: ''
	},
	resolveResult: function (res: any) {
		data.totalQty = res.totalStockQty
		return {
			total: res.data.total,
			items: res.data.items
		}
	}
})

const data = reactive({
	totalQty: 0
})

const { getList, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>
<style scoped>
.qty {
	display: flex;
	justify-content: flex-end;
	padding-right: 10px;
	color: var(--el-text-color-regular);
}
</style>

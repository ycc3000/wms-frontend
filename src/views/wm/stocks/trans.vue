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
						<el-input v-model="state.query.requestNo" placeholder="单号" clearable />
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
			<el-table-column prop="requestNo" label="请求单号" class-name="no-wrap" />
			<el-table-column prop="transType" label="交易类型" class-name="no-wrap" />
			<el-table-column prop="businessType" label="业务类型" class-name="no-wrap" />
			<el-table-column prop="transQty" label="交易数量" class-name="no-wrap" />
			<el-table-column label="物料" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.material?.code }})</span>
					<span>{{ scope.row.material?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="供应商" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.supplier?.code }})</span>
					<span>{{ scope.row.supplier?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="基本单位" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.baseUnit?.code }})</span>
					<span>{{ scope.row.baseUnit?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="源仓库" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.sourceWarehouse">
						<span class="sub">({{ scope.row.sourceWarehouse.code }})</span>
						<span>{{ scope.row.sourceWarehouse.name }}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="源存储区" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.sourceZone">
						<span class="sub">({{ scope.row.sourceZone.code }})</span>
						<span>{{ scope.row.sourceZone.name }}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="源库位" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.sourceDloc">
						<span class="sub">({{ scope.row.sourceDloc.code }})</span>
						<span>{{ scope.row.sourceDloc.name }}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="sourceLPN" label="源LPN" class-name="no-wrap" />
			<el-table-column label="目标仓库" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.targetWarehouse">
						<span class="sub">({{ scope.row.targetWarehouse.code }})</span>
						<span>{{ scope.row.targetWarehouse.name }}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="目标存储区" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.targetZone">
						<span class="sub">({{ scope.row.targetZone.code }})</span>
						<span>{{ scope.row.targetZone.name }}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column label="目标库位" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.targetDloc">
						<span class="sub">({{ scope.row.targetDloc.code }})</span>
						<span>{{ scope.row.targetDloc.name }}</span>
					</span>
				</template>
			</el-table-column>
			<el-table-column prop="targetLPN" label="目标LPN" class-name="no-wrap" />
			<el-table-column label="交易时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.creationTime, 'YYYY-MM-DD HH:mm') }}</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged" />
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive } from 'vue'
import HookPaging from '@/hooks/HookPaging.vue'
import { IHooksOptions } from '@/hooks'
import { format } from '@/utils/date'

const state: IHooksOptions = reactive({
	getListUrl: '/api/wm/stock/trans',
	paging: true,
	query: {
		warehouseId: '',
		requestNo: '',
		material: '',
		supplier: ''
	}
})

const { getList, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

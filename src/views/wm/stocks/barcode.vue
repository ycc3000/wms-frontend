<template>
	<el-card>
		<template #header>
			<div>
				<el-form :inline="true" @keyup.enter="getList()">
					<el-form-item>
						<el-input v-model="state.query.sourceNo" placeholder="单号" clearable />
					</el-form-item>
					<el-form-item>
						<el-select v-model="state.query.status" placeholder="状态" clearable>
							<el-option label="已创建" :value="0"></el-option>
							<el-option label="已入库" :value="100"></el-option>
							<el-option label="已作废" :value="999"></el-option>
						</el-select>
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
			<el-table-column prop="sourceNo" label="来源单号" class-name="no-wrap" />
			<el-table-column prop="lpn" label="LPN" class-name="no-wrap" />
			<el-table-column prop="statusText" label="状态" class-name="no-wrap" />
			<el-table-column prop="barcodeQty" label="标签数量" class-name="no-wrap" />
			<el-table-column prop="actualQty" label="实际数量" class-name="no-wrap" />
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
			<el-table-column label="包装型号" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.package?.code }})</span>
					<span>{{ scope.row.package?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="snp" label="包装收容数" class-name="no-wrap" />
			<el-table-column label="仓库" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.warehouse.code }})</span>
					<span>{{ scope.row.warehouse.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="存储区" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.zone.code }})</span>
					<span>{{ scope.row.zone.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="库位" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.dloc.code }})</span>
					<span>{{ scope.row.dloc.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="batchNo" label="批次号" class-name="no-wrap" />
			<el-table-column label="创建时间" class-name="no-wrap">
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
	getListUrl: '/api/wm/stock-barcode/items',
	paging: true,
	query: {
		sourceNo: '',
		material: '',
		supplier: '',
		status: 0
	}
})

const { getList, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

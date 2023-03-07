<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<el-form :inline="true" @keyup.enter="getList()">
					<el-form-item>
						<el-select v-model="state.query.warehouseId" placeholder="仓库" clearable>
							<el-option v-for="(item, idx) in warehouses" :key="idx" :label="item.name" :value="item.id">
								<div class="line">
									<span>{{ item.name }}</span>
									<span class="sub">{{ item.code }}</span>
								</div>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-input v-model="state.query.stockInNo" placeholder="入库单号" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="getList()">查询</el-button>
					</el-form-item>
				</el-form>
				<el-button v-permissions="[StockInPermission.Create]" type="primary" @click="addItem()">新建入库单</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column prop="stockInNo" label="入库单号" class-name="no-wrap" />
			<el-table-column label="仓库" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.warehouse?.code }})</span>
					<span>{{ scope.row.warehouse?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="businessType" label="业务类型" class-name="no-wrap" />
			<el-table-column prop="statusText" label="状态" class-name="no-wrap" />
			<el-table-column label="预计到货时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.estimatedArrivalTime, 'YYYY-MM-DD HH:mm') }}</template>
			</el-table-column>
			<el-table-column prop="comments" label="备注" class-name="no-wrap" />
			<el-table-column label="创建时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.creationTime, 'YYYY-MM-DD HH:mm') }}</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button type="primary" link @click="view(scope.row.id)">详情</el-button>
					<template v-if="scope.row.statusText == '已创建'">
						<el-button type="primary" link v-permissions="[StockInPermission.Publish]" @click="publishItem(scope.row.id)">发布</el-button>
						<el-button type="primary" link v-permissions="[StockInPermission.Edit]" @click="editItem(scope.row.id)">修改</el-button>
						<el-button type="danger" link v-permissions="[StockInPermission.Delete]" @click="deleteItem(scope.row.id)">删除</el-button>
					</template>
					<template v-if="scope.row.statusText == '已发布' || scope.row.statusText == '部分收货'">
						<el-button type="primary" link v-permissions="[StockInPermission.Receive]" @click="receive(scope.row.id)">入库</el-button>
					</template>
					<template v-if="scope.row.statusText == '已发布'">
						<el-button type="warning" link v-permissions="[StockInPermission.Close]" @click="closeItem(scope.row.id)">关闭</el-button>
					</template>
				</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged" />
		<add-or-update ref="addOrUpdateRef" @refresh="getList" />
		<View ref="viewRef" />
		<Receive ref="receiveRef" @refresh="getList" />
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref, onMounted } from 'vue'
import HookPaging from '@/hooks/HookPaging.vue'
import AddOrUpdate from './_AddOrUpdate.vue'
import View from './_View.vue'
import Receive from './_Inbound.vue'
import { IHooksOptions } from '@/hooks'
import { format } from '@/utils/date'
import { Warehouse } from '@/types/basicdata/warehouse'
import { StockInPermission } from '@/permissions/wm'
import { getItems as getWarehouses } from '@/api/basicdata/warehouse'
import { close, publish } from '@/api/wm/stockin'
import { message, messagebox } from '@/utils/message'

const state: IHooksOptions = reactive({
	getListUrl: '/api/wm/stock-in/list',
	deleteUrl: '/api/wm/stock-in/delete',
	paging: true,
	query: {
		warehouseId: '',
		keyword: ''
	}
})

const addOrUpdateRef = ref()
const viewRef = ref()
const receiveRef = ref()
const warehouses = ref<Warehouse[]>()

const addItem = () => {
	addOrUpdateRef.value.add()
}

const editItem = async (id: string) => {
	addOrUpdateRef.value.edit(id)
}

const receive = (id: string) => {
	receiveRef.value.init(id)
}

const publishItem = async (id: string) => {
	messagebox.confirm('确定进行发布操作?').then(async () => {
		try {
			state.loading = true
			await publish(id)
			message.success('发布成功')
			getList()
		} finally {
			state.loading = false
		}
	})
}

const closeItem = async (id: string) => {
	messagebox.confirm('确定进行关闭操作?').then(async () => {
		try {
			state.loading = true
			await close(id)
			message.success('关闭成功')
			getList()
		} finally {
			state.loading = false
		}
	})
}

const view = async (id: string) => {
	viewRef.value.init(id)
}

onMounted(async () => {
	warehouses.value = await getWarehouses()
})

const { getList, deleteItem, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

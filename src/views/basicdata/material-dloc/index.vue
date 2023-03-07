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
						<el-input v-model="state.query.material" placeholder="物料编码/名称" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="getList()">查询</el-button>
					</el-form-item>
				</el-form>
				<el-button v-permissions="[MaterialDlocPermission.Create]" type="primary" @click="addItem()">新增</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column label="仓库" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.warehouse?.code }})</span>
					<span>{{ scope.row.warehouse?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="物料" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.material?.code }})</span>
					<span>{{ scope.row.material?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="默认收货库位" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.receiveDloc?.code }})</span>
					<span>{{ scope.row.receiveDloc?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column v-permissions="MaterialDlocPermission.CUD" label="操作" align="center" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button v-permissions="[MaterialDlocPermission.Edit]" type="primary" link @click="editItem(scope.row.id)">
						<svg-icon icon="icon-edit" />修改
					</el-button>
					<el-button v-permissions="[MaterialDlocPermission.Delete]" type="danger" link @click="deleteItem(scope.row.id)">
						<svg-icon icon="icon-close-circle" />删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged" />
		<add-or-update ref="addOrUpdateRef" @refresh="getList" />
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { onMounted, reactive, ref } from 'vue'
import AddOrUpdate from './_AddOrUpdate.vue'
import HookPaging from '@/hooks/HookPaging.vue'
import { IHooksOptions } from '@/hooks'
import { MaterialDlocPermission } from '@/permissions/basicdata'
import { Warehouse } from '@/types/basicdata/warehouse'
import { getItems as getWarehouses } from '@/api/basicdata/warehouse'

const addOrUpdateRef = ref()

const state: IHooksOptions = reactive({
	getListUrl: '/api/basic-data/material-dloc/list',
	getItemUrl: '/api/basic-data/material-dloc/get-by-id',
	deleteUrl: '/api/basic-data/material-dloc/delete',
	paging: true,
	query: {
		material: ''
	}
})

const warehouses = ref<Warehouse[]>()

const addItem = () => {
	addOrUpdateRef.value.add()
}

const editItem = async (id: string) => {
	const item = await getItem({ id })
	addOrUpdateRef.value.edit(item)
}

onMounted(async () => {
	warehouses.value = await getWarehouses()
})

const { getList, getItem, deleteItem, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

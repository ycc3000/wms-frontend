<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<el-form :inline="true" @keyup.enter="getList()">
					<el-form-item>
						<el-input v-model="state.query.keyword" placeholder="编码/名称" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="getList()">查询</el-button>
					</el-form-item>
				</el-form>
				<el-button v-permissions="[MeasureUnitPermission.Create]" type="primary" @click="addItem()">新增</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column prop="code" label="编码" class-name="no-wrap" />
			<el-table-column prop="name" label="名称" class-name="no-wrap" />
			<el-table-column prop="sort" label="排序" class-name="no-wrap" />
			<el-table-column label="状态" class-name="no-wrap">
				<template #default="scope">
					<el-tag v-if="scope.row.enabled === true">正常</el-tag>
					<el-tag v-else type="warning">已禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="description" label="备注" class-name="no-wrap" />
			<el-table-column v-permissions="MeasureUnitPermission.CUD" label="操作" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button v-permissions="[MeasureUnitPermission.Edit]" type="primary" link @click="editItem(scope.row.id)">
						<svg-icon icon="icon-edit" />修改
					</el-button>
					<el-button v-permissions="[MeasureUnitPermission.Delete]" type="danger" link @click="deleteItem(scope.row.id)">
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
import { reactive, ref } from 'vue'
import AddOrUpdate from './_AddOrUpdate.vue'
import HookPaging from '@/hooks/HookPaging.vue'
import { IHooksOptions } from '@/hooks'
import { MeasureUnitPermission } from '@/permissions/basicdata'

const addOrUpdateRef = ref()

const state: IHooksOptions = reactive({
	getListUrl: '/api/basic-data/measure-unit/list',
	getItemUrl: '/api/basic-data/measure-unit/get-by-id',
	deleteUrl: '/api/basic-data/measure-unit/delete',
	paging: true,
	query: {
		keyword: ''
	}
})

const addItem = () => {
	addOrUpdateRef.value.add()
}

const editItem = async (id: number) => {
	const item = await getItem({ id })
	addOrUpdateRef.value.edit(item)
}

const { getList, getItem, deleteItem, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

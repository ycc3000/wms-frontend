<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<el-form :inline="true" @keyup.enter="getList()">
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
				<el-button v-permissions="[MaterialPackagePermission.Create]" type="primary" @click="addItem()">新增</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column label="物料" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.material?.code }})</span>
					<span>{{ scope.row.material?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="物料基本单位" class-name="no-wrap">
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
			<el-table-column label="包装型号" class-name="no-wrap">
				<template #default="scope">
					<span class="sub">({{ scope.row.package?.code }})</span>
					<span>{{ scope.row.package?.name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="snp" label="包装标准收容数" class-name="no-wrap" />
			<el-table-column v-permissions="MaterialPackagePermission.CUD" label="操作" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button v-permissions="[MaterialPackagePermission.Edit]" type="primary" link @click="editItem(scope.row.id)">
						<svg-icon icon="icon-edit" />修改
					</el-button>
					<el-button v-permissions="[MaterialPackagePermission.Delete]" type="danger" link @click="deleteItem(scope.row.id)">
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
import { MaterialPackagePermission } from '@/permissions/basicdata'

const addOrUpdateRef = ref()

const state: IHooksOptions = reactive({
	getListUrl: '/api/basic-data/material-package/list',
	getItemUrl: '/api/basic-data/material-package/get-by-id',
	deleteUrl: '/api/basic-data/material-package/delete',
	paging: true,
	query: {
		material: '',
		supplier: ''
	}
})

const addItem = () => {
	addOrUpdateRef.value.add()
}

const editItem = async (id: string) => {
	const item = await getItem({ id })
	addOrUpdateRef.value.edit(item)
}

const { getList, getItem, deleteItem, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

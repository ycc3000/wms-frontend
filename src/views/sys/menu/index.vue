<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<page-header>菜单管理</page-header>
				<el-button v-permissions="[MenuPermission.Create]" type="primary" @click="addItem()">新增</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" row-key="id" border default-expand-all>
			<el-table-column label="菜单名称" class-name="no-wrap">
				<template #default="scope">
					<span><svg-icon v-if="scope.row.icon" :icon="scope.row.icon" />{{ scope.row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column label="菜单类型" class-name="no-wrap">
				<template #default="scope">
					<el-tag v-if="scope.row.type === MenuType.Menu" type="info">菜单</el-tag>
					<el-tag v-else-if="scope.row.type === MenuType.ExternalLink" type="warning">外链</el-tag>
					<el-tag v-else-if="scope.row.type === MenuType.MobileMenu" type="success">PDA菜单</el-tag>
					<span v-else></span>
				</template>
			</el-table-column>
			<el-table-column label="状态" class-name="no-wrap">
				<template #default="scope">
					<el-tag v-if="scope.row.hidden === true" type="warning">隐藏</el-tag>
					<el-tag v-else>显示</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序" class-name="no-wrap" />
			<el-table-column prop="url" label="路由/URL" class-name="no-wrap" />
			<el-table-column v-permissions="MenuPermission.CUD" label="操作" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button v-permissions="[MenuPermission.Create]" type="primary" link @click="addItem(scope.row.id)">
						<svg-icon icon="icon-plus-circle" />子菜单
					</el-button>
					<el-button v-permissions="[MenuPermission.Edit]" type="primary" link @click="editItem(scope.row.id)">
						<svg-icon icon="icon-edit" />修改
					</el-button>
					<el-button v-permissions="[MenuPermission.Delete]" type="danger" link @click="deleteItem(scope.row.id)">
						<svg-icon icon="icon-close-circle" />删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<add-or-update ref="addOrUpdateRef" @refresh="getList" />
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import AddOrUpdate from './_AddOrUpdate.vue'
import { IHooksOptions } from '@/hooks'
import { MenuType } from '@/types/menu'
import { MenuPermission } from '@/permissions/app'
import PageHeader from '@/views/components/PageHeader.vue'

const state: IHooksOptions = reactive({
	getListUrl: '/api/menu/tree',
	getItemUrl: '/api/menu/get-by-id',
	deleteUrl: '/api/menu/delete',
	query: {
		showButtons: true
	}
})

const addOrUpdateRef = ref()
const addItem = (id?: string) => {
	addOrUpdateRef.value.add(id)
}

const editItem = async (id: string) => {
	const item = await getItem({ id })
	addOrUpdateRef.value.edit(item)
}

const { getList, getItem, deleteItem } = useCrud(state)
</script>

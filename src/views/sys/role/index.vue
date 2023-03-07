<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<el-form :inline="true" @keyup.enter="getList()">
					<el-form-item>
						<el-input v-model="state.query.name" placeholder="名称" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="getList()">查询</el-button>
					</el-form-item> </el-form
				><el-button v-permissions="[RolePermission.Create]" type="primary" @click="addItem()">新增角色</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column prop="name" label="名称" class-name="no-wrap" />
			<el-table-column prop="description" label="备注" class-name="no-wrap" />
			<el-table-column label="状态" class-name="no-wrap">
				<template #default="scope">
					<el-tag v-if="scope.row.enabled === true">正常</el-tag>
					<el-tag v-else type="warning">已禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.creationTime, 'YYYY-MM-DD HH:mm') }}</template>
			</el-table-column>
			<el-table-column v-permissions="RolePermission.CUD" label="操作" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button v-permissions="[RolePermission.Menus]" type="primary" link @click="editRoleMenu(scope.row.id)">
						<svg-icon icon="icon-role" />角色菜单
					</el-button>
					<el-button v-permissions="[RolePermission.Permissions]" type="primary" link @click="editRolePermission(scope.row.id)">
						<svg-icon icon="icon-permission" />角色权限
					</el-button>
					<el-button v-permissions="[RolePermission.Edit]" type="primary" link @click="editItem(scope.row.id)">
						<svg-icon icon="icon-edit" />修改
					</el-button>
					<el-button v-permissions="[RolePermission.Delete]" type="danger" link @click="deleteItem(scope.row.id)">
						<svg-icon icon="icon-close-circle" />删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged" />
		<add-or-update ref="addOrUpdateRef" @refresh="getList" />
		<role-menu-edit ref="roleMenuRef" />
		<role-permission-edit ref="rolePermissionRef" />
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import AddOrUpdate from './_AddOrUpdate.vue'
import RoleMenuEdit from './_RoleMenu.vue'
import RolePermissionEdit from './_RolePermission.vue'
import HookPaging from '@/hooks/HookPaging.vue'
import { IHooksOptions } from '@/hooks'
import { format } from '@/utils/date'
import { RolePermission } from '@/permissions/app'

const addOrUpdateRef = ref()
const roleMenuRef = ref()
const rolePermissionRef = ref()

const state: IHooksOptions = reactive({
	getListUrl: '/api/role/list-paged',
	getItemUrl: '/api/role/get-by-id',
	deleteUrl: '/api/role/delete',
	paging: true,
	query: {
		name: ''
	}
})

const addItem = () => {
	addOrUpdateRef.value.add()
}

const editItem = async (id: string) => {
	const item = await getItem({ id })
	addOrUpdateRef.value.edit(item)
}

const editRoleMenu = (id: string) => {
	roleMenuRef.value.init(id)
}

const editRolePermission = (id: string) => {
	rolePermissionRef.value.init(id)
}

const { getList, getItem, deleteItem, onCurrentPageChanged, onPageSizeChanged } = useCrud(state)
</script>

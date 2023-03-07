<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<el-form :inline="true" @keyup.enter="getList">
					<el-form-item>
						<el-input v-model="state.query.term" placeholder="用户名/姓名/手机号" clearable />
					</el-form-item>
					<el-form-item>
						<el-button @click="getList">查询</el-button>
					</el-form-item>
				</el-form>
				<el-button v-permissions="[UserPermission.Create]" type="primary" @click="addItem()">新增用户</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" table-layout="auto" stripe border>
			<el-table-column prop="loginName" label="用户名" class-name="no-wrap" />
			<el-table-column prop="realName" label="姓名" class-name="no-wrap" />
			<!-- <el-table-column prop="gender" label="性别"></el-table-column> -->
			<el-table-column prop="mobile" label="手机号" class-name="no-wrap" />
			<el-table-column prop="email" label="邮箱" class-name="no-wrap" />
			<el-table-column label="状态" class-name="no-wrap">
				<template #default="scope">
					<el-tag v-if="scope.row.isActive === true">正常</el-tag>
					<el-tag v-else type="warning">已禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.creationTime, 'YYYY-MM-DD HH:mm') }}</template>
			</el-table-column>
			<el-table-column v-permissions="UserPermission.CUD" label="操作" fixed="right" class-name="no-wrap">
				<template #default="scope">
					<el-button v-permissions="[UserPermission.ResetPassword]" type="primary" link @click="resetpwd(scope.row.loginName)">
						<svg-icon icon="icon-unlock" />重置密码
					</el-button>
					<el-button v-permissions="[UserPermission.Edit]" type="primary" link @click="editItem(scope.row.id)">
						<svg-icon icon="icon-edit" />修改
					</el-button>
					<el-button v-permissions="[UserPermission.Delete]" type="danger" link @click="deleteItem(scope.row.id)">
						<svg-icon icon="icon-close-circle" />删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged" />
		<add-or-update ref="addOrUpdateRef" @refresh="getList" />
		<reset-password ref="resetPasswordRef" />
	</el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { format } from '@/utils/date'
import { IHooksOptions } from '@/hooks'
import { useCrud } from '@/hooks'
import AddOrUpdate from './_AddOrUpdate.vue'
import HookPaging from '@/hooks/HookPaging.vue'
import ResetPassword from './_ResetPassword.vue'
import { UserPermission } from '@/permissions/app'

const addOrUpdateRef = ref()
const resetPasswordRef = ref()

const state: IHooksOptions = reactive({
	getListUrl: '/api/user/list',
	getItemUrl: '/api/user/get-by-id',
	deleteUrl: '/api/user/delete',
	paging: true,
	query: {
		term: ''
	}
})

const addItem = () => {
	addOrUpdateRef.value.add()
}

const editItem = async (id: string) => {
	const item = await getItem({ id, withRoles: true })
	addOrUpdateRef.value.edit(item)
}

const resetpwd = (username: string) => {
	resetPasswordRef.value.init(username)
}

const { getList, getItem, deleteItem, onPageSizeChanged, onCurrentPageChanged } = useCrud(state)
</script>

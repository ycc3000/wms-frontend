<template>
	<el-card>
		<template #header>
			<div class="card-header valign-top">
				<div class="searchbox">
					<div>
						<div class="item">
							<span>开始时间：</span>
							<el-date-picker
								v-model="state.query.startDate"
								type="datetime"
								placeholder="开始时间"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
							<span class="l">结束时间：</span>
							<el-date-picker
								v-model="state.query.endDate"
								type="datetime"
								placeholder="结束时间"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
							/>
						</div>
						<div class="more">
							<span @click="toogleMore">显示/隐藏更多查询条件</span>
						</div>
						<template v-if="more">
							<div class="item">
								<span>用户名：</span>
								<el-input v-model="state.query.userName" placeholder="用户名" clearable />
								<span class="l">URL：</span>
								<el-input v-model="state.query.url" placeholder="URL" clearable />
							</div>
							<!-- <div class="item">
								<span>控制器/服务：</span><el-input v-model="state.query.serviceName" placeholder="控制器/服务" clearable />
								<span class="l">方法名：</span><el-input v-model="state.query.methodName" placeholder="方法名" clearable />
							</div> -->
							<div class="item">
								<span>输入参数：</span>
								<el-input v-model="state.query.parameters" placeholder="输入参数" clearable />
								<span class="l">异常：</span>
								<el-input v-model="state.query.exceptions" placeholder="异常" clearable />
							</div>
						</template>
					</div>
					<div>
						<el-button @click="getList">查询</el-button>
					</div>
				</div>
				<el-button v-permissions="[LoggingPermission.Delete]" type="danger" @click="clear">清理日志</el-button>
			</div>
		</template>
		<el-table v-loading="state.loading" :data="state.items" :row-class-name="tableRowClassName" table-layout="auto" stripe border>
			<el-table-column prop="userName" label="用户名" class-name="no-wrap" />
			<el-table-column prop="url" label="URL" class-name="no-wrap" />
			<!-- <el-table-column prop="serviceName" label="控制器/服务" min-width="100" show-overflow-tooltip />
			<el-table-column prop="methodName" label="方法名" min-width="120" show-overflow-tooltip /> -->
			<el-table-column label="输入参数" class-name="no-wrap">
				<template #default="scope">
					<span class="hand" @click="viewJson(scope.row.parameters)">查看</span>
				</template>
			</el-table-column>
			<el-table-column label="执行时间" class-name="no-wrap">
				<template #default="scope">{{ format(scope.row.executionTime, 'YYYY-MM-DD HH:mm:ss') }}</template>
			</el-table-column>
			<el-table-column prop="executionDuration" label="耗时(ms)" class-name="no-wrap" />
			<el-table-column label="HTTP请求" class-name="no-wrap">
				<template #default="scope">{{ `${scope.row.httpMethod}(${scope.row.httpStatusCode})` }}</template>
			</el-table-column>
			<el-table-column prop="browserInfo" label="浏览器信息" min-width="120" show-overflow-tooltip />
			<el-table-column prop="clientIpAddress" label="客户端IP" class-name="no-wrap" />
			<el-table-column label="异常" class-name="no-wrap">
				<template #default="scope">
					<span v-if="scope.row.exceptions" class="hand" @click="viewJson(scope.row.exceptions)">查看</span>
				</template>
			</el-table-column>
		</el-table>
		<hook-paging :options="state" @size-change="onPageSizeChanged" @current-change="onCurrentPageChanged" />
		<audit-log-clean ref="auditLogCleanRef" @refresh="getList" />
		<json-viewer ref="jsonViewerRef" />
	</el-card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { format } from '@/utils/date'
import { IHooksOptions } from '@/hooks'
import { useCrud } from '@/hooks'
import HookPaging from '@/hooks/HookPaging.vue'
import { LoggingPermission } from '@/permissions/app'
import AuditLogClean from './_AuditLogClean.vue'
import JsonViewer from './_JsonViewer.vue'

const state: IHooksOptions = reactive({
	getListUrl: '/api/logging/auditlogs',
	deleteUrl: '/api/logging/delete',
	paging: true,
	query: {
		startDate: '',
		endDate: '',
		userName: '',
		serviceName: '',
		methodName: '',
		parameters: '',
		url: '',
		exceptions: ''
	}
})

const more = ref(false)
const auditLogCleanRef = ref()
const jsonViewerRef = ref()

const toogleMore = () => {
	more.value = !more.value
}

const viewJson = (value: string) => {
	jsonViewerRef.value.init(value)
}

const clear = () => {
	auditLogCleanRef.value.init()
}

const tableRowClassName = ({ row }: { row: any }) => {
	const { httpStatusCode: status, exceptions: error } = row
	if (status > 400) {
		let r = 'row-warning'
		if (status >= 500) {
			r = 'row-danger'
		}
		return r
	} else if (error && error.length > 0) {
		return 'row-danger'
	}
	return ''
}

const { getList, onPageSizeChanged, onCurrentPageChanged } = useCrud(state)
</script>
<style lang="scss" scoped>
.searchbox {
	display: flex;
	align-items: flex-start;

	.more {
		text-align: right;
		font-size: var(--el-font-size-extra-small);
		color: var(--el-color-info);
		margin-bottom: 5px;

		& > span {
			cursor: pointer;
		}
	}

	.item {
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		span {
			white-space: nowrap;
			min-width: 70px;
			text-align: right;

			&.l {
				min-width: 96px;
			}
		}
	}
}
</style>

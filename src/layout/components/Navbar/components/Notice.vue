<template>
	<el-popover trigger="click" :width="280">
		<template #reference>
			<svg-icon icon="icon-notification" />
		</template>
		<div class="head-box">
			<div class="head-box-title">通知</div>
			<div v-if="notices.length > 0" class="head-box-btn" @click="setAllRead">全部已读</div>
		</div>
		<div class="content-box">
			<template v-if="notices.length > 0">
				<div v-for="(item, idx) in notices" :key="idx" class="content-box-item">
					<div class="content-box-title">{{ item.title }}</div>
					<div class="content-box-msg">
						{{ item.content }}
					</div>
					<div class="content-box-time">{{ item.creationTime }}</div>
				</div>
			</template>
			<el-empty v-else description="暂无通知" />
		</div>
		<div v-if="notices.length > 0" class="foot-box" @click="gotoNoticePage">全部通知</div>
	</el-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const notices = ref([
	{
		title: 'WMS后台管理',
		content: '基于Vue3、TypeScript、Vue Router、Pinia、Axios、i18n、Element Plus、Vite等开发的WMS后台管理',
		creationTime: '2023-01-01'
	}
])

const setAllRead = () => {
	notices.value = []
}

const gotoNoticePage = () => {
	window.open('http://vue.cloudabc.vip')
}
</script>

<style scoped lang="scss">
.head-box {
	display: flex;
	border-bottom: 1px solid var(--el-border-color-lighter);
	box-sizing: border-box;
	color: var(--el-text-color-primary);
	justify-content: space-between;
	height: 35px;
	align-items: center;

	.head-box-btn {
		color: var(--el-color-primary);
		font-size: 13px;
		cursor: pointer;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}
}

.content-box {
	font-size: 14px;

	.content-box-item {
		padding-top: 12px;

		&:last-of-type {
			padding-bottom: 12px;
		}

		.content-box-title {
			font-weight: 500;
		}

		.content-box-msg {
			color: var(--el-text-color-secondary);
			margin-top: 5px;
			margin-bottom: 5px;
		}

		.content-box-time {
			text-align: right;
			font-size: 12px;
			color: var(--el-text-color-secondary);
		}
	}
}

.foot-box {
	height: 35px;
	color: var(--el-color-primary);
	font-size: 13px;
	cursor: pointer;
	opacity: 0.8;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid var(--el-border-color-lighter);
	margin-bottom: calc(0px - var(--el-popover-padding));

	&:hover {
		opacity: 1;
	}
}
</style>

<template>
	<div class="main">
		<img src="/svg/status/403.svg" />
		<div class="content">
			<p class="title">403</p>
			<p class="text">抱歉，你无权访问该页面</p>
			<el-button type="primary" @click="goHome">返回首页</el-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const goHome = () => {
	router.replace('/')
}
</script>
<style lang="scss" scoped>
.main {
	margin: 24px;
	display: flex;
	justify-content: center;
	align-items: center;

	.content {
		margin-left: 50px;

		.title {
			font-size: 36px;
			line-height: 36px;
			font-weight: 500;
			margin-bottom: 16px;
		}

		.text {
			font-size: 16px;
			color: #666;
			margin-bottom: 16px;
		}
	}
}
</style>

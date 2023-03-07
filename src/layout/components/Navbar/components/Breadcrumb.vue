<template>
	<el-breadcrumb separator="/" :separator-icon="ArrowRight" class="navbar-breadcrumb">
		<!-- <el-breadcrumb-item key="home">
			<span>{{ $t('router.home') }}</span>
		</el-breadcrumb-item> -->
		<el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
			<span v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1">
				{{ item.meta.title }}
			</span>
			<!-- <a v-else @click.prevent="handleLink(item)">
				{{ item.meta.title }}
			</a> -->
			<span v-else>
				{{ item.meta.title }}
			</span>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup lang="ts">
import { RouteLocationMatched, useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch, onBeforeMount } from 'vue'
// import { compile } from 'path-to-regexp'
// import { router } from '@/router';

const route = useRoute()

// const pathCompile = (path: string) => {
// 	const { params } = route
// 	const toPath = compile(path)
// 	return toPath(params)
// }

const breadcrumbs = ref([] as Array<RouteLocationMatched>)

const getBreadcrumbs = () => {
	const matched = route.matched.filter(item => item.meta && item.meta.title)
	breadcrumbs.value = matched.filter(item => {
		return item.path != '/home' && item.meta && item.meta.title && item.meta.breadcrumb !== false
	})
}

// const handleLink = (item: any) => {
// 	const { redirect, path } = item;
// 	if (redirect) {
// 		router.push(redirect).catch(err => {
// 			console.warn(err);
// 		})
// 		return
// 	}

// 	router.push(pathCompile(path)).catch(err => {
// 		console.warn(err)
// 	})
// }

watch(
	() => route.path,
	path => {
		if (path.startsWith('/redirect/')) {
			return
		}
		getBreadcrumbs()
	}
)

onBeforeMount(() => {
	getBreadcrumbs()
})
</script>

<style lang="scss" scoped>
.navbar-breadcrumb {
	::v-deep(.el-breadcrumb__inner) {
		color: var(--theme-header-text-color) !important;
	}

	padding-left: 10px;
}
</style>

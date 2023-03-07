<template>
	<template v-if="!item.meta || !item.meta.hidden">
		<template
			v-if="
				hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && (!item.meta || !item.meta.alwaysShow)
			"
		>
			<app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
				<el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
					<svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :icon="onlyOneChild.meta.icon" />
					<template #title>
						{{ onlyOneChild.meta.title }}
					</template>
				</el-menu-item>
			</app-link>
		</template>
		<el-sub-menu v-else :index="item.path">
			<template #title>
				<svg-icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
				<span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
			</template>
			<menu-item v-for="child in item.children" :key="child.path" :item="child" :is-nest="true" />
		</el-sub-menu>
	</template>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AppLink from './Link.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { replace } from 'lodash'

defineProps({
	item: {
		type: Object,
		required: true
	},
	isNest: {
		type: Boolean,
		required: false
	}
})

const onlyOneChild = ref()

const hasOneShowingChild = (children = [] as any, parent: any) => {
	if (!children) {
		children = []
	}

	const showingChildren = children.filter((item: any) => {
		if (item.meta && item.meta.hidden) {
			return false
		} else {
			onlyOneChild.value = item
			return true
		}
	})

	if (showingChildren.length === 1) {
		return true
	}

	if (showingChildren.length === 0) {
		onlyOneChild.value = { ...parent, noShowingChildren: true }
		return true
	}

	return false
}

const resolvePath = (path: string) => {
	if (path.startsWith('/_/')) {
		path = replace(path, '/_/', '')
	}
	return path
}
</script>

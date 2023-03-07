<template>
	<div class="flex content-space-between items-center pagination">
		<div>
			<slot></slot>
		</div>
		<div>
			<el-pagination
				:current-page="options.page"
				:page-sizes="options.pageSizes"
				:page-size="options.limit"
				:total="options.total"
				:small="small"
				layout="total, sizes, prev, pager, next, jumper"
				background
				@size-change="sizeChanged"
				@current-change="currentChanged"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IHooksOptions } from '@/hooks'
import { useAppStore } from '@/store'
import { computed, PropType } from 'vue'

defineProps({
	options: {
		type: Object as PropType<IHooksOptions>,
		required: true,
		default() {
			return {
				page: 1,
				limit: 10,
				total: 0,
				pageSizes: [10, 20, 50, 100, 200]
			}
		}
	}
})

const appStore = useAppStore()
const small = computed(() => appStore.componentSize == 'small')
const emit = defineEmits(['size-change', 'current-change'])

const sizeChanged = (val: number) => {
	emit('size-change', val)
}

const currentChanged = (val: number) => {
	emit('current-change', val)
}
</script>

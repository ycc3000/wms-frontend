<template>
	<a v-if="isExternalLink(to)" :href="to" target="_blank" rel="noopener">
		<slot></slot>
	</a>
	<div v-else @click="push">
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
import { isExternalLink } from '@/utils/validate'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
	to: {
		type: String,
		required: true
	}
})

function push() {
	router.push(props.to).catch(err => {
		console.error(err)
	})
}
</script>

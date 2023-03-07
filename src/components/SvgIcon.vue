<template>
	<div class="svg-icon" :style="style">
		<svg :class="className" :style="`color:${color};`" aria-hidden="true">
			<use :xlink:href="iconName" />
		</svg>
	</div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'
const props = defineProps({
	icon: {
		type: String,
		required: true
	},
	color: {
		type: String,
		default: ''
	},
	className: {
		type: String,
		default: ''
	},
	rotating: {
		type: Boolean,
		default: false
	}
})

const iconName = computed(() => `#${props.icon}`)

const style = computed<CSSProperties>(() => {
	const { rotating } = props
	if (!rotating) return {}
	return {
		animation: 'rotating 2s linear infinite'
	}
})
</script>

<style scoped lang="scss">
.svg-icon {
	display: inline-block;

	svg {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		flex-shrink: 0;
	}
}
</style>

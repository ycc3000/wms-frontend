<template>
	<el-switch v-model="isDark" class="dark" :active-icon="Moon" :inactive-icon="Sunny" inline-prompt />
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDark = useDark()
</script>
<style scoped>
.dark {
	--el-switch-on-color: var(--el-border-color);
}
</style>

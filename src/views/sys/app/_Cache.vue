<template>
	<el-button v-permissions="[CachePermission.Clear]" type="danger" @click="clear">清理系统缓存</el-button>
</template>
<script setup lang="ts">
import { CachePermission } from '@/permissions/app'
import { messagebox, notification } from '@/utils/message'
import { clearCaches } from '@/api/app'

const clear = () => {
	messagebox.confirm('确认清理所有系统缓存？').then(async () => {
		await clearCaches()
		notification.success('清理完成')
	})
}
</script>

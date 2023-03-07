<template>
	<el-dropdown trigger="click" @command="change">
		<svg-icon icon="icon-translate" />
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item v-for="language in languages" :key="language" :disabled="locale === language" :command="language">
					{{ messages[language].langName }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { messages } from '@/i18n'

const languages = Object.keys(messages)
const appStore = useAppStore()
const { locale } = useI18n()

const change = (value: string) => {
	appStore.SET_LANGUAGE(value)
	locale.value = value
	window.location.reload()
}
</script>

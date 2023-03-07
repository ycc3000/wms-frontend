<template>
	<el-card v-loading="state.loading">
		<template #header>
			<div class="card-header">
				<div></div>
				<div>
					<el-button type="primary" @click="refresh">刷新</el-button>
					<el-button type="primary" @click="download">下载所有日志文件</el-button>
				</div>
			</div>
		</template>
		<div>
			<el-input ref="textRef" v-model="state.content" type="textarea" :rows="30" readonly />
		</div>
	</el-card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getLatestWebLogContent, downloadAllWebLogs } from '@/api/logging'

const state = reactive({
	loading: false,
	content: ''
})

const textRef = ref()

const refresh = async () => {
	try {
		state.loading = true
		state.content = await getLatestWebLogContent()
		setTimeout(() => {
			if (textRef.value) {
				textRef.value.textarea.scrollTop = textRef.value.textarea.scrollHeight
			}
		}, 500)
	} finally {
		state.loading = false
	}
}

const download = async () => {
	try {
		state.loading = true
		const { fileName, fileToken, fileType } = await downloadAllWebLogs()
		console.log('res', fileName, fileToken, fileType)
		const url = `${import.meta.env.VITE_API_URL}/File/DownloadTempFile?fileName=${fileName}&fileType=${fileType}&fileToken=${fileToken}`
		window.open(url)
	} finally {
		state.loading = false
	}
}

const init = async () => {
	await refresh()
}

defineExpose({ init })
</script>

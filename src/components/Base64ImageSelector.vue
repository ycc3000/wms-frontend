<template>
	<el-upload list-type="picture-card" accept=".jpg,.jpeg,.png" :show-file-list="false" :on-change="onChange" :auto-upload="false">
		<img v-if="image" :src="image" :style="{ width: `${width}px`, height: `${height}px` }" />
		<el-icon v-else>
			<Plus />
		</el-icon>
		<template #tip>
			<div class="el-upload__tip">{{ tip }}</div>
		</template>
	</el-upload>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadFileResult } from '@/types/file'

const props = defineProps({
	width: {
		type: Number,
		default: 148
	},
	height: {
		type: Number,
		default: 148
	},
	data: {
		type: String,
		default: ''
	},
	tip: {
		type: String,
		default: ''
	},
	limitFileSize: {
		type: Number,
		default: 1024
	}
})

const emit = defineEmits(['selected'])
const image = ref<string>()

const onChange = (file: UploadFile) => {
	image.value = ''
	if (!file || !file.raw) {
		return false
	}
	const result: UploadFileResult = { success: false, message: '', data: '' }
	const isJPG = file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png'
	if (!isJPG) {
		result.message = '选择的图片只能是 JPG/PNG 格式!'
		emit('selected', result)
		return false
	}
	if (props.limitFileSize && props.limitFileSize > 0) {
		const sizeK = file.raw.size / 1024
		if (sizeK > props.limitFileSize) {
			const korm = props.limitFileSize > 1024 ? `${(props.limitFileSize / 1024).toFixed(2)}M` : `${props.limitFileSize}K`
			result.message = `选择的图片不能超过${korm}!`
			emit('selected', result)
			return false
		}
	}
	const reader = new FileReader()
	reader.onload = e => {
		const data = e.target?.result as string
		result.success = true
		result.data = data
		emit('selected', result)
		image.value = data
	}
	reader.readAsDataURL(file.raw)
}

watch(
	() => props.data,
	value => {
		image.value = value
	}
)
</script>

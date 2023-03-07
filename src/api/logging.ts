import { DownloadFile } from '@/types/file'
import { get, post } from '@/utils/request'

export const getLatestWebLogContent = () => {
	return get<string>('/api/logging/weblogs/latest/content')
}

export const getWebLogs = () => {
	return get('/api/logging/weblogs')
}

export const downloadAllWebLogs = () => {
	return get<DownloadFile>('/api/logging/weblogs/download-all')
}

export const clear = (data: { before: string }) => {
	return post('/api/logging/auditlogs/clear', data)
}

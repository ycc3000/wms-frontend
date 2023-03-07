import { Application, Setting } from '@/types/app'
import { get, post } from '@/utils/request'

export const getApplication = () => {
	return get<Application>('/api/app/app-info')
}

export const getSetting = () => {
	return get<Setting>('/api/app/settings')
}

export const setSetting = (data: Setting) => {
	return post('/api/app/settings-update', data)
}

export const clearCaches = () => {
	return post('/api/cache/clear')
}

import { EditUser, LoginResult, RefreshTokenResult } from '@/types/user'
import { post } from '@/utils/request'

export const login = (data: { username: string; password: string }) => {
	return post<LoginResult>('/api/user/login', data)
}

export const changePassword = (data: { oldPassword: string; newPassword: string }) => {
	return post<LoginResult>('/api/user/change-password', data)
}

export const refreshToken = (data: { accessToken: string; refreshToken: string }) => {
	return post<RefreshTokenResult>('/api/user/refreshtoken', data)
}

export const createOrUpdate = (data: EditUser) => {
	return post('/api/user/create-or-update', data)
}

export const resetPassword = (data: { username: string; password: string }) => {
	return post('/api/user/reset-password', {
		loginName: data.username,
		password: data.password
	})
}

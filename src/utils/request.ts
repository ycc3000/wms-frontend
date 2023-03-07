import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios'
// import qs from 'qs'
import { notification } from '@/utils/message'
import { useUserStore } from '@/store'
import NProgress from './nprogress'
import { getToken } from './auth'
import { router } from '@/router'

export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>

const service = axios.create({
	timeout: 60000,
	headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		NProgress.start()

		const url = config.url
		if (!url) {
			return config
		}

		if (url.startsWith('/')) {
			config.url = import.meta.env.VITE_API_URL + url
		}

		const whiteList = ['/api/user/refreshtoken', '/api/user/login']
		if (whiteList.some(v => url.indexOf(v) > -1)) {
			return config
		}

		return new Promise(resolve => {
			const data = getToken()
			if (data) {
				const now = new Date().getTime()
				const expired = data.expires - now <= 0
				if (expired) {
					useUserStore()
						.REFRESH_TOKEN(data.accessToken, data.refreshToken)
						.then(res => {
							config.headers['Authorization'] = 'Bearer ' + res.accessToken
							resolve(config)
						})
				} else {
					config.headers['Authorization'] = 'Bearer ' + data.accessToken
					resolve(config)
				}
			} else {
				resolve(config)
			}
		})
	},
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	(response: AxiosResponse) => {
		NProgress.done()
		const { status, data } = response
		if (status >= 200 && status < 300) {
			return data
		}
		return Promise.reject(response)
	},
	(error: AxiosError) => {
		NProgress.done()
		return Promise.reject(error)
	}
)

const getError = (error: any) => {
	const r = { status: 0, message: '出现错误' }
	if (!error.response) {
		if (error.message) {
			r.message = error.message
		}
		return r
	}
	const { data, status } = error.response
	r.status = status
	r.message = getErrorMessage(data)

	if (r.message == '') {
		r.message = getStatusMessage(r.status)
	}
	return r
}

const getStatusMessage = (status: number) => {
	switch (status) {
		case 401:
			return '用户登录失效，请重新登录(401)'
		case 400:
			return '请求错误(400)'
		case 403:
			return '拒绝访问(403)'
		case 404:
			return '请求出错(404)'
		case 408:
			return '请求超时(408)'
		case 500:
			return '服务器错误(500)'
		case 501:
			return '服务未实现(501)'
		case 502:
			return '网络错误(502)'
		case 503:
			return '服务不可用(503)'
		case 504:
			return '网络超时(504)'
		case 505:
			return 'HTTP版本不受支持(505)'
		default:
			return ''
	}
}

const getErrorMessage = (data: any) => {
	let message = ''
	if (data.error && data.error.message) {
		message = data.error.message
		if (data.error.validationErrors) {
			let _message = ''
			const errs = data.error.validationErrors
			for (const err of errs) {
				if (_message.length > 0) {
					_message += `;${err.message}`
				} else {
					_message += err.message
				}
			}
			message = _message
		}
	} else if (data.errors) {
		let _message = ''
		for (const err in data.errors) {
			if (_message.length > 0) {
				_message += `;${data.errors[err]}`
			} else {
				_message += data.errors[err]
			}
		}
		message = _message
	} else if (data.title) {
		message = data.title
	}
	return message
}

export function request<T>(method: RequestMethods, url: string, param?: any, axiosConfig?: AxiosRequestConfig): Promise<T> {
	const config = { method, url, ...param, ...axiosConfig } as AxiosRequestConfig

	return new Promise((resolve, reject) => {
		service
			.request(config)
			.then(response => {
				resolve(response as T)
			})
			.catch(error => {
				const r = getError(error)
				notification.error(r.message)
				if (r.status === 403) {
					router.replace('/403')
				}
				reject(r)
			})
	})
}

export function post<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
	return request<T>('post', url, { data: params }, config)
}

export function get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
	return request<T>('get', url, { params }, config)
}

export default service

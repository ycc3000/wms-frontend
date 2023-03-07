import { ElMessage, ElMessageBox, ElMessageBoxOptions, ElNotification } from 'element-plus'
// import { nextTick } from 'vue'

export const message = {
	success: (message: string, onClose?: () => void) => {
		return ElMessage.success({ message, onClose })
	},
	info: (message: string, onClose?: () => void) => {
		return ElMessage.info({ message, onClose })
	},
	warn: (message: string, onClose?: () => void) => {
		return ElMessage.warning({ message, onClose })
	},
	error: (message: string, onClose?: () => void) => {
		return ElMessage.error({ message, onClose })
	}
}

export const messagebox = {
	success: (message: string, title?: string, options?: ElMessageBoxOptions) => {
		return ElMessageBox.alert(message, title || '提示', {
			type: 'success',
			...options
		})
	},
	info: (message: string, title?: string, options?: ElMessageBoxOptions) => {
		return ElMessageBox.alert(message, title || '提示', {
			type: 'info',
			...options
		})
	},
	warn: (message: string, title?: string, options?: ElMessageBoxOptions) => {
		return ElMessageBox.alert(message, title || '提示', {
			type: 'warning',
			...options
		})
	},
	error: (message: string, title: string, options?: ElMessageBoxOptions) => {
		return ElMessageBox.alert(message, title || '提示', {
			type: 'error',
			...options
		})
	},
	confirm: (message: string, title?: string, options?: ElMessageBoxOptions) => {
		return ElMessageBox.confirm(message, title || '确认', {
			type: 'error',
			...options
		})
	}
}

// export const exception = (ex: IRequestError, options?: INotificationArgs): void => {
//   notification.error({ message: ex.message, ...options })
// }

export const notification = {
	success: (message: string, title?: string) => {
		ElNotification({ title, message, type: 'success' })
	},
	info: (message: string, title?: string) => {
		ElNotification({ title, message, type: 'info' })
	},
	warn: (message: string, title?: string) => {
		ElNotification({ title, message, type: 'warning' })
	},
	error: (message: string, title?: string) => {
		ElNotification({ title, message, type: 'error' })
	}
}

// let loadingInstance
// export const loading = {
//   loading: (text) => {
//     loadingInstance = ElLoading.service({ fullscreen: true, lock: true, background: 'rgba(0, 0, 0, 0.7)', text })
//   },
//   close: () => {
//     if (!loadingInstance) {
//       return
//     }
//     nextTick(() => {
//       loadingInstance.close()
//     })
//   }
// }

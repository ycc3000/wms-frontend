import { get, post } from '@/utils/request'
import { onMounted } from 'vue'
import { message, messagebox } from '@/utils/message'

export interface IHooksOptions {
	getListUrl?: string
	loading?: boolean
	getListOnMounted?: boolean
	getItemUrl?: string
	deleteUrl?: string
	exportUrl?: string
	primaryKey?: string
	selections?: any[]
	query?: any
	paging?: boolean
	page?: number
	limit?: number
	total?: number
	pageSizes?: number[]
	items?: any
	resolveResult?: (res: any) => { total: number; items: any[] }
}

export const useCrud = (options: IHooksOptions) => {
	const defaultOptions: IHooksOptions = {
		loading: false,
		getListOnMounted: true,
		primaryKey: 'id',
		paging: false,
		page: 1,
		limit: 10,
		total: 0,
		pageSizes: [10, 20, 50, 100, 200]
	}

	const mergeDefaultOptions = (options: any, props: any): IHooksOptions => {
		for (const key in options) {
			if (!Object.getOwnPropertyDescriptor(props, key)) {
				props[key] = options[key]
			}
		}
		return props
	}

	const opts = mergeDefaultOptions(defaultOptions, options)

	onMounted(() => {
		if (opts.getListOnMounted) {
			getList()
		}
	})

	const getList = async () => {
		if (!opts.getListUrl) {
			return
		}
		opts.loading = true

		const input = {} as any
		if (opts.paging) {
			input.pageNumber = opts.page
			input.pageSize = opts.limit
		}

		try {
			const res = (await get(opts.getListUrl, {
				...input,
				...opts.query
			})) as any
			if (opts.paging) {
				if (opts.resolveResult) {
					resolveResult(res)
				} else {
					opts.items = res?.items
					opts.total = res?.total
				}
			} else {
				if (opts.resolveResult) {
					resolveResult(res)
				} else {
					opts.items = res
					opts.total = res?.length
				}
			}
		} finally {
			opts.loading = false
		}
	}

	const resolveResult = (res: any) => {
		if (!opts.resolveResult) {
			return
		}
		const { total, items } = opts.resolveResult(res)
		opts.items = items
		opts.total = total
	}

	const getItem = async (params: any) => {
		if (!opts.getItemUrl) {
			return undefined
		}
		opts.loading = true
		try {
			return await get(opts.getItemUrl, params)
		} finally {
			opts.loading = false
		}
	}

	const onPageSizeChanged = (val: number) => {
		opts.page = 1
		opts.limit = val
		getList()
	}

	const onCurrentPageChanged = (val: number) => {
		opts.page = val
		getList()
	}

	const selectionChanged = (selections: any[]) => {
		opts.selections = selections.map((item: any) => opts.primaryKey && item[opts.primaryKey])
	}

	const deleteItem = async (key: number | string) => {
		if (!opts.deleteUrl || !opts.primaryKey) {
			message.warn('没有定义deleteUrl或者primaryKey')
			return
		}

		messagebox.confirm('确定进行删除操作?').then(async () => {
			if (!opts.deleteUrl || !opts.primaryKey) {
				return
			}
			const data = {} as any
			data[opts.primaryKey] = key
			await post(opts.deleteUrl, data)
			message.success('删除成功')
			getList()
		})
	}

	// const deleteBatchHandle = (key?: number | string) => {
	// 	let data: any[] = []
	// 	if (key) {
	// 		data = [key]
	// 	} else {
	// 		data = opts.dataListSelections ? opts.dataListSelections : []

	// 		if (data.length === 0) {
	// 			ElMessage.warning('请选择删除记录')
	// 			return
	// 		}
	// 	}

	// 	ElMessageBox.confirm('确定进行删除操作?', '提示', {
	// 		confirmButtonText: '确定',
	// 		cancelButtonText: '取消',
	// 		type: 'warning'
	// 	})
	// 		.then(() => {
	// 			if (opts.deleteUrl) {
	// 				service.delete(opts.deleteUrl, { data }).then(() => {
	// 					ElMessage.success('删除成功')

	// 					queryData()
	// 				})
	// 			}
	// 		})
	// 		.catch(() => { })
	// }

	return {
		getList,
		getItem,
		deleteItem,
		onPageSizeChanged,
		onCurrentPageChanged,
		selectionChanged
		// sortChangeHandle: function () {},
		// deleteBatchHandle: function () {}
	}
}

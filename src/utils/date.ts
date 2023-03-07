import dayjs from 'dayjs'

export function format(time: string | Date | number, format?: string) {
	if (!time) {
		return ''
	}
	if (!format) {
		format = 'YYYY-MM-DD HH:mm:ss'
	}
	return dayjs(time).format(format)
}

export function isBefore(time1: string | Date | number, time2: string | Date | number) {
	return dayjs(time1).isBefore(time2)
}

export function timeIsBeforeNow(time: string | Date | number) {
	return dayjs(time).isBefore(dayjs())
}

export type DownloadFile = {
	fileName: string
	fileType: string
	fileToken: string
}

export type UploadFileResult = {
	success: boolean
	message: string
	data: string
}

/**
 * 文件流下载
 * @param fileName
 * @param data
 * @param mineType https://www.iana.org/assignments/media-types/media-types.xhtml
 */
export function downloadFile(
  fileName: string,
  data: Blob | ArrayBuffer,
  mineType: string = 'application/octet-stream',
) {
  const url = window.URL.createObjectURL(new Blob([data], { type: mineType }))
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', fileName)
  a.click()
  window.URL.revokeObjectURL(url)
}

/**
 * 文件地址下载
 * @param fileName
 * @param url
 */
export function downloadURL(fileName: string, url: string) {
  const encodeURL = encodeURIComponent(url)
  const a = document.createElement('a')
  a.setAttribute('href', encodeURL)
  a.setAttribute('download', fileName)
  a.click()
}

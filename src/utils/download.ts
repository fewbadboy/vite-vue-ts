export function downloadFile(
  fileName: string,
  data: Blob | ArrayBuffer,
  mineType: string = 'application/octet-stream'
) {
  const url = window.URL.createObjectURL(new Blob([data], { type: mineType }))
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', fileName)
  a.click()
  window.URL.revokeObjectURL(url)
}
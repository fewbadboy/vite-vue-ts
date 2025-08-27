import request from '@/utils/request'

export interface DownloadParams {
  id: string | number
}

/**
 * 请求配置
 * data: 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
 * RESTful API, 大多数框架推荐 delete 用 Path 参数
 * params: 与请求一起发送的 URL 参数,必须是一个简单对象或 URLSearchParams 对象
 */
export function getDownload(params: DownloadParams) {
  return request({
    url: '/captcha',
    method: 'get',
    params,
    responseType: 'blob',
  })
}

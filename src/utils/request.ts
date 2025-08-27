import axios from 'axios'
import { ElMessage } from 'element-plus'
/**
 * application/x-www-form-urlencoded: URLSearchParams
 * multipart/form-data: FormData
 */

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    'X-Custom-Header': 'vite',
  },
  adapter: (config) => {
    // Custom adapter to handle requests
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(config.method!.toUpperCase(), config.url!, true)
      xhr.responseType = 'json'
      xhr.setRequestHeader('Content-Type', 'application/json')
      for (const key in config.headers) {
        if (config.headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, config.headers[key])
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(new Error(`Request failed with status code ${xhr.status}`))
        }
      }
      xhr.onerror = () => {
        reject(new Error('Network error'))
      }
      xhr.send(JSON.stringify(config.data))
    })
  },
})

// Add a request interceptor
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)
// Add a response interceptor
request.interceptors.response.use(
  /**
   * data
   * status
   * statusText
   * headers
   * config
   * request
   */
  (response) => {
    /**
     * 下载文件的信息
     * blob--size
     * arrayBuffer--byteLength
     * 进行跨域请求时，后端需要明确暴露该头部
     * Access-Control-Allow-Headers: Content-Disposition
     * Access-Control-Expose-Headers: Content-Disposition
     *
     * headers: {
     *  'content-disposition': 'attachment;filename=xxx.xlsx' 仅支持 ASCII，不支持中文、空格、特殊字符
     *  'content-disposition': 'attachment;filename*=UTF-8''xxx.xlsx' 支持 UTF-8 编码
     * }
     */
    const {
      status,
      config: { responseType },
      data: { size, arrayBuffer },
      data,
    } = response
    if (/(blob|arrayBuffer)/.test(responseType!)) {
      if (
        status === 200 && responseType === 'blob' ? size > 0 : arrayBuffer > 0
      ) {
        return Promise.resolve({
          data,
          disposition: decodeURIComponent(
            response.headers['content-disposition'],
          ),
        })
      }
      return Promise.reject(data)
    }
    const res = response.data
    if (res.code !== 200) {
      // 401
      if (res.code === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(res)
    }
    return res
  },
  /**
   * response
   *  data
   *  status
   *  headers
   * message
   * request
   * config
   */
  (error) => {
    const {
      config: { url },
      response: {
        data: { message },
        status,
      },
    } = error

    ElMessage({
      message: message || error.message,
      type: 'error',
      duration: 5 * 1000,
    })

    if (status === 401 && url !== '/login') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default request

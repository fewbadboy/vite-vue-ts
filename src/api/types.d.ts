export interface PageParams {
  current: number
  size: number
  total: number
}

export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

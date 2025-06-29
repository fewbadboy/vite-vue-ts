import request from '@/utils/request'

export interface UserInfoType {
  name: string
  address?: string
  date?: string
}

export function login(data: { username: string; password: string }) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

export function getUserInfo(): Promise<{ data: UserInfoType }> {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

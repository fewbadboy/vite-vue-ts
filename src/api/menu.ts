import request from '@/utils/request'

export type MenuType = {
  index: string
  title: string
  icon?: string
  children?: MenuType[]
}

export function login() {
  return request({
    url: '/menu/get',
    method: 'get',
  })
}

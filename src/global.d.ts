import 'vue-router'
import type { ECharts } from 'echarts'

declare module 'vue-router' {
  // 继承来自 vue-router 中的 RouteMeta 来为 meta 字段添加类型
  interface RouteMeta {
    title?: string
    hidden?: boolean
    transition?: string
    roles?: string[]
  }
}

declare global {
  type ChartInstance = ECharts | null
}

export type UserInfoType = {
  name: string
  avatar: string
  roles: string[]
  menus: string[]
}

export type Quaternion = {
  w: number
  x: number
  y: number
  z: number
}

/**
 * roll: front-to-back axis 飞机翻滚的样子
 * pitch: side-to-side axis 飞机爬升或俯冲的样子
 * yaw: vertical axis 飞机偏航
 */
export type EulerAngles = {
  roll: number
  pitch: number
  yaw: number
}

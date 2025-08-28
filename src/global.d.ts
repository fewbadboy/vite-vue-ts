import 'vue-router'
import type { ECharts } from 'echarts'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    hidden?: boolean
    noCache?: boolean
    affix?: boolean
    activeMenu?: string
    transition?: string
    roles?: string[]
  }
}

declare global {
  type ChartInstance = ECharts | null
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

import 'vue-router'

export {}

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

/**
 * User information interface
 */
export interface UserInfoType {
  name: string
  avatar: string
  roles: string[],
  menus: string[]
}

export interface Quaternion {
  w: number;
  x: number;
  y: number;
  z: number;
}

export interface EulerAngles {
  roll: number;
  pitch: number;
  yaw: number;
}
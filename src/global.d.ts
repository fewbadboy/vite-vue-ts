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

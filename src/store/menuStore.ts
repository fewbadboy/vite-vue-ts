import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router'

/**
 * 检查用户是否有权限访问特定路由
 * 先匹配 route.name，如果没有匹配到，则匹配 route.meta.title
 * @param menusName - Array of menu names that the user has access to
 * @param route - The route record to check
 * @return boolean - Returns true if the user has permission, false otherwise
 * */
function hasPermission(menusName: string[], route: RouteRecordRaw): boolean {
  return !!(
    menusName.includes(route.name! as string) ||
    (route.meta?.title && menusName.includes(route.meta.title))
  )
}

/**
 * 过滤路由
 * @param routes - Array of route records to filter
 * @param menusName - Array of menu names that the user has access to
 * @return Filtered array of route records
 */
function filterRoutes(
  routes: Array<RouteRecordRaw>,
  menusName: string[],
): Array<RouteRecordRaw> {
  const filteredRoutes: Array<RouteRecordRaw> = []
  routes.forEach((route) => {
    const tempRoute = { ...route }
    if (hasPermission(menusName, tempRoute)) {
      if (tempRoute.children) {
        tempRoute.children = filterRoutes(tempRoute.children, menusName)
      }
      filteredRoutes.push(tempRoute)
    }
  })
  return filteredRoutes
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    constantMenus: [] as Array<RouteRecordRaw>,
    asyncMenus: [] as Array<RouteRecordRaw>,
  }),
  getters: {
    getMenus: (state) => [...state.constantMenus, ...state.asyncMenus],
  },
  actions: {
    setConstantMenus(menus: Array<RouteRecordRaw>) {
      this.constantMenus = menus
    },
    setAsyncMenus(menus: Array<RouteRecordRaw>) {
      this.asyncMenus = menus
    },
    resetMenus() {
      this.constantMenus = []
      this.asyncMenus = []
    },
    /**
     * 加载常量菜单
     */
    loadConstantMenus() {
      const filteredRoutes = constantRoutes.filter((route) => {
        return !route.meta?.hidden
      })
      this.setConstantMenus(filteredRoutes)
    },
    /**
     * 获取用户权限路由
     * @param menusName - Array of menu names that the user has access to
     * @returns
     */
    loadRoutes(menusName: string[]): Array<RouteRecordRaw> {
      this.loadConstantMenus()
      const filteredRoutes = filterRoutes([...asyncRoutes], menusName)
      this.setAsyncMenus(filteredRoutes)
      return filteredRoutes
    },
  },
})

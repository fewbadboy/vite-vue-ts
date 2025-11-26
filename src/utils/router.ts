import type { RouteRecordRaw } from 'vue-router'
import router, { staticRoutes } from '@/router'

function routerNames(route: RouteRecordRaw, names: string[]) {
  if (route.name) {
    names.push(route.name as string)
  }
  if (route.children) {
    route.children.forEach((child) => routerNames(child, names))
  }
}

function getStaticRoutesName(staticRoutes: RouteRecordRaw[]) {
  const names: string[] = []
  staticRoutes.forEach((route) => routerNames(route, names))
  return names
}

/**
 * 移除动态添加的路由(通过路由中设置的 name 属性)
 */
export function removeAddedRouter() {
  const staticRoutesNames = getStaticRoutesName(staticRoutes)
  router.getRoutes().forEach((route) => {
    if (route.name && !staticRoutesNames.includes(route.name as string)) {
      router.removeRoute(route.name)
    }
  })
}

/**
 * 重构路由
 * @param dynamicRoutes 动态路由
 */
export async function rebuildRoutes(dynamicRoutes: RouteRecordRaw[]) {
  removeAddedRouter()

  dynamicRoutes.forEach((r) => router.addRoute(r))

  router.addRoute({
    // 将匹配所有内容并将其放在 route.params.pathMatch 下
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/not-found/index.vue'),
  })
}

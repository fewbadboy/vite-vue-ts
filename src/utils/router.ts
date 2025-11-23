import type { RouteRecordRaw } from 'vue-router'
import router, { staticRoutes } from '@/router'

/**
 * 移除动态添加的路由(通过路由中设置的 name 属性)
 */
export function removeAddedRouter() {
  const addedRoutes = router
    .getRoutes()
    .filter((r) => !staticRoutes.some((s) => s.path === r.path))

  /**
   * 动态添加的路由都得存在 name 属性
   */
  addedRoutes.forEach((r) => {
    if (r.name) {
      router.removeRoute(r.name)
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

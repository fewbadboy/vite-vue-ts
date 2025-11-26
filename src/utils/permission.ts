import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useUserStore } from '@/store'
import { getCookie } from '@/utils/cookie'
import { rebuildRoutes } from './router'

export async function canAccessPage(to: RouteLocationNormalized) {
  let isAddingRoutes = false // 防止重复加载

  const userStore = useUserStore()
  const { isRoutesLoaded } = storeToRefs(userStore)

  console.log('已加载动态路由？', isRoutesLoaded.value)

  const token = getCookie()

  console.log('hasToken:', !!token)

  // 无 token
  if (!token) {
    // 非 login 页才跳转
    // 允许访问 login
    return to.name !== 'login' ? { name: 'login' } : true
  }

  if (to.name === 'login') {
    return { name: 'dashboard' }
  }

  // 动态添加路由 未加载 -> 加载
  if (!isRoutesLoaded.value) {
    // 防止并发请求-简单锁
    if (isAddingRoutes) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      // 递归重试
      return canAccessPage(to)
    }

    isAddingRoutes = true

    try {
      // 模拟请求的动态路由
      const userRoutes: RouteRecordRaw[] = await new Promise((resolve) => {
        resolve([
          {
            path: '/book',
            name: 'book',
            component: () => import('@/views/book/index.vue'),
            children: [
              {
                path: ':id(\\d+)',
                name: 'book-detail',
                component: () => import('@/views/book/book-id.vue'),
              },
            ],
          },
        ])
      })

      // 重构新路由
      rebuildRoutes(userRoutes)

      console.log('重构完的完整路由：', router.getRoutes())

      // 标记已添加了路由
      isRoutesLoaded.value = true
    } catch (error) {
      console.log(error)
      // TODO
      return { name: 'login' }
    } finally {
      isAddingRoutes = false
    }
  }

  // 检查目标路由存在否
  console.log('获取匹配到的', to)
  console.log('获取匹配到的', router.resolve(to).matched)
  const existTargetRoute = router.resolve(to).matched.length > 0
  if (!existTargetRoute) {
    // TODO
    return { name: 'notfound' }
  }

  // TODO:设置权限等操作

  return true
}

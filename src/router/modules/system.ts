import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const systemRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role.vue'),
      },
      {
        path: 'organization',
        name: 'Organization',
        component: () => import('@/views/system/organization.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu.vue'),
      },
    ],
  },
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Demo',
        component: () => import('@/views/demo/index.vue'),
      },
    ],
  },
]

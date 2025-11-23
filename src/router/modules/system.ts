import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const systemRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'system',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user.vue'),
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/system/role.vue'),
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/system/organization.vue'),
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/system/menu.vue'),
      },
    ],
  },
  {
    path: '/demo',
    name: 'demo',
    component: Layout,
    children: [
      {
        path: '',
        name: 'demo-main',
        component: () => import('@/views/demo/index.vue'),
      },
    ],
  },
]

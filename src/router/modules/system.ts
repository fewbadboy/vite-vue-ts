import Layout from '@/views/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const systemRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: 'System Management',
      icon: 'home',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
        meta: {
          title: 'User Management',
          roles: ['admin', 'editor'],
        },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role.vue'),
        meta: {
          title: 'Role Management',
          roles: ['admin', 'editor'],
        },
      },
      {
        path: 'organization',
        name: 'Organization',
        component: () => import('@/views/system/organization.vue'),
        meta: {
          title: 'Organization Management',
          roles: ['admin', 'editor'],
        },
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu.vue'),
        meta: {
          title: 'Menu Management',
          roles: ['admin', 'editor'],
        },
      },
    ]
  }
]
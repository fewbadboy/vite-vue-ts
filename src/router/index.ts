import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { systemRoutes } from './modules/system'

import Layout from '@/layout/index.vue'

/**
 * 路由
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: Layout,
    children: [
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/about/team.vue'),
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/about/company.vue'),
      },
    ],
  },
  ...systemRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: staticRoutes,
  sensitive: false, // default
  /**
   * { path: '/users/:id?' }
   * will match /users, /Users, /users/42, /users/ and /users/42/
   */
  strict: false, // default
  scrollBehavior: () => ({ top: 0 }),
})

export default router

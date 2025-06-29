import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { systemRoutes } from './modules/system'

import Layout from '@/views/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
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
        name: 'Dashboard',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    children: [
      {
        path: 'team',
        name: 'Team',
        component: () => import('@/views/about/team.vue'),
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/about/company.vue'),
      },
    ],
  },
  {
    path: '/book/:id(\\d+?)',
    component: () => import('@/views/book/index.vue'),
    children: [
      // when /user/:id(\\d+?) is matched
      {
        path: '',
        name: 'Book',
        component: () => import('@/views/book/book-id.vue'),
      },
    ],
  },
  ...systemRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  sensitive: false, // default
  /**
   * { path: '/users/:id?' }
   * will match /users, /Users, /users/42, /users/ and /users/42/
   */
  strict: false, // default
  scrollBehavior: () => ({ top: 0 }),
})

export default router

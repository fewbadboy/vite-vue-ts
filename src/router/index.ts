import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { systemRoutes } from './modules/system'

import Layout from '@/views/layout/index.vue'

export const constantRoutes: Array<RouteRecordRaw> = [
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
    meta: {
      title: 'Dashboard',
      icon: 'home',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/home/index.vue'),
      }
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    meta: {
      title: 'About',
      icon: 'home',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'team',
        name: 'Team',
        component: () => import('@/views/about/team.vue'),
        meta: {
          title: 'Team',
          roles: ['admin', 'editor'],
        },
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/about/company.vue'),
        meta: {
          title: 'Company',
          roles: ['admin', 'editor'],
        },
      }
    ],
  },
  {
    path: '/book/:id(\\d+?)',
    component: () => import('@/views/book/index.vue'),
    meta: {
      hidden: true,
    },
    children: [
      // when /user/:id(\\d+?) is matched
      {
        path: '',
        name: 'Book',
        component: () => import('@/views/book/book-id.vue')
      }
    ]
  },
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  ...systemRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  sensitive: false, // default
  /**
   * { path: '/users/:id?' }
   * will match /users, /Users, /users/42, /users/ and /users/42/
   */
  strict: false, // default
  scrollBehavior: () => ({ top: 0 }),
})

export default router
import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/views/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-s-home',
          roles: ['admin', 'editor'],
        },
      }
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: Layout,
    meta: {
      title: 'About',
      icon: 'el-icon-info',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/about/team.vue'),
        meta: {
          title: 'Team',
          icon: 'el-icon-user',
          roles: ['admin', 'editor'],
        },
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/about/company.vue'),
        meta: {
          title: 'Company',
          icon: 'el-icon-building',
          roles: ['admin', 'editor'],
        },
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
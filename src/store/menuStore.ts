import type { MenuType } from '@/api/menu'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [
      { index: '/', title: '主页', icon: 'home' },
      {
        index: '/about',
        title: 'About',
        icon: 'home',
        children: [
          { index: 'team', title: 'Team' },
          { index: 'company', title: 'Company' },
        ],
      },
      {
        index: '/system',
        title: 'System',
        icon: 'home',
        children: [
          { index: 'user', title: 'User' },
          { index: 'role', title: 'Role' },
          { index: 'organization', title: 'Organization' },
          { index: 'menu', title: 'Menu' },
        ],
      },
      {
        index: '/demo',
        title: 'Demo',
        icon: 'home',
      },
    ] as MenuType[],
  }),
  getters: {
    getMenus: (state) => [...state.menus],
  },
  actions: {
    $reset() {
      this.menus = []
    },

    setMenus(menus: MenuType[]) {
      this.menus = menus
    },
  },
})

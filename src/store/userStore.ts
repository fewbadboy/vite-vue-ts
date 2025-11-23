import type { UserInfoType } from '@/global'
import { computed, ref } from 'vue'
import { setCookie } from '@/utils/cookie'
import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'

/**
 * store.$patch({ count: store.count + 1 })
 * store.$patch((state) => { state.roles.push('guest') }) // 集合修改
 */
export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  /**
   * 标记路由加载状态
   * false 未加载
   */
  const isRoutesLoaded = ref(false)

  const userInfo = ref<UserInfoType>({
    name: 'Vite Admin',
    avatar: '',
    roles: [],
    menus: [],
  })

  const doubleCount = computed(() => count.value * 2)

  const increment = () => {
    count.value++
  }

  // Reset the store
  function $reset() {
    count.value = 0
    userInfo.value = {
      name: '',
      avatar: '',
      roles: [],
      menus: [],
    }
  }

  async function handleLogin() {
    const { data } = await login({ username: 'admin', password: 'admin' })

    setCookie(`${data.token_type} ${data.access_token}`)
  }

  async function handleGetUserInfo() {
    const { data } = await getUserInfo()
    userInfo.value = data
    return data
  }

  return {
    count,
    isRoutesLoaded,
    userInfo,
    doubleCount,
    increment,
    handleLogin,
    handleGetUserInfo,
    $reset,
  }
})

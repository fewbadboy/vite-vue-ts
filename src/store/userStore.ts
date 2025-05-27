import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { login, getUserInfo } from "@/api/user";
import type { UserInfoType } from "@/global";

export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const token = ref("")
  const userInfo = ref<UserInfoType>({
    name: "Vite Admin",
    avatar: "",
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
    token.value = ""
    userInfo.value = {
      name: "",
      avatar: "",
      roles: [],
      menus: [],
    }
  }

  async function handleLogin() {
    const { data } = await login({ username: "admin", password: "admin" })
    token.value = `${data.token_type} ${data.access_token}`
  }

  async function handleGetUserInfo() {
    const { data } = await getUserInfo()
    userInfo.value = data
    return data
  }

  return {
    count,
    token,
    userInfo,
    doubleCount,
    increment,
    handleLogin,
    handleGetUserInfo,
    $reset,
  }
})

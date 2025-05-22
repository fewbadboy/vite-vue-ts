import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { UserInfo } from "@/global";

export const useUserStore = defineStore('user', () => {
  const count = ref(0)
  const token = ref("")
  const userInfo = ref<UserInfo>({
    name: "Vite Admin",
    avatar: "",
    roles: [],
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
    }
  }

  return {
    count,
    token,
    userInfo,
    doubleCount,
    increment,
    $reset,
  }
})

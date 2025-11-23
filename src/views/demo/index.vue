<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { parseDate, fromNow } from '@/utils'
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()
const userStore = useUserStore()
const { count, userInfo } = storeToRefs(userStore)
const { increment } = userStore

const date = ref(new Date())
const iconName = ref('home')

onMounted(() => {
  // getMockUser()
})

function toBook() {
  router.push({ name: 'book', params: { id: 1 }, query: { id: 1 } })
}

async function getMockUser() {
  const response = await fetch('/api/user')
  const user = await response.json()
  console.log(user)
}
</script>

<template>
  <div class="home">
    <h1>Home</h1>
    <p class="red text-3xl font-bold underline">
      <SvgIcon :icon-class="iconName" />
      Vite + Vue + TypeScript + Pinia + Vue Router
    </p>
    <div>I18N: {{ $t('message.hello', { name: userInfo.name }) }}</div>
    <div>
      时间：<span>{{ $d(new Date(), 'long') }}</span>
    </div>
    <div>
      百分数：<span>{{ $n(0.99123, 'percent') }}</span>
    </div>
    <div>
      十进制：<span>{{ $n(12131415.11612345, 'decimal') }}</span>
    </div>
    <div>
      钱包：<span>{{ $n(2048, 'currency') }}</span>
    </div>
    <div>
      DayJS: {{ parseDate(Date.now()) }} -
      {{ fromNow(new Date('2025-05-25 12:00:00')) }}
    </div>
    <div>
      <span>{{ count }}</span>
    </div>
    <RouterLink to="/not-found" class="text-blue-500 hover:underline">
      Go to 404 Page
    </RouterLink>
    <RouterLink to="/book/10" class="text-blue-500 hover:underline">
      Go to /book/10
    </RouterLink>
    <RouterLink to="/book/hello" class="text-blue-500 hover:underline">
      Go to /book/hello
    </RouterLink>
    <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="Select date and time"
    />
    <el-button type="primary" @click="toBook">/book/1</el-button>
    <el-button type="primary" @click="increment">Increment</el-button>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
</style>

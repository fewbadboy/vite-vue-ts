<script setup lang="ts">
import { ref } from 'vue'
import { parseDate, fromNow } from '@/utils'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import SvgIcon from '@/components/SvgIcon.vue'

const userStore = useUserStore()
const { count, userInfo } = storeToRefs(userStore)
const { increment } = userStore

const date = ref(new Date())
const iconName = ref('home')
</script>

<template>
  <div class="home">
    <h1>Home</h1>
    <p class="text-3xl font-bold underline red">
      <SvgIcon
        :icon-class="iconName"
      />
      Vite + Vue + TypeScript + Pinia + Vue Router
    </p>
    <div>I18N: {{ $t('message.hello', { name: userInfo.name }) }}</div>
    <div>时间：<span>{{ $d(new Date(), 'long') }}</span></div>
    <div>百分数：<span>{{ $n(0.99123, 'percent') }}</span></div>
    <div>十进制：<span>{{ $n(12131415.11612345, 'decimal') }}</span></div>
    <div>钱包：<span>{{ $n(2048, 'currency') }}</span></div>
    <div>DayJS: {{ parseDate(Date.now()) }} - {{ fromNow(new Date('2025-05-25 12:00:00')) }}</div>
    <div>
      <span>{{ count }}</span>
    </div>
    <RouterLink
      to="/not-found"
      class="text-blue-500 hover:underline"
    >
      Go to 404 Page
    </RouterLink
    <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="Select date and time"
    />
    <el-button type="primary" @click="increment">Increment</el-button>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
</style>
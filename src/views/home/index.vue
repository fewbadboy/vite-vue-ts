<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import SvgIcon from '@/components/SvgIcon.vue'

const userStore = useUserStore()
const { count, userInfo } = storeToRefs(userStore)
const { increment } = userStore

const date = ref(new Date())

const name = "AAAA"
console.log(name);


</script>
<template>
  <div class="home">
    <h1>Home</h1>
    <p class="text-3xl font-bold underline red">
      <SvgIcon
        icon-class="home"
      />
      Vite + Vue + TypeScript + Pinia + Vue Router
    </p>
    <div>I18N: {{ $t('message.hello', { name: userInfo.name }) }}</div>
    <div>时间：<span>{{ $d(new Date(), 'long') }}</span></div>
    <div>百分数：<span>{{ $n(0.99123, 'percent') }}</span></div>
    <div>十进制：<span>{{ $n(12131415.11612345, 'decimal') }}</span></div>
    <div>钱包：<span>{{ $n(2048, 'currency') }}</span></div>
    <div>
      <span>{{ count }}</span>
    </div>
    <el-date-picker
      v-model="date"
      type="datetime"
      placeholder="Select date and time"
    />
    <el-button type="primary" @click="increment">Increment</el-button>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.home {
  text-align: center;
  padding: 2rem;
}
.red {
  @apply text-red-500;
}
</style>
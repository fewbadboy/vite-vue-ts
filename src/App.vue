<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

console.log(import.meta.env.VITE_API_URL, 'VITE_API_URL')
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <div>
      <router-view />
    </div>
  </ElConfigProvider>
</template>

<style scoped></style>

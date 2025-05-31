<script setup lang="ts">
import layoutMenu from './layout-menu.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
const { userInfo } = storeToRefs(useUserStore())

import vue from '@/assets/vue.svg'
function logout() {
  // todo
}
</script>

<template>
  <div class="header">
    <div class="logo">
      <img :src="vue" alt="Logo" />
    </div>
    <div class="nav-bar">
      <layoutMenu />
    </div>
    <div class="user-info">
      <p>{{ userInfo.name }}</p>
      <el-button type="primary" @click="logout">Logout</el-button>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';
.header {
  @apply flex items-center justify-between inset-shadow-[0_-1px] inset-shadow-gray-200;
}
.user-info {
  @apply flex items-center;
}
</style>
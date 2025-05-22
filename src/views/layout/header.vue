<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import {
  Location,
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
const { userInfo } = storeToRefs(useUserStore())

import vue from '@/assets/vue.svg'
function logout() {
  console.log('User logged out')
}
</script>

<template>
  <div class="header">
    <div class="logo">
      <img :src="vue" alt="Logo" />
    </div>
    <div class="nav-bar">
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :unique-opened="true"
        :default-active="$route.path"
        :router="true"
        @select="(index: RouteLocationRaw) => $router.push(index)"
      >
        <el-menu-item index="/">
          <el-icon><location /></el-icon>
          <span>Home</span>
        </el-menu-item>
        <el-sub-menu index="/about">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>About</span>
          </template>
          <el-menu-item index="/about/team">Team</el-menu-item>
          <el-menu-item index="/about/company">Company</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/contact">Contact</el-menu-item>
      </el-menu>
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
  @apply flex items-center justify-between border-b-2 border-gray-200;
}
.user-info {
  @apply flex items-center;
}
</style>
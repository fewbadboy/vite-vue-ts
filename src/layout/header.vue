<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { UserFilled } from '@element-plus/icons-vue'
import layoutMenu from './layout-menu.vue'
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
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar :size="30" :icon="UserFilled" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="clearfix">
              <span>{{ userInfo.name }}</span>
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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

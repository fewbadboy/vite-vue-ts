<script setup lang="ts">
import LayoutHeader from './header.vue'
</script>
<template>
  <div class="layout">
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>
@reference 'tailwindcss';
</style>
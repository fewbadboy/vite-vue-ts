<script setup lang="ts">
import { ref } from 'vue'
import LayoutHeader from './header.vue'

const isCollapsed = ref(false)
</script>

<template>
  <div class="layout" :class="{ 'sidebar-collapsed': isCollapsed }">
    <el-container>
      <el-header>
        <LayoutHeader />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
/* @reference 'tailwindcss'; */
/**
  网格布局：所有内容在同一页展示
*/
:root {
  --sidebar-width: 240px;
}

/* 收起状态 */
.app-layout.sidebar-collapsed {
  --sidebar-width: 60px;
}
.app-layout {
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main'
    'footer footer';
  grid-template-rows: 60px 1fr 40px; /* 行高：头、内容自适应、脚 */
  grid-template-columns: var(--sidebar-width) 1fr; /* 列宽：侧边栏固定，主内容撑满 */
  height: 100vh; /* 全屏高度 */
  overflow: hidden;
}

.layout-header {
  grid-area: header;
  background: #333;
  color: white;
}
.layout-sidebar {
  grid-area: sidebar;
  background: #f5f5f5;
}
.layout-main {
  grid-area: main;
  padding: 16px;
  overflow-y: auto;
}
.layout-footer {
  grid-area: footer;
  background: #eee;
  text-align: center;
}

/** 响应式处理 */
@media (max-width: 768px) {
}
</style>

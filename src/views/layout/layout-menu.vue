<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/store';

const route = useRoute();
const router = useRouter();

const menuStore = useMenuStore();

function handleIndex(routePath: string, parentPath?: string): string {
  if (!parentPath) {
    return routePath;
  }
  return `${parentPath.replace(/\/$/, '')}/${routePath}`;
}

function handleSelect(index: RouteLocationRaw) {
  router.push(index);
}
</script>

<template>
  <el-menu
    mode="horizontal"
    :ellipsis="false"
    :unique-opened="true"
    :default-active="route.path"
    :router="true"
    @select="handleSelect"
  >
    <template
      v-for="(item, index) in menuStore.getMenus"
      :key="index"
    >
      <el-menu-item
        v-if="!item.children || item.children.length === 0 || item.children.length === 1"
        :index="handleIndex(item.path)"
      >
        <SvgIcon :icon-class="item.meta?.icon" />
        <span class="ml-2">{{ item.name || item.meta?.title }}</span>
      </el-menu-item>
      <el-sub-menu
        v-else
        :index="handleIndex(item.path)"
      >
        <template #title>
          <SvgIcon :icon-class="item.meta?.icon" />
          <span class="ml-2">{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="handleIndex(child.path, item.path)"
        >
          {{ child.name }}
        </el-menu-item>
      </el-sub-menu>
    </template>
    <!-- <el-menu-item index="/">
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
    <el-menu-item index="/contact">Contact</el-menu-item> -->
  </el-menu>
</template>

<style scoped>

</style>
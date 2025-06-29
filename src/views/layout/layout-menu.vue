<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/store'

const route = useRoute()
const router = useRouter()

const menuStore = useMenuStore()

function handleIndex(routePath: string, parentPath?: string): string {
  if (!parentPath) {
    return routePath
  }
  return `${parentPath.replace(/\/$/, '')}/${routePath}`
}

function handleSelect(index: RouteLocationRaw) {
  router.push(index)
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
    <template v-for="(item, index) in menuStore.getMenus" :key="index">
      <el-menu-item
        v-if="!item.children || item.children.length <= 1"
        :index="handleIndex(item.index)"
      >
        <SvgIcon :icon-class="item.icon" />
        <span class="ml-2">{{ item.title }}</span>
      </el-menu-item>
      <el-sub-menu v-else :index="handleIndex(item.index)">
        <template #title>
          <SvgIcon :icon-class="item.icon" />
          <span class="ml-2">{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.index"
          :index="handleIndex(child.index, item.index)"
        >
          {{ child.title }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped></style>

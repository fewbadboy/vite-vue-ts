<script setup lang="ts">
import router from '@/router'
import { setCookie } from '@/utils/cookie'

function handleLogin() {
  setCookie('Bearer puppy')
  setTimeout(() => {
    router.push({ name: 'dashboard' })
  }, 2400)
}
</script>
<template>
  <el-container>
    <el-main>
      <el-row justify="center">
        <el-col :span="6" class="text-center">
          <el-button @click="handleLogin">Login</el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>
.login {
  text-align: center;
  padding: 2rem;
}
</style>

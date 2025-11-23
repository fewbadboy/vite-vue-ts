<script setup lang="ts">
import { ElButton, ElMessageBox } from 'element-plus'
function handleShowMessage() {
  ElMessageBox.alert('Contact Us at king@qq.com', 'Contact Information', {
    confirmButtonText: 'OK',
  })
}
</script>
<template>
  <div class="layout">
    <h1>Our Team</h1>
    <p>Meet the amazing team behind our success.</p>
    <ElButton type="primary" @click="handleShowMessage">Contact Us</ElButton>
  </div>
</template>
<style scoped></style>

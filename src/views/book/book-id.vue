<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
console.log(route);

</script>
<template>
  <div class="book-id">
    BOOK-ID 子路由
    <span>/book/{{ route.params.id }}</span>
    <span>?id={{ route.query.id }}</span>
  </div>
</template>

<style scoped>
.book-id {
  text-align: center;
  padding: 2rem;
}
</style>
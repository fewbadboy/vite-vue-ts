<script setup lang="ts">

</script>

<template>
  <div class="home">
    <p class="text-3xl font-bold underline red container">
      Vite + Vue + TypeScript + Pinia + Vue Router
    </p>
  </div>
</template>

<style scoped>
/**
  If you're using Tailwind with Vue, recommend avoiding <style> blocks in your components.
  If you do use <style> blocks, make sure to import your global styles as reference if you want features like @apply to work as expected.

  Or use your globally defined CSS variables instead of features like @apply, which don't require Tailwind to process your component CSS at all
  .bg-blue-500 {
    background-color: var(--color-blue-500);
  }
*/
@reference 'tailwindcss';
.home {
  text-align: center;
  padding: 2rem;
}
.red {
  @apply text-red-600;
}
</style>
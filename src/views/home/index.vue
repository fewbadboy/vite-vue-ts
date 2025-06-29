<script setup lang="ts"></script>

<template>
  <div class="dashboard">
    <div class="item a"></div>
    <div class="item b"></div>
    <div class="item c"></div>
    <div class="item d"></div>
  </div>
</template>

<style scoped>
.dashboard {
  height: calc(100vh - 100px);
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    'a b'
    'c d';
}
.a {
  grid-area: a;
}
.b {
  grid-area: b;
}
.c {
  grid-area: c;
}
.d {
  grid-area: d;
}
.item {
  border: 1px solid red;
}
</style>

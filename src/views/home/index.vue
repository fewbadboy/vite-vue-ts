<script setup lang="ts">
import { reactive, ref } from 'vue'
import LineChart from './components/line-chart.vue'
import SayContent from './components/say-content.vue'

const upper = ref('HELLO')

const obj = reactive({
  content: 'click',
  count: 0,
})

function handleClick() {
  obj.content = 'click again!'
  obj.count++
}
</script>

<template>
  <div class="dashboard">
    <div class="item a">
      <LineChart />
    </div>
    <div class="item b">
      <el-button @click="handleClick">Default</el-button>
      <SayContent v-model:title.lower="upper" v-bind="obj" class="red" />
    </div>
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

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import LineChart from './components/line-chart.vue'
import SayContent from './components/say-content.vue'

const upper = ref('')
const open = ref(false)

const obj = reactive({
  content: 'try click Default button',
  count: 0,
})

/**
 * 计算属性：处理依赖响应式状态的复杂逻辑
 * 返回一个计算属性 ref
 */
const doubleCount = computed(() => obj.count * 2)

async function handleClick(event: Event) {
  obj.content = 'click again!'
  obj.count++
  await nextTick()
  console.log('home Component DOM 已经更新完毕', event)
}
</script>

<template>
  <div class="dashboard">
    <div class="item a">
      <LineChart />
    </div>
    <div class="item b">
      <el-button @click="(event: Event) => handleClick(event)" class="m-4"
        >Increment + 1</el-button
      >
      <SayContent
        v-model:title.upper="upper"
        :content="obj.content"
        :count="doubleCount"
        class="red"
      />
      <div>double count: {{ doubleCount }}</div>
    </div>
    <div class="item c"></div>
    <div id="cPart" class="item d">
      <el-button @click="" class="m-4">show teleport</el-button>
      <Teleport defer to="#cPart">
        <div v-if="open" class="modal">
          <p>Hello from the modal!</p>
          <el-button @click="open = false">Close</el-button>
        </div>
      </Teleport>
    </div>
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

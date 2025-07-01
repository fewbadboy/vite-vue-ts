<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from 'lodash'
import * as echarts from 'echarts'

const lineChart = ref<ChartElement>(null)
let myChart: ChartInstance = null

onMounted(() => {
  myChart = echarts.init(lineChart.value)
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  }
  myChart.setOption(option)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (myChart) {
    myChart.dispose()
    myChart = null
  }
})

const handleResize = debounce(() => {
  myChart?.resize()
})
</script>
<template>
  <div ref="lineChart" class="h-full"></div>
</template>
<style scoped></style>

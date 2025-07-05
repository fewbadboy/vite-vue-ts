<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, useTemplateRef } from 'vue'
import { useCharts } from '@/utils/composition'
import type { EChartsOption } from 'echarts'

const lineChart = useTemplateRef<HTMLElement>('lineChart')
const option = ref<EChartsOption>({
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
})

useCharts(lineChart, option as Ref<EChartsOption>)

setTimeout(() => {
  option.value = {
    ...option.value,
    series: [
      {
        data: [100, 200, 300, 400, 300, 200, 100],
        type: 'line',
      },
    ],
  }
}, 3000)
</script>
<template>
  <div ref="lineChart" class="h-full"></div>
</template>
<style scoped></style>

<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useCharts } from '@/utils/composition'
import type { EChartsOption } from 'echarts'

const lineChart = useTemplateRef<HTMLElement>('lineChart')
const option: EChartsOption = {
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

useCharts(lineChart, option)
</script>
<template>
  <div ref="lineChart" class="h-full"></div>
</template>
<style scoped></style>

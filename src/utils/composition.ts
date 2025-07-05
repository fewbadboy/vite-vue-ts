import type { Ref, TemplateRef } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'
import { debounce } from 'lodash'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

export function useCharts(
  chartRef: TemplateRef<HTMLElement>,
  option: Ref<EChartsOption>,
) {
  let chartInstance: ChartInstance = null

  const handleResize = debounce(() => {
    chartInstance?.resize()
  }, 500)

  onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    chartInstance?.dispose()
    chartInstance = null
  })

  watch(
    option,
    () => {
      chartInstance && chartInstance.setOption(option.value, true)
    },
    { deep: true },
  )

  function initChart() {
    if (chartRef.value) {
      chartInstance = echarts.init(chartRef.value)
      chartInstance.setOption(option.value)
    }
  }

  return {
    getInstance: () => chartInstance,
  }
}

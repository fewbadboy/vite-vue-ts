import type { TemplateRef } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { debounce } from 'lodash'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'

export function useCharts(
  chartRef: TemplateRef<HTMLElement>,
  option: EChartsOption,
) {
  let chartInstance: ChartInstance = null

  const handleResize = debounce(() => {
    chartInstance?.resize()
  }, 500)

  onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {})

  function initChart() {
    if (chartRef.value) {
      chartInstance = echarts.init(chartRef.value)
      chartInstance.setOption(option)
    }
  }

  return {
    getInstance: () => chartInstance,
  }
}

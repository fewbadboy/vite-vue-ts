import { ref, watchEffect } from 'vue'

const x = ref(0)

watchEffect((onCleanup) => {
  const controller = new AbortController()
  // 请求完成前变量发生变化时，取消过时的请求
  console.log('x changed:', x.value)
  fetch('', { signal: controller.signal }).then(() => {
    // 回调逻辑
  })
  onCleanup(() => {
    // 清理逻辑
    controller.abort()
  })
})

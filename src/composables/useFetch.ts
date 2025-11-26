import { ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export function useFetch(url: MaybeRefOrGetter<string>) {
  const loading = ref(false)
  const data = ref<string>('')

  const controller = new AbortController()

  const fetchData = () => {
    loading.value = true

    // 请求完成前变量发生变化时，取消过时的请求
    fetch(toValue(url), { signal: controller.signal })
      .then((response) => response.json())
      .then(({ data }) => {
        data.value = data
      })
      .finally(() => {
        loading.value = false
      })
  }

  watchEffect((onCleanup) => {
    fetchData()

    onCleanup(() => {
      // 清理逻辑
      controller.abort()
    })
  })

  return {
    loading,
    data,
  }
}

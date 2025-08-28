<script setup lang="ts">
import { ref, onMounted, useAttrs, watchEffect } from 'vue'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

type SayType = {
  content: string
  count?: number
}

const { content } = defineProps<SayType>()
const msg = ref('Hello Vue 3')

const [model, modifiers] = defineModel<string>('title', {
  set(value) {
    console.log(modifiers)
    if (modifiers.upper) {
      return value.toUpperCase()
    }
    return value
  },
})

onMounted(() => {})

watchEffect(async () => {
  console.log('change:', content)
})
</script>

<template>
  <el-input v-model="model" placeholder="自动转换大写字母" />
  <div :class="attrs.class">{{ msg }}</div>
  <div>{{ content }} , count: {{ count ?? 0 }}</div>
</template>

<style scoped></style>

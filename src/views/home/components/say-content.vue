<script setup lang="ts">
import {
  ref,
  onMounted,
  useAttrs,
  watchEffect,
  reactive,
  type Ref,
  useTemplateRef,
} from 'vue'

type SayType = {
  content: string
  count?: number
}

type tempRefType = {
  li: number[]
  [index: string | number]: number[] | string[] | string | number
}

type tempReactType = {
  li: number[]
  name?: string
}

/**
 * 响应式 Props 解构
 * https://cn.vuejs.org/guide/components/props.html#reactive-props-destructure
 */
const { content, count } = defineProps<SayType>()

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const [model, modifiers] = defineModel<string>('title', {
  set(value) {
    console.log(modifiers)
    if (modifiers.upper) {
      return value.toUpperCase()
    }
    return value
  },
})

// 模板引用
const d = useTemplateRef('dRef')

const msg = ref<string>('Hello Vue 3')

/**
 * ref
 * 1. 使得它的值具有深层响应式
 * 2.
 *
 * shallowRef 只能响应第一层
 */
const arr = ref<tempRefType>({
  li: [1, 2, 3],
})

/**
 * reactive 局限：
 * 1. 只能用于对象类型
 * 2. 不能替换整个对象
 * 3. 解构失去响应式
 */
const re = reactive<tempReactType>({
  li: [1, 2, 3],
})

const { li } = arr.value

onMounted(() => {
  d.value?.focus()

  setTimeout(() => {
    msg.value = 'Hello Vue 3 + TypeScript + Vite + Element Plus'
    arr.value.li.splice(2, 1, 4)
    arr.value.name = 'dynamic name'
    re.name = 'reactive name'
  }, 2000)
})

watchEffect(async () => {
  // 3.5+ props 中的 俩解构变化时重新执行
  console.log(`组件内监听传递 prop: ${content} & ${count}`)
})
</script>

<template>
  <el-input v-model="model" placeholder="自动转换大写字母" />
  <div :class="attrs.class">{{ msg }}</div>
  <div ref="dRef">
    {{ content }} , double count in component: {{ count ?? 0 }}
  </div>
  <ul>
    <template v-for="item of li" :key="item">
      <li v-if="item < 5">{{ item }}</li>
    </template>
  </ul>
  <el-space>
    <el-tag v-if="arr.name" type="primary">{{ arr.name }}</el-tag>
    <el-tag v-if="re.name" type="primary">{{ re.name }}</el-tag>
  </el-space>
</template>

<style scoped></style>

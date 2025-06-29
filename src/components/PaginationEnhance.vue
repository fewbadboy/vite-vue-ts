<script setup lang="ts">
const currentPage = defineModel('currentPage')
const pageSize = defineModel('pageSize')

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits({
  change(_payload: { currentPage: number; pageSize: number }) {
    return true
  },
})

function handleChange(currentPage: number, pageSize: number) {
  emit('change', { currentPage, pageSize })
}
</script>
<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :background="true"
    :total="props.total"
    layout="total, ->,jumper, prev, pager, next, sizes"
    @change="handleChange"
  />
</template>

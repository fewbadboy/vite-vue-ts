<script setup lang="ts">
import { computed } from 'vue';
defineOptions({
  name: 'SvgIcon',
  inheritAttrs: false,
});

const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});

const iconInfo = computed(() => {
  const iconName = `#icon-${props.iconClass}`;
  const svgClass = props.className ? `svg-icon ${props.className}` : 'svg-icon';
  return { iconName, svgClass };
});
</script>

<template>
  <svg :class="iconInfo.svgClass">
    <use :xlink:href="iconInfo.iconName" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
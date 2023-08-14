<!-- @format -->

<template>
  <div class="app-container">
    <TimeRange :isClearable="false" ref="timeRange"></TimeRange>
    <button @click="getTime">获取时间</button>
  </div>
</template>

<script setup lang="ts">
  import TimeRange from "@/components/TimeRange/index.vue"
  import { getCurrentInstance, onMounted } from "vue"
  const { proxy } = getCurrentInstance()
  const getTime = () => {
    console.log(proxy.$refs.timeRange.getTimeRange())
  }

  onMounted(() => {})
</script>

<style lang="scss" scoped></style>

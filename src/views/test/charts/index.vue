<!-- @format -->

<template>
  <div class="app-container">
    <TimeRange :isClearable="false" ref="timeRange"></TimeRange>
    <button @click="getTime" v-copyText="'获取时间'" v-copyText:callback="copyTextSuccess">获取时间</button>
  </div>
</template>

<script setup>
  import TimeRange from "@/components/TimeRange/index.vue"
  import { getCurrentInstance, onMounted } from "vue"

  const { proxy } = getCurrentInstance()

  const getTime = () => {
    console.log(proxy.$refs.timeRange.getTimeRange())
  }

  function copyTextSuccess() {
    proxy.$modal.msgSuccess("复制成功")
  }

  onMounted(() => {})
</script>
<style lang="scss" scoped></style>

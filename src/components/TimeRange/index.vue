<!-- @format -->

<template>
  <el-date-picker
    v-model="value1"
    type="datetime"
    placeholder="开始时间"
    :shortcuts="shortcuts"
    :clearable="isClearable"
  />
  -
  <el-date-picker
    v-model="value2"
    type="datetime"
    placeholder="结束时间"
    :shortcuts="shortcuts"
    :clearable="isClearable"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue"
  import { formatDate } from "@/utils/yulinBase/util.js"
  const props = defineProps({
    isClearable: {
      type: Boolean,
      default: true
    },
    formate: {
      type: String,
      default: "yyyy-MM-dd HH:mm:ss"
    }
  })
  const value1 = ref("")
  const value2 = ref("")
  const shortcuts = [
    {
      text: "今天",
      value: new Date()
    },
    {
      text: "昨天",
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      }
    },
    {
      text: "一周前",
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      }
    }
  ]

  const getTimeRange = () => {
    return [formatDate(value1.value,props.formate), formatDate(value2.value, props.formate)]
  }

  defineExpose({ getTimeRange })
  onMounted(() => {
    console.log("时间组件mounted")
  })
</script>

<style lang="scss" scoped></style>

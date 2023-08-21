<!-- @format -->

<template>
  <div class="app-container">
    <TimeRange :isClearable="false" ref="timeRange"></TimeRange>
    <button @click="getTime" v-copyText="'获取时间'" v-copyText:callback="copyTextSuccess">获取时间</button>
  </div>

  <Editor></Editor>
  <JSXDemo1></JSXDemo1>

  <TreeSelect
    :options="obj"
    :objMap="{
      value: 'value',
      label: 'label',
      children: 'children'
    }"
    placeholder="请选择系统菜单"
  ></TreeSelect>
</template>

<script setup>
  import TimeRange from "@/components/TimeRange/index.vue"
  import { getCurrentInstance, onMounted } from "vue"
  import JSXDemo1 from "@/views/test/charts/demo.jsx"
  const { proxy } = getCurrentInstance()

  const obj = reactive([
    ({
      value: "a",
      label: "行政",
      children: [
        { value: "1", label: "行政1（红色）" },
        { value: "2", label: "行政1（红色）" },
        { value: "3", label: "行政1（橙色）" },
        { value: "4", label: "行政1（绿色）" }
      ]
    },
    {
      value: "b",
      label: "刑事",
      children: [
        { value: "5", label: "行政问问1（红色）" },
        { value: "6", label: "行政3232231（红色）" },
        { value: "7", label: "行232323政1（橙色）" },
        { value: "8", label: "行23232323政1（绿色）" }
      ]
    })
  ])

  // function filterAlerts(index) {
  //   if (index === 1) {
  //     for (let item of obj) {
  //       item.children = item.children.filter(item => item.label.indexOf("红色") > -1)
  //     }
  //   }
  //   return obj
  // }
  // console.log(obj)
  // console.log(filterAlerts(1))
  // console.log(obj)

  const getTime = () => {
    console.log(proxy.$refs.timeRange.getTimeRange())
  }
  function copyTextSuccess() {
    proxy.$modal.msgSuccess("复制成功")
  }
  onMounted(() => {})
</script>
<style lang="scss" scoped></style>

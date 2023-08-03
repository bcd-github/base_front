<!-- @format -->

<template>
  <div class="app-container">
    <div id="box" ref="box"></div>
    <div class="box" v-scroll="[100, 10]">
      <li v-for="item in 100" :key="item">{{ item }}</li>
    </div>
  </div>
</template>

<script setup>
  import * as echarts from "echarts"
  import { onUnmounted, onMounted } from "vue"
  import { ElMessage } from "element-plus"
  import { useOnline } from "../../../hooks/useOnline"
  import { useEcharts } from "../../../hooks/useEcharts"
  onMounted(() => {
    const main = document.getElementById("box")
    let myChart = echarts.init(main)
    let data = reactive([
      {
        name: "1",
        value: 10
      },
      {
        name: "2",
        value: 10
      },
      {
        name: "3",
        value: 10
      },
    ])
    const option = {
      color: ["#A0CE3A", "#31C5C0", "#1E9BD1", "#0F347B", "#585247", "#7F6AAD", "#009D85", "rgba(250,250,250,0.3)"],
      backgroundColor: "#000",
      title: {
        text: "总数",
        subtext: 7789,
        textStyle: {
          color: "#f2f2f2",
          fontSize: 20
          // align: 'center'
        },
        subtextStyle: {
          fontSize: 30,
          color: ["#ff9d19"]
        },
        x: "center",
        y: "center"
      },
      grid: {
        bottom: 150,
        left: 100,
        right: "10%"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        top: "middle",
        right: "5%",
        textStyle: {
          color: "#f2f2f2",
          fontSize: 25
        },
        icon: "roundRect",
        data: data
      },
      series: [
        // 主要展示层的
        {
          radius: ["30%", "61%"],
          center: ["50%", "50%"],
          type: "pie",
          label: {
            normal: {
              show: true,
              formatter: "{c}%",
              textStyle: {
                fontSize: 20
              },
              position: "outside"
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: true
            }
          },
          // name: "pie",
          data: data
        },
        // 边框的设置
        {
          radius: ["30%", "34%"],
          center: ["50%", "50%"],
          type: "pie",
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          animation: true,
          tooltip: {
            trigger: "item"
          },

          data: [
            {
              value: 1,
              itemStyle: {
                color: "rgba(250,250,250,0.3)"
              }
            }
          ]
        },
        {
          name: "外边框",
          type: "pie",
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          center: ["50%", "50%"],
          radius: ["65%", "65%"],
          label: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 9,
              name: "",
              itemStyle: {
                normal: {
                  borderWidth: 2,
                  borderColor: "#0b5263"
                }
              }
            }
          ]
        }
      ]
    }
    useEcharts(myChart, option, { openCarousel: true })
  })
</script>

<style lang="scss" scoped>
  #box {
    width: 500px;
    height: 300px;
  }

  .box {
    width: 200px;
    height: 400px;
    overflow: auto;
  }

  /* 修改滚动条的宽度和高度 */
  div::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* 修改滚动条的形状 */
  div::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #1c84c6;
  }

  /* 修改滚动条轨道的形状 */
  div::-webkit-scrollbar-track {
    border-radius: 5px;
  }
</style>

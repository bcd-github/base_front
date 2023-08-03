<!-- @format -->

<template>
  <div class="app-container">
    <div id="box" ref="box"></div>
    <div class="box" v-scroll="[100, 10]">
      <li v-for="item in 100" :key="item">{{ item }}</li>
    </div>
    <div
      style="width: 200px; height: 100px"
      v-waterMarker="{ text: 'Geeker Admin', textColor: 'rgba(180, 180, 180, 0.6)' }"
    ></div>

    <el-button type="primary" v-longpress="longpress"> 长按2秒触发事件 </el-button>
  </div>
</template>

<script setup>
  import * as echarts from "echarts"
  import { onUnmounted, onMounted } from "vue"
  import { ElMessage } from "element-plus";
  const longpress = () => {
    ElMessage.success("长按事件触发成功 🎉🎉🎉")
  }
  let myChart = null
  let timer = null
  onMounted(() => {
    var screenWidth = window.screen.width // 屏幕宽度
    var screenHeight = window.screen.height // 屏幕高度
    console.log(screenWidth, screenHeight)
    const main = document.getElementById("box")
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(main)
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
      {
        name: "4",
        value: 10
      },
      {
        name: "5",
        value: 10
      },
      {
        name: "6",
        value: 20
      },
      {
        name: "7",
        value: 30
      }
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

    // 绘制图表
    myChart.setOption(option)
    let currentIndex = -1

    const r = () => {
      timer = setInterval(function () {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        currentIndex = (currentIndex + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex
        })
      }, 2000)
    }

    r()

    myChart.on("click", function (params) {
      console.log(params)
    })

    myChart.on("mouseover", function (params) {
      clearInterval(timer)
    })

    myChart.on("mouseout", function (params) {
      r()
    })

    window.addEventListener("resize", function () {
      myChart.resize()
    })

    setTimeout(() => {
      myChart.setOption({
        series: {
          data: [
            {
              name: "21",
              value: 102
            },
            {
              name: "22",
              value: 1220
            },
            {
              name: "3",
              value: 10
            },
            {
              name: "4",
              value: 10
            },
            {
              name: "5",
              value: 10
            },
            {
              name: "6",
              value: 20
            },
            {
              name: "7",
              value: 30
            }
          ]
        }
      })
    }, 10000)
  })

  onUnmounted(() => {
    clearInterval(timer)
    myChart.dispose()
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

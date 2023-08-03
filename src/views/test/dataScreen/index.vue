<!-- @format -->

<template>
  <div class="h-full bg-sky-300 wrap">
    <div class="title text-center text-blue-500 text-2xl tracking-wide"><span>数据大屏</span></div>
    <div class="flex flex-row content">
      <div class="w-1/3 bg-red-400 h-full p-5 flex flex-col space-y-4">
        <div class="h-3/6 bg-slate-50" ref="leftTop"></div>
        <div class="h-3/6 bg-blue-400" ref="leftBottom"></div>
      </div>

      <div class="w-1/3 bg-blue-300 h-full p-5 flex flex-col space-y-4">
        <div class="h-full" ref="middle"></div>
      </div>

      <div class="w-1/3 bg-red-400 h-full p-5 flex flex-col space-y-4">
        <div class="h-3/6 bg-slate-50" ref="rightTop"></div>
        <div class="h-3/6 bg-blue-400" ref="rightBottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import * as echarts from "echarts"
  import { useEcharts } from "../../../hooks/useEcharts"
  import { onUnmounted, onMounted, getCurrentInstance } from "vue"
  const { proxy } = getCurrentInstance()
  onMounted(() => {
    const dom1 = proxy.$refs.leftTop
    const dom2 = proxy.$refs.leftBottom
    const dom3 = proxy.$refs.rightTop
    const dom4 = proxy.$refs.rightBottom
    const dom5 = proxy.$refs.middle

    const myChart = echarts.init(dom1)
    const myChart2 = echarts.init(dom2)
    const myChart3 = echarts.init(dom3)
    const myChart4 = echarts.init(dom4)
    const myChart5 = echarts.init(dom5)

    const data = reactive([
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
      }
    ])
    const option = {
      color: ["#A0CE3A", "#31C5C0", "#1E9BD1", "#0F347B", "#585247", "#7F6AAD", "#009D85", "rgba(250,250,250,0.3)"],
      backgroundColor: "transparent",
      title: {
        text: "总数",
        subtext: 7789,
        textStyle: {
          color: "#f2f2f2",
          fontSize: 20
          // align: 'center'
        },
        subtextStyle: {
          fontSize: 20,
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
          fontSize: 20
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
    const myColor = ["#eb2100", "#eb3600", "#d0570e", "#d0a00e", "#34da62", "#00e9db", "#00c0e9"]
    const option2 = {
      backgroundColor: "#0e2147",
      grid: {
        left: "11%",
        top: "12%",
        right: "0%",
        bottom: "8%",
        containLabel: true
      },
      xAxis: [
        {
          show: false
        }
      ],
      yAxis: [
        {
          axisTick: "none",
          axisLine: "none",
          offset: "27",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "16"
            }
          },
          data: [
            "南昌转运中心",
            "广州转运中心",
            "杭州转运中心",
            "宁夏转运中心",
            "兰州转运中心",
            "南宁转运中心",
            "长沙转运中心"
          ]
        },
        {
          axisTick: "none",
          axisLine: "none",
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: "16"
            }
          },
          data: ["7", "6", "5", "4", "3", "2", "1"]
        },
        {
          name: "分拨延误TOP 10",
          nameGap: "50",
          nameTextStyle: {
            color: "#ffffff",
            fontSize: "16"
          },
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)"
            }
          },
          data: []
        }
      ],
      series: [
        {
          name: "条",
          type: "bar",
          yAxisIndex: 0,
          data: [4, 13, 25, 29, 38, 44, 50],
          label: {
            normal: {
              show: true,
              position: "right",
              textStyle: {
                color: "#ffffff",
                fontSize: "16"
              }
            }
          },
          barWidth: 12,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length
                return myColor[params.dataIndex % num]
              }
            }
          },
          z: 2
        },
        {
          name: "白框",
          type: "bar",
          yAxisIndex: 1,
          barGap: "-100%",
          data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: "#0e2147",
              barBorderRadius: 5
            }
          },
          z: 1
        },
        {
          name: "外框",
          type: "bar",
          yAxisIndex: 2,
          barGap: "-100%",
          data: [100, 100, 100, 100, 100, 100, 100],
          barWidth: 24,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length
                return myColor[params.dataIndex % num]
              },
              barBorderRadius: 5
            }
          },
          z: 0
        },
        {
          name: "外圆",
          type: "scatter",
          hoverAnimation: false,
          data: [0, 0, 0, 0, 0, 0, 0],
          yAxisIndex: 2,
          symbolSize: 35,
          itemStyle: {
            normal: {
              color: function (params) {
                var num = myColor.length
                return myColor[params.dataIndex % num]
              },
              opacity: 1
            }
          },
          z: 2
        }
      ]
    }
    const data2 = [
      {
        name: "11",
        value: 56.65
      },
      {
        name: "22",
        value: 87.8
      },
      {
        name: "33",
        value: 81.3
      },
      {
        name: "44",
        value: 80
      }
    ]
    const xData = []
    const yData = []
    const min = 50 
    data2.map(function (a, b) {
      xData.push(a.name)
      if (a.value === 0) {
        yData.push(a.value + min)
      } else {
        yData.push(a.value)
      }
      // yData.push((Math.random(0,1) * 100).toFixed(0));
    })
    const option3 = {
      backgroundColor: "#111c4e",
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            opacity: 0
          }
        },
        formatter: function (prams) {
          if (prams[0].data === min) {
            return "合格率：0%"
          } else {
            return "合格率：" + prams[0].data + "%"
          }
        }
      },
      legend: {
        data: ["直接访问", "背景"],
        show: false
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "5%",
        top: "7%",
        height: "85%",
        containLabel: true,
        z: 22
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: xData,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "#0c3b71"
            }
          },
          axisLabel: {
            show: true,
            color: "rgb(170,170,170)",
            fontSize: 16
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          gridIndex: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          min: min,
          max: 100,
          axisLine: {
            lineStyle: {
              color: "#0c3b71"
            }
          },
          axisLabel: {
            color: "rgb(170,170,170)",
            formatter: "{value} %"
          }
        },
        {
          type: "value",
          gridIndex: 0,
          min: min,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
            }
          }
        }
      ],
      series: [
        {
          name: "合格率",
          type: "bar",
          barWidth: "30%",
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: [30, 30, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00feff"
                },
                {
                  offset: 0.5,
                  color: "#027eff"
                },
                {
                  offset: 1,
                  color: "#0286ff"
                }
              ])
            }
          },
          data: yData,
          zlevel: 11
        },
        {
          name: "背景",
          type: "bar",
          barWidth: "50%",
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: "-135%",
          data: [100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: "rgba(255,255,255,0.1)"
            }
          },
          zlevel: 9
        }
      ]
    }
    const option4 = {
      backgroundColor: "#00264d",
      graphic: [
        /*最外层圆线*/
        {
          type: "circle",
          left: "center",
          top: "middle",
          shape: {
            r: 380
          },
          style: {
            fill: "#113048"
          }
        },
        /*最底层圆*/
        {
          type: "ring",
          left: "center",
          top: "middle",
          shape: {
            r: 390,
            r0: 392
          },
          style: {
            fill: "#113048"
          }
        }
      ],
      series: [
        /*仪表盘图，做中间刻度线*/
        {
          type: "gauge",
          name: "业务指标",
          radius: "60%",
          startAngle: "0",
          endAngle: "-359.99",
          splitNumber: "100",
          pointer: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{ value: 95, name: "完成率" }],
          axisLine: {
            lineStyle: {
              color: [
                [
                  1,
                  new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    {
                      offset: 0,
                      color: "rgba(4, 234,255, 1)"
                    },
                    {
                      offset: 0.5,
                      color: "rgba(74, 87,254, 1)"
                    },
                    {
                      offset: 1,
                      color: "rgba(59, 119,254, 1)"
                    }
                  ])
                ]
              ],
              width: 20,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            length: 20,
            lineStyle: {
              color: "rgba(255,255,255,1)",
              width: 2,
              type: "solid"
            }
          },
          axisLabel: {
            show: false
          }
        },
        /*内心原型图，展示整体数据概览*/
        {
          name: "pie",
          type: "pie",
          clockWise: true,
          startAngle: -270,
          radius: ["48%", "50%"],
          hoverAnimation: false,
          center: ["50%", "50%"],
          data: [
            {
              value: 5,
              label: {
                normal: {
                  formatter: "{d}%",
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: "35",
                    fontWeight: "normal",
                    color: "#fff"
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: "#f74369",
                  shadowColor: "#f74369",
                  shadowBlur: 10
                }
              }
            },
            {
              value: 5,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: "rgba(247,67,105,0)", // 未完成的圆环的颜色
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  color: "rgba(44,59,70,1)" // 未完成的圆环的颜色
                }
              }
            }
          ]
        },
        /*外层环形图，展示详细占比*/
        {
          name: "pie",
          type: "pie",
          clockWise: true,
          startAngle: -270,
          radius: ["60%", "65%"],
          hoverAnimation: false,
          center: ["50%", "50%"],
          data: [
            {
              value: 5,
              name: "1",
              itemStyle: {
                normal: {
                  color: "#e7b507"
                }
              }
            },
            {
              value: 25,
              name: "1",
              itemStyle: {
                normal: {
                  color: "#009eff"
                }
              }
            },
            {
              value: 15,
              name: "1",
              itemStyle: {
                normal: {
                  color: "#f74369"
                }
              }
            }
          ],
          itemStyle: {
            normal: {
              borderWidth: 3,
              borderColor: "#00264d"
            }
          }
        }
      ]
    }
    const option5 = {
      title: {
        text: "北方明珠城市能力对比",
        subtext: "模拟数据",
        x: "20",
        y: "20",
        textStyle: {
          color: "#ffffff",
          fontFamily: "Microsoft YaHei",
          fontSize: "16"
        }
      },
      color: ["#46B9B2", "#D372B2"],
      tooltip: {
        triggerOn: "mousemove|click"
      },
      grid: {
        top: "23%"
      },
      backgroundColor: "#17316a",
      legend: {
        show: true,
        padding: [3, 5],
        right: "20",
        y: "20",
        bottom: 30,
        center: 0,
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 21,
        orient: "horizontal",
        data: ["大连", "青岛"],
        textStyle: {
          fontSize: 14,
          color: "#fff"
        }
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#ffffff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        radius: "80%",
        center: ["50%", "53%"],
        indicator: [
          {
            name: "基建指数",
            max: 100
          },
          {
            name: "成长指数",
            max: 100
          },
          {
            name: "发展指数",
            max: 100
          },
          {
            name: "创新指数",
            max: 100
          },
          {
            name: "招商引资指数",
            max: 100
          },
          {
            name: "就业指数",
            max: 100
          }
        ]
      },
      series: [
        {
          name: "大连" + "vs" + "青岛",
          type: "radar",
          data: [
            {
              value: [30, 50, 40, 20, 80, 90],
              name: "大连",
              areaStyle: {
                normal: {
                  color: "#46B9B2"
                }
              }
            },
            {
              value: [50, 70, 90, 50, 64, 74],
              name: "青岛",
              areaStyle: {
                normal: {
                  color: "#D372B2"
                }
              }
            }
          ]
        }
      ]
    }

    useEcharts(myChart, option, { openCarousel: true, openTooltip: true })
    useEcharts(myChart2, option2, { openCarousel: true, openTooltip: true })
    useEcharts(myChart3, option3, { openCarousel: true, openTooltip: true })
    useEcharts(myChart4, option4, { openCarousel: true, openTooltip: true })
    useEcharts(myChart5, option5, { openCarousel: true, openTooltip: true })
  })
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    min-width: 1152px;
    min-height: 565px;
  }
  .title {
    height: 5%;
  }
  .content {
    height: 95%;
  }
</style>

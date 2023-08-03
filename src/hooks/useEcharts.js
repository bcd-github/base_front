import * as echarts from "echarts";
import { onUnmounted } from "vue";
/**
 * 
 * @param {*} myChart echarts实例
 * @param {*} options options配置项
 * @param {*} config openCarousel 是否开启轮播 默认false
 */

export function useEcharts(myChart, options, config = { openCarousel: false }) {

    myChart.setOption(options);
    
    window.addEventListener('resize', () => {
        myChart.resize();
    });

    let timer

    for (let key in config) {
        console.log(key, config[key])
        if (key === 'openCarousel' && config[key] === true) {
            startCarousel()
        }
    }

    function startCarousel() {
        let currentIndex = -1
        function carousel() {
            timer = setInterval(function () {
                let dataLength = options.series[0].data.length
                // 取消之前高亮的图形
                myChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: currentIndex
                })
                currentIndex = (currentIndex + 1) % dataLength
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
            }, 1000)
        }
        myChart.on("click", function (params) {
            console.log(params)
        })
        myChart.on("mouseover", function (params) {
            clearInterval(timer)
        })
        myChart.on("mouseout", function (params) {
            carousel()
        })

        carousel()
    }

    onUnmounted(() => {
        myChart.dispose()
        clearInterval(timer)
    })
}






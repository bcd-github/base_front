import { onUnmounted, ref } from "vue";
import { formatDate } from '../utils/yulinBase/util.js'
/**
 * 
 * @returns 
 */
export const useTime = () => {

  const nowTime = ref(formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  let clock = ref('')
  let timer = null
  let started = false
  /**
   * 
   * @returns 
   */
  function getClock() {
    let now = new Date()
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hours = now.getHours().toString();
    let minutes = now.getMinutes().toString();
    let seconds = now.getSeconds().toString();

    function padZero(num) {
      return num < 10 ? "0" + num : num
    }

    month = padZero(month)
    day = padZero(day)

    // 将时、分、秒转换为两位数格式
    hours = ("0" + hours).slice(-2);
    minutes = ("0" + minutes).slice(-2);
    seconds = ("0" + seconds).slice(-2);
    clock.value = year + '-' + month + '-' + day + ' ' + hours + ":" + minutes + ":" + seconds
    
    if (!started) {
      timer = setInterval(() => {
        getClock()
        started = true
      }, 1000)
    }
    return clock
  }

  /**
   * 
   * @param {*} format 'yyyy-MM-dd HH:mm:ss'
   * @param {*} days 日期范围 选择前几天
   * @returns 
   */
  function getTimeRange(format, days) {
    let timeRange = ref([])
    // 获取当前时间的时间戳（毫秒）
    let currentTimeStamp = Date.now();
    // 计算当前时间前七天的时间戳
    let sevenDaysAgoTimeStamp = currentTimeStamp - (days * 24 * 60 * 60 * 1000);
    // 创建新的Date对象并设置为当前时间前七天的时间
    let sevenDaysAgo = new Date(sevenDaysAgoTimeStamp);
    timeRange.value = [formatDate(new Date(), format), formatDate(sevenDaysAgo, format)]
    return timeRange
  }

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }

  })
  
  return { nowTime, getClock, getTimeRange }
};

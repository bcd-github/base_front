/** @format */

import { reactive, computed, toRefs } from "vue"
import { formatDate } from "@/utils/yulinBase/util.js"

/**
 *
 * @param {*} query 请求api
 * @param {*} initParam  初始化参数
 * @param {*} isPageAble 是否开启分页
 * @returns
 */

export const useTable = (query, initParam, isPageAble) => {
  const state = reactive({
    // 表格数据
    tableData: [],
    loading: false,
    // 分页数据
    pageAble: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {}
  })

  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageAble.pageNum,
        pageSize: state.pageAble.pageSize
      }
    },
    set: newVal => {
      console.log("我是分页更新之后的值", newVal)
    }
  })

  const getTableList = async () => {
    console.log(122121)
    if (!query) return
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, initParam, isPageAble ? pageParam.value : {}, state.searchParam)

      state.loading = true
      let res = await query({ ...state.totalParam })
      state.loading = false

      if (isPageAble) {
        state.pageAble.total = res.total
      }
      // 此处是针对ruoyi框架做的处理
      if (Object.keys(res).includes("data")) {
        state.tableData = res.data
      } else if (Object.keys(res).includes("rows")) {
        state.tableData = res.rows
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updatePageable = pageAble => {
    Object.assign(state.pageAble, pageAble)
  }

  const search = () => {
    state.pageAble.pageNum = 1
    updatedTotalParam()
    getTableList()
  }

  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam = {}
    // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
    for (let key in state.searchParam) {
      // * 某些情况下参数为 false/0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
      if (key === "timeRange" && state.searchParam[key] != null) {
        nowSearchParam["startTime"] = formatDate(state.searchParam[key][0], "yyyy-MM-dd HH:mm:ss")
        nowSearchParam["endTime"] = formatDate(state.searchParam[key][1], "yyyy-MM-dd HH:mm:ss")
      }
    }
    // delete nowSearchParam.timeRange;
    // 不可以删除timeRange属性，因为这样会导致时间选择器的值丢失
    // delete state.searchParam.timeRange
    Object.assign(state.totalParam, nowSearchParam, isPageAble ? pageParam.value : {})
    console.log("我是总参数", state.totalParam)
  }

  const reset = () => {
    state.pageAble.pageNum = 1
    state.searchParam = {}
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(state.searchInitParam).forEach(key => {
      state.searchParam[key] = state.searchInitParam[key]
    })
    updatedTotalParam()
    getTableList()
  }

  const handleSizeChange = val => {
    state.pageAble.pageNum = 1
    state.pageAble.pageSize = val
    getTableList()
  }

  const handleCurrentChange = val => {
    state.pageAble.pageNum = val
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam
  }
}

<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px" v-if="showSearch">
      <el-form-item label="角色名称" prop="name">
        <el-input
            v-model="queryParams.name"
            placeholder="请输入角色名称"
            clearable
            style="width: 240px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
            v-model="queryParams.age"
            placeholder="请输入年龄"
            clearable
            style="width: 240px"
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间范围" prop="timeRange">
        <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="height: 50px;display: flex; justify-content: space-around">
      <el-button @click="openAddUserDialog" type="success" plain>新增</el-button>
      <el-button @click="deleteUser" :disabled="ids.length === 0" type="info" plain>删除</el-button>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getTableData"></right-toolbar>
    </div>

    <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="height" label="身高"/>
      <el-table-column prop="weight" label="体重"/>
      <el-table-column prop="createTime" label="创建日期"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="openEditUserDialog(scope.row)" type="primary" :icon="Edit" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
        v-show="totalData > 0"
        :total="totalData"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getTableData"
    />

    <el-dialog v-model="visible" :title="isEdit ? '编辑' :'新增'">
      <el-form ref="form1" :model="userForm">
        <el-form-item label="姓名">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="userForm.age"></el-input>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="userForm.height"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="userForm.weight"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" v-if="!isEdit">
          <el-date-picker v-model="userForm.createTime" format="YYYY-MM-DD HH:mm:ss" type="datetime"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-button @click="submitForm">提交</el-button>
    </el-dialog>
  </div>
</template>

<script setup name="userManage">
import {getCurrentInstance, reactive, ref, toRefs,} from 'vue'
import {getList, addUser, delUser, editUser} from "@/api/tt";
import {Edit} from '@element-plus/icons-vue'
import {formatDate} from "@/utils/yulinBase/util.js";

const {proxy} = getCurrentInstance();
proxy.print(getCurrentInstance())
const userList = ref([])
let userForm = reactive({
  createTime: new Date()
})
const visible = ref(false)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: '',
  age: '',
  startTime: '',
  endTime: '',
  timeRange: []
})
const totalData = ref(0);
const isEdit = ref(false)
const showSearch = ref(true)
let {timeRange} = toRefs(queryParams)
const ids = ref([])

async function getTableData() {
  const {rows, total} = await getList(queryParams)
  userList.value = rows
  totalData.value = total
}

async function handleQuery() {
  if (timeRange.value.length !== 0) {
    queryParams.startTime = formatDate(timeRange.value[0], 'yyyy-MM-dd HH:mm:ss')
    queryParams.endTime = formatDate(timeRange.value[1], 'yyyy-MM-dd HH:mm:ss')
  } else {
    queryParams.startTime = ''
    queryParams.endTime = ''
  }
  await getTableData()
}

function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery()
}

function reset() {
  Object.keys(userForm).forEach((key) => {
    userForm[key] = undefined
    if (key === 'createTime') userForm[key] = new Date()
  })
}

function openAddUserDialog() {
  reset()
  isEdit.value = false
  visible.value = true
}

async function submitForm() {
  if (isEdit.value) {
    await editUser(userForm)
    proxy.$modal.msgSuccess('修改成功');
    isEdit.value = false
    visible.value = false
    await getTableData()
    return
  }
  userForm.createTime = formatDate(userForm.createTime, 'yyyy-MM-dd HH:mm:ss')
  const {msg} = await addUser(userForm)
  proxy.$modal.msgSuccess(msg);
  visible.value = false
  await getTableData()
}

async function deleteUser() {
  const {msg} = await delUser(ids.value)
  proxy.$modal.msgSuccess(msg);
  await getTableData()
}

function openEditUserDialog(row) {
  visible.value = true
  isEdit.value = true
  console.log(row)
  userForm = reactive(JSON.parse(JSON.stringify(row)))
}


function handleSelectionChange(val) {
  ids.value = []
  val.forEach((item) => {
    ids.value.push(item.id)
  })
}

getTableData()



</script>

<style lang="scss" scoped>

</style>

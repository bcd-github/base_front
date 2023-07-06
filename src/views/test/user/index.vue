<template>
  <div class="app-container">
    <el-button @click="openAddUserDialog">新增</el-button>
    <el-button @click="deleteUser" :disabled="ids.length === 0">删除</el-button>
    <el-table :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="姓名" width="180"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="height" label="身高"/>
      <el-table-column prop="weight" label="体重"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="openEditUserDialog(scope.row)">编辑</el-button>
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

    <el-dialog v-model="visible">
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
      </el-form>
      <el-button @click="submitForm">提交</el-button>
    </el-dialog>
  </div>
</template>

<script setup name="userManage">
import {getCurrentInstance, isReactive, reactive, ref, toRaw, toRefs,} from 'vue'
import {getList, addUser, delUser, editUser} from "@/api/tt";


const {proxy} = getCurrentInstance();
const userList = ref([])
let userForm = reactive({})
const visible = ref(false)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 5
})
const totalData = ref(0);
const isEdit = ref(false)


async function getTableData() {
  const {rows, total} = await getList(queryParams)
  userList.value = rows
  totalData.value = total
}

function reset() {
  Object.keys(userForm).forEach((key) => {
    userForm[key] = undefined
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
  userForm = reactive(JSON.parse(JSON.stringify(row)))
}

const ids = ref([])

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

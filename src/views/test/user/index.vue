<template>
    <div class="app-container">
        <el-button @click="openAddUserDialog">新增</el-button>
        <el-table :data="userList" style="width: 100%">
            <el-table-column prop="id" label="id" width="180"/>
            <el-table-column prop="name" label="name" width="180"/>
            <el-table-column prop="age" label="age"/>
            <el-table-column prop="height" label="height"/>
            <el-table-column prop="weight" label="weight"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="openEditUserDialog(scope.row)">编辑</el-button>
                    <el-button @click="deleteUser(scope.row)">删除</el-button>
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
            <el-form ref="form" :model="userForm">
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
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import {getList, addUser, delUser, editUser} from "@/api/tt";

const {proxy} = getCurrentInstance();
const userList = ref([])
const userForm = reactive({
    name: '',
    age: '',
    height: '',
    weight: ''
})
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

function openAddUserDialog() {
    isEdit.value = false
    userForm.name = null
    userForm.age = null
    userForm.height = null
    userForm.weight = null
    userForm.id = null
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

async function deleteUser(row) {
    const {msg} = await delUser([row.id])
    proxy.$modal.msgSuccess(msg);
    await getTableData()
}

function openEditUserDialog(row) {
    visible.value = true
    isEdit.value = true
    userForm.name = row.name
    userForm.age = row.age
    userForm.height = row.height
    userForm.weight = row.weight
    userForm.id = row.id
}

getTableData()

</script>

<style lang="scss" scoped>

</style>

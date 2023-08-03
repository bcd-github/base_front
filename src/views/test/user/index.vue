<!-- @format -->

<template>
  <div class="app-container">
    <el-form :model="searchParam" ref="queryRef" :inline="true" label-width="68px" v-if="showSearch">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="searchParam.name"
          placeholder="请输入角色名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model="searchParam.age"
          placeholder="请输入年龄"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间范围" prop="timeRange">
        <el-date-picker
          v-model="searchParam.timeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="search">搜索</el-button>
        <el-button icon="Refresh" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="height: 50px; display: flex; justify-content: space-around">
      <el-button @click="openAddUserDialog" type="success" plain>新增</el-button>
      <el-button @click="deleteUser" type="info" plain>删除</el-button>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="search"></right-toolbar>
    </div>

    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="height" label="身高" />
      <el-table-column prop="weight" label="体重" />
      <el-table-column prop="createTime" label="创建日期" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="openEditUserDialog(scope.row)" type="primary" :icon="Edit" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="pageAble.total > 0"
      :total="pageAble.total"
      v-model:page="pageAble.pageNum"
      v-model:limit="pageAble.pageSize"
      @pagination="getTableList"
    />
  </div>
</template>

<script setup name="userManage">
  import { getCurrentInstance, reactive, ref, toRefs } from "vue"
  import { getList, addUser, delUser, editUser } from "@/api/test"
  import { Edit } from "@element-plus/icons-vue"
  import { useTable } from "../../../hooks/useTable"

  const showSearch = ref(true)

  const { tableData, getTableList, pageAble, searchParam, reset, search, loading } = useTable(getList, {}, true)

  getTableList()

  async function getTableData() {}

  async function handleQuery() {}

  function resetQuery() {}

  function openAddUserDialog() {}

  async function submitForm() {}

  async function deleteUser() {}

  function openEditUserDialog(row) {}

  function handleSelectionChange(val) {}
</script>

<style lang="scss" scoped></style>

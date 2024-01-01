<template>
  <div class="app-container">
    <el-button :icon="Upload" @click="openUploadDialog">上传</el-button>
    <el-button @click="exportFile">导出</el-button>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="fileName" label="文件名" :formatter="fileNameFormatter"/>
      <el-table-column prop="createdAt" label="创建时间" :formatter="format"/>
      <el-table-column prop="owner" label="上传人"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="downloadFile(scope.row)" type="primary" :icon="Download" circle></el-button>
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

    <fileUpload ref="file" @update="getTableList"></fileUpload>
  </div>
</template>

<script setup>
import fileUpload from '@/views/test/fileManagement/components/fileUpload.vue'
import {getCurrentInstance} from "vue";
import {Download, Edit, Upload,} from "@element-plus/icons-vue";
import {addFile, exportFiles, getFile, getList} from "@/api/test";
import {useTable} from "@/hooks/useTable";

const {proxy} = getCurrentInstance()
const {tableData, getTableList, pageAble, searchParam, reset, search, loading} = useTable(getFile, {}, true)

getTableList()


function openUploadDialog() {
  proxy.$refs.file.open()
}

function downloadFile(row) {
  window.open(import.meta.env.VITE_APP_BASE_API + row.filePath)
}

function handleSelectionChange() {

}

function fileNameFormatter(row, column, cellValue, index) {
  let fileName = cellValue.match(/\/([^/]+)$/)[1];
  return fileName
}

function format(row, column, cellValue, index) {
  let newVal = cellValue.replace("T", " ");
  return newVal
}

function exportFile() {
  proxy.download(
      "/file/export",
      {},
      `config_${new Date().getTime()}.xlsx`
  )
}


</script>

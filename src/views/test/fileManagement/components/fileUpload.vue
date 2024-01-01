<template>
  <el-dialog
      v-model="dialogVisible">
    <FileUpload :limit="1" :file-size="5" :is-show-tip="true" ref="upload"></FileUpload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="upload">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import FileUpload from '@/components/FileUpload/index.vue'
import {getCurrentInstance} from "vue";
import {addFile} from "@/api/test";
import Cookies from "js-cookie";

const dialogVisible = ref(false)
const {proxy} = getCurrentInstance()
const emit = defineEmits(["update"])

function open() {
  dialogVisible.value = true
}

function close() {
  dialogVisible.value = false
}

async function upload() {
  console.log(proxy.$refs.upload.fileList)
  if (proxy.$refs.upload.fileList.length == 0) {
    proxy.$modal.msgWarning('尚未添加文件')
    return
  }
  await addFile({
    fileName: proxy.$refs.upload.fileList[0].name,
    filePath: proxy.$refs.upload.fileList[0].url,
    owner: Cookies.get('username'),
  })
  dialogVisible.value = false
  proxy.$refs.upload.fileList = []
  emit('update')
}

defineExpose({
  open, close
})

</script>

<style lang="scss" scoped>

</style>

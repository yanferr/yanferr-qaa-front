<template>
  <el-row style="color:#5c5c63;font-size:medium;line-height: 50px;">
    <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>

    <el-col :xs="24" :sm="24" :md="22" :lg="16" :xl="16">
      <el-input @input="handleChange" v-model="data.task" :rows="50" type="textarea" placeholder="Please input"
        style="margin-top: 20px;" />

    </el-col>


    <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>
  </el-row>
</template>

  
<script lang="ts" setup>
import { ref, unref, reactive, onUnmounted, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { More, Delete, InfoFilled } from '@element-plus/icons-vue'
import { componentSizeMap, ElMessage } from 'element-plus'

let data = reactive({
  task: '',
  changeTime: new Date(),
  hasChanged: false,
})
function handleChange() {
  data.hasChanged = true;
  data.changeTime = new Date();
}

// 定时任务:每60s检测输入框是否发生了变化
const intervalId = setInterval(() => {
  if (data.hasChanged) {
    // 执行自动保存
    console.log("内容发生变化,执行自动保存...");
    data.hasChanged = false;
  }

}, 30000);

function autoSave(){
  
}

onUnmounted(() => {
  clearInterval(intervalId);
  
});
</script>

<style scoped></style>


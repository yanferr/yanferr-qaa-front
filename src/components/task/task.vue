<template>
  <el-row style="color:#5c5c63;font-size:medium;line-height: 50px;">
    <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>

    <el-col :xs="24" :sm="24" :md="22" :lg="16" :xl="16">
      <el-input @input="handleChange" @keydown.shift.alt="handleLineMove" ref="text" v-model="data.task" :rows="50"
        id="editor_area" type="textarea" placeholder="Please input" @blur="blurEvent" style="margin-top: 20px;" />

    </el-col>


    <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>
  </el-row>
</template>

<script lang="ts" setup>

import { ref, defineComponent, unref, computed, reactive, onUnmounted, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { More, Delete, InfoFilled } from '@element-plus/icons-vue'
import { componentSizeMap, ElMessage } from 'element-plus'

let data = reactive({
  task: '',
  taskId: null,
  changeTime: new Date(),
  hasChanged: false,
})

// 失去焦点重新计算序号
function blurEvent(){
  console.log("start")
  var lines = data.task.split('\n');
  for(var i=0;i<lines.length;i++){
    if(lines[i].length===0 || lines[i].trim() === ""){
      continue;
    }
    if(lines[i].startsWith(">>>>>>>")){
      break;
    }
    var preStr = lines[i].substring(0,lines[i].indexOf("."));
    console.log(preStr);
    if(!/^\d+$/.test(preStr)){
      lines[i] = i+1+"."+lines[i];
    }else if(parseInt(preStr)!==(i+1)){
      lines[i] = i+1+lines[i].substring(lines[i].indexOf("."));
    }
  }
  
  data.task = lines.join('\n');
}

function handleChange() {
  data.hasChanged = true;
  data.changeTime = new Date();
}

// 定时任务:每60s检测输入框是否发生了变化
const intervalId = setInterval(() => {

  if (data.hasChanged) {
    // 执行自动保存
    console.log("内容发生变化,执行自动保存...");
    autoSave();
    data.hasChanged = false;
  }

}, 10000);

function loadRecentTasks() {
  service.get('qa/task/recent')
    .then(res => {
      if (res && res.data.code === 0) {
        // labelQuesNums = res.data.data;
        console.log(res.data.tasks)
        data.task = res.data.tasks.task;
        data.taskId = res.data.tasks.taskId;
      } else {
        ElMessage.error('数据加载失败')
      }
    })
}
function handleLineMove(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') {
    moveLine(1, event);
  } else if (event.key === 'ArrowUp') {
    moveLine(-1, event);
  }
};



function moveLine(direction, event) {
  const lines = data.task.split('\n');
  const caret = data.task.substring(0, event.target.selectionStart).split('\n').length - 1;
  if (direction === -1 && caret > 0) {
    [lines[caret - 1], lines[caret]] = [lines[caret], lines[caret - 1]];
  } else if (direction === 1 && caret < lines.length - 1) {
    [lines[caret], lines[caret + 1]] = [lines[caret + 1], lines[caret]];
  }
  data.task = lines.join('\n');
}

function autoSave() {
  service.post('qa/task/save', {
    taskId: data.taskId,
    task: data.task
  }).then(res => { // 必须要用箭头函数
    if (res && res.data.code === 0) {
      data.taskId = res.data.taskId;
    } else {
      ElMessage.error('自动保存失败！请检查网络连接')
    }
  }).catch(function (error) {
    ElMessage.error('自动保存失败！请检查网络连接')
  });
 
}

computed(() => {


})

onMounted(() => {
  // bus.emit('a', a)
  loadRecentTasks();

})


onUnmounted(() => {
  clearInterval(intervalId);
  autoSave();
});
</script>

<style scoped></style>


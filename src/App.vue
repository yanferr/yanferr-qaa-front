<script setup>
import QAAHeader from './components/qaa/qaaHeader.vue'
import QuesMain from './components/qaa/quesMain.vue'
</script>

<template>
  <el-container>
    <QAAHeader />

    <el-main style="--el-main-padding:0px;width: 200%;">
      <QuesMain/>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}</style>

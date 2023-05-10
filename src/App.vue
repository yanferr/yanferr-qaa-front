<script setup>
import QAAHeader from './components/qaa/qaaHeader.vue'
import QuesTable from './components/qaa/quesTable.vue'
import QaaFooter from './components/qaa/qaaFooter.vue'
</script>

<template>
  <el-container>

    <QAAHeader />

    <el-main style="--el-main-padding:0px;width: 200%;">
      <el-row class="row-bg table-div" justify="center">
        <el-col :span="4"></el-col>
        <el-col :span="12">
          <QuesTable />
        </el-col>
        <el-col :span="4">
        
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-main>
    
    <QaaFooter/>
    
  </el-container>
</template>

<style scoped>
.table-div {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
}
</style>

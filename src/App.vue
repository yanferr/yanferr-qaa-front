<script setup>
import QAAHeader from './components/qaa/qaaHeader.vue'
import QuesTable from './components/qaa/quesTable.vue'
import QaaFooter from './components/qaa/qaaFooter.vue'
</script>

<template>
  <QAAHeader />

  <el-row class="row-bg " justify="center">
    <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>
    <el-col :xs="21" :sm="21" :md="20" :lg="12" :xl="12">
      <QuesTable />
    </el-col>
    <el-col :xs="3" :sm="3" :md="2" :lg="4" :xl="4">

    </el-col>
    <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>
  </el-row>

  <QaaFooter />
</template>

<style scoped>
/* .table-div {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
} */
</style>

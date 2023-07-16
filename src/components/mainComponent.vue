<script setup>
import CurrentProcess from './qaa/currentProcess.vue'
import QuesTable from './qaa/quesTable.vue'
</script>
<template>
      <el-row class="row-bg " justify="center">
    <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4"></el-col>
    <el-col :xs="24" :sm="20" :md="20" :lg="16" :xl="12">
      <QuesTable />
    </el-col>
    <el-col :xs="0" :sm="0" :md="0" :lg="0" :xl="4">
      <CurrentProcess/>
    </el-col>
    <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4">
    </el-col>
  </el-row>
</template>
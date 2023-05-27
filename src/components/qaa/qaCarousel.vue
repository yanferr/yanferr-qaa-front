<template>
    <el-carousel :interval="4000" type="card" height="250px" :autoplay="false" style="margin: 40px 0 40px 0;" indicator-position="none" arrow="never" >
     
      <el-carousel-item  >
        <img src="../../assets/cl02.png" style="width:100%;height:100%"/>
      </el-carousel-item>
      <el-carousel-item  >
        <img src="../../assets/cl07.png" style="width:100%;height:100%"/>
      </el-carousel-item>
      <el-carousel-item  >
        <img src="../../assets/cl03.png" style="width:100%;height:100%"/>
      </el-carousel-item>
    </el-carousel>
  </template>
  
  <script lang="ts" setup>
  import { ref, unref, reactive, onMounted } from 'vue'
  import { service, bus } from "../../utils"
  import { More, Delete, InfoFilled } from '@element-plus/icons-vue'
  import { componentSizeMap, ElMessage } from 'element-plus'


  </script>

  <style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  </style>
  
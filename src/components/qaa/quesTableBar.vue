<template>
    <el-select v-model="value" class="m-2" placeholder="难度" style="width:75px;margin: 10px 0 10px 0">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="value" class="m-2" placeholder="时间" style="margin: 10px 0 10px 10px;width:75px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="value" class="m-2" placeholder="标签" style="margin: 10px 0 10px 10px; width:75px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input style="margin: 10px 0 10px 10px; width:200px" v-model="input2" class="w-50 m-2" placeholder="搜索题目内容或关键词"
        :prefix-icon="Search" />
    <el-button style="margin: 10px 0 10px 10px;" :icon="Plus" round>新增</el-button>
    <div  style="float:right;margin:10px 0 10px 0; line-height: 35px;font-size:medium;">
        <img class="cell-hover" src="../../assets/pic/suiji.png"
            style="border-radius: 50%;width:20px;height: 20px;transform:translate(-20%,20%);" />
        <span class="cell-hover" style="text-align: center;display: inline;">随机一问</span>
    </div>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service } from "../../request/index"
import { Search, Plus } from '@element-plus/icons-vue'

</script>
<style scoped>
.cell-hover:hover {
    cursor: pointer;
}

</style>
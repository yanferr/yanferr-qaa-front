<script setup>
import QuesTable from './quesTable.vue'
</script>
<template>
    <div class="table-div">

        <el-row class="row-bg" justify="center">
            <el-col :span="4"></el-col>
            <el-col :span="12">
                <QuesTable/>
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
        </el-row>

    </div>
</template>
  
<script lang="ts" setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
</script>
<style scoped>
.table-div {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
}
</style>
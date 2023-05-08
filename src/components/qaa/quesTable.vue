
<template>
    <el-table :data="data.tableData" :row-key="quesId" stripe max-height="400px">
        <el-table-column sortable  label="进度" width="80">
            <template #default="scope">
                <img v-if="scope.row.highLight != -1" :src="scope.row.imgPath" alt=""
                    style="width: 23px;height: 21px;transform:translate(20%,20%);">
            </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip="true" prop="ques" label="问题" width="300" />
        <el-table-column prop="createTime" label="答案" />
        <el-table-column show-overflow-tooltip="true" prop="source" label="源" width="200" />
        <el-table-column show-overflow-tooltip="true" prop="source" label="通过率" width="180" />
    </el-table>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { service } from "../../request/index"

let data = reactive({
    tableData: [],
})


function loadData() {
    service.get("qa/ques/list").then((res) => {
        // tableData.value=res;
        // console.log(res)
        console.log(res.data.page.list);
        data.tableData = res.data.page.list;
        getImgPath();
    }).catch(e => { })
}

function getImgPath() {
    for (var i = 0; i < data.tableData.length; i++) {
        data.tableData[i].imgPath = `./src/assets/pic/lv/lv${data.tableData[i].memoryLevel}.png`;
    }
}


onMounted(() => {
    loadData();
})

</script>
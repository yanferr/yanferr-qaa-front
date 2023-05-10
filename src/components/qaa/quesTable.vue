
<template>
    <el-table :data="data.tableData" :row-key="quesId" stripe max-height="400px">
        <el-table-column sortable label="进度" width="80">
            <template #default="scope">
                <img v-if="scope.row.highLight != -1" :src="scope.row.imgPath" alt=""
                    style="width: 23px;height: 21px;transform:translate(20%,20%);">
            </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" label="问题" prop="ques" width="300">
            <template #default="scope">
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="cell-hover">
                    {{ scope.row.ques }}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="溯源" width="100">
            <template #default="scope">
                <div @click="clickSource(scope.row.sourceUrl)" class="cell-hover">{{ scope.row.source }}</div>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="提醒" />

        <!-- <el-table-column show-overflow-tooltip="true" prop="source" label="周期" width="90" /> -->
        <el-table-column label="忆否" width="90">
            <template #default="scope">
                <div v-show="scope.row.highLight >= 1">
                    <span class="cell-hover">√</span>
                    or
                    <span class="cell-hover">×</span>
                </div>
                <div v-show="scope.row.highLight < 1">
                    --
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="source" label="难度" width="90">
            <template #default="scope">

                <el-popover placement="bottom" :hide-after="0" :width="130" trigger="click"
                    content="this is content, this is content, this is content">
                    <template #reference>
                        <div class="cell-hover">
                            未知
                        </div>
                    </template>
                    <div >
                        <el-rate v-model="rate" :colors="colors" :max="3" show-text :texts="['简单', '中等',  '困难']"/>
                    </div>
                </el-popover>


            </template>

        </el-table-column>
        <el-table-column prop="source" label="通过率" width="90">
            100%
        </el-table-column>
    </el-table>

    <el-popover  ref="popoverRef" :virtual-ref="buttonRef" trigger="click" title="With title" virtual-triggering>
        <span> Some content </span>
    </el-popover>
</template>
<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service } from "../../request/index"

import { ClickOutside as vClickOutside } from 'element-plus'
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}

const rate = ref(null)
const colors = ref({1:'#99A9BF',2:'#F7BA2A',3:'#FF9900'}) // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

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

function clickSource(url) {
    window.open(url, '_blank');
}
function clickND() { // 点击难度
    rateDialog.value = true;
}


onMounted(() => {
    loadData();
})

</script>
<style scoped>
.cell-hover:hover {
    color: #007aff;
    cursor: pointer;
}

.el-popover.el-popper {
    min-width: 130px;
}

/* 评分 */
.demo-rate-block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    display: inline-block;
    width: 49%;
    box-sizing: border-box;
}

.demo-rate-block:last-child {
    border-right: none;
}

.demo-rate-block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>
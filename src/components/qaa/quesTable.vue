
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
    <div class="cell-hover" style="float:right;margin:10px 0 10px 0; line-height: 35px;font-size:medium;">
        <img src="../../assets/pic/suiji.png" style="border-radius: 50%;width:20px;height: 20px;transform:translate(-20%,20%);"/>
        
        <span style="text-align: center;display: inline;">随机一问</span>
    </div>
    


    <el-table :data="data.tableData" :row-key="quesId" stripe max-height="700px">
        <el-table-column label="状态" sortable width="90px">
            <template #default="scope">
                <img v-if="scope.row.highLight != -1" :src="scope.row.imgPath" alt=""
                    style="width: 23px;height: 21px;transform:translate(20%,20%);">
            </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" label="问题" prop="ques" min-width="100px">
            <template #default="scope">
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="cell-hover">
                    {{ scope.row.ques }}
                </div>
            </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" sortable prop="createTime" label="提醒" />

        <el-table-column label="溯源" sortable width="90px">
            <template #default="scope">
                <div @click="clickSource(scope.row.sourceUrl)" class="cell-hover">{{ scope.row.source }}</div>
            </template>
        </el-table-column>

        <!-- <el-table-column show-overflow-tooltip="true" prop="source" label="周期" width="90" /> -->
        <el-table-column sortable label="通过率" width="90px">
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
        <el-table-column sortable prop="source" label="难度" width="90px">
            <template #default="scope">

                <el-popover placement="bottom" :hide-after="0" :width="130" trigger="click"
                    content="this is content, this is content, this is content">
                    <template #reference>
                        <div class="cell-hover">
                            未知
                        </div>
                    </template>
                    <div>
                        <el-rate v-model="rate" :colors="{ 1: '#99A9BF', 2: '#F7BA2A', 3: '#FF9900' }" :max="3" show-text
                            :texts="['简单', '中等', '困难']" />
                    </div>
                </el-popover>
            </template>

        </el-table-column>
        <el-table-column sortable prop="memoryLevel" label="进度">
            <template #default="scope">
                <el-progress :percentage="scope.row.memoryLevel / 13 * 100" :show-text="false" status="warning"
                    :stroke-width="8" />
            </template>

        </el-table-column>
    </el-table>
    <el-pagination background layout="->,prev, pager, next" style="margin-top:10px" :total="pagination.total"
        :page-count="pagination.totalPage" :current-page="pagination.page" @current-change="pageChange" />
</template>
<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service } from "../../request/index"
import { Search } from '@element-plus/icons-vue'

let data = reactive({
    tableData: [],
})

let pagination = reactive({
    page: 1, // 当前页
    total: 0, // 总条数
    limit: 15, // 每页显示限制
    totalPage: 0 // 总页数
})

let rate = ref(null)


const pageChange = (p: number) => {
    pagination.page = p
    // 发起接口请求数据 , 请求参数中使用 currentPage.value 作为查询当前页码
    loadData(pagination.page, pagination.limit);
}

function loadData(page: number, limit: number) {
    service.get("qa/ques/list", { params: { page: pagination.page, limit: pagination.limit } }).then((res) => {
        // tableData.value=res;
        // console.log(res)
        console.log(res.data.page);
        pagination.total = res.data.page.totalCount;
        pagination.totalPage = res.data.page.totalPage;
        data.tableData = res.data.page.list;
        getImgPath();
    }).catch(e => { })
}

function getStatusImgPath() {
    // for (var i = 0; i < data.tableData.length; i++) {
    //     data.tableData[i].imgPath = `./src/assets/pic/lv/lv${data.tableData[i].memoryLevel}.png`;
    // }
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
    loadData(pagination.page, pagination.limit);
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

<template>
    
    <QuesTableBar/>

    <el-table size="default" :data="data.tableData" :row-key="quesId" stripe max-height="700px">
        <el-table-column label="状态" width="90px">
            <template #default="scope">
                <span v-if="scope.row.statusImgPath != 'null'">
                    <img :src="scope.row.statusImgPath" alt=""
                        style="width: 18px;height: 18px;transform:translate(20%,20%);" />
                </span>
                <span style="width: 23px;height: 21px;" v-else></span>
            </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" label="问题" prop="ques" min-width="120px">
            <template #default="scope">
                <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="cell-hover">
                    {{ scope.row.ques }}
                </div>
            </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" sortable prop="reviewOn" label="提醒" :formatter="dateFormat"
            width="110px" />

        <el-table-column label="溯源" sortable width="90px">
            <template #default="scope">
                <div class="cell-hover">
                    <span @click="clickSource(scope.row.sourceUrl)" v-show="scope.row.source !== undefined">{{
                        scope.row.source }}</span>
                    <span v-show="scope.row.source === null">--</span>
                </div>
            </template>
        </el-table-column>

        <!-- <el-table-column show-overflow-tooltip="true" prop="source" label="周期" width="90" /> -->
        <el-table-column sortable label="通过率" width="90px">
            <template #default="scope">
                <div v-if="scope.row.status > 1">
                    <span class="cell-hover">√</span>
                    or
                    <span class="cell-hover">×</span>
                </div>
                <div v-else>
                    {{ scope.row.passRate }}
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
                <el-progress :percentage="scope.row.memoryLevel / 9 * 100" :show-text="false" status="warning"
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
import QuesTableBar from './quesTableBar.vue'

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
function dateFormat(row) {
    return row.reviewOn.substring(5);
}
function loadData(page: number, limit: number) {
    service.get("qa/ques/list", { params: { page: pagination.page, limit: pagination.limit } }).then((res) => {
        // tableData.value=res;
        // console.log(res)
        console.log(res.data.page);
        pagination.total = res.data.page.totalCount;
        pagination.totalPage = res.data.page.totalPage;
        data.tableData = res.data.page.list;
        getStatusImgPath();
    }).catch(e => { })
}

function getStatusImgPath() {
    for (var i = 0; i < data.tableData.length; i++) {
        if (data.tableData[i].status === 1) {
            data.tableData[i].statusImgPath = `./src/assets/pic/status/status1.png`;
        } else if (data.tableData[i].status === 2 || (data.tableData[i].status === 3)) {
            data.tableData[i].statusImgPath = `./src/assets/pic/status/status2.png`;
        } else { // 一天内提醒
            data.tableData[i].statusImgPath = "null";
        }
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
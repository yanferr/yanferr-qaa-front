
<template>
    <QuesTableBar />
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
                <div @click="edit(scope.row)" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="cell-hover">
                    {{ scope.row.ques }}
                </div>
            </template>
        </el-table-column>

        <el-table-column :show-overflow-tooltip="true" sortable prop="reviewOn" label="提醒" :formatter="dateFormat"
            width="110px" />

        <el-table-column label="溯源"  width="90px">
            <template #default="scope">
                <div class="cell-hover">
                    <span @click="clickSource(scope.row.sourceUrl)" v-show="scope.row.source !== undefined">{{
                        scope.row.source }}</span>

                    <el-popover :visible="sourcePopover" placement="bottom" :hide-after="0" :width="200" trigger="click"
                        content="this is content, this is content, this is content">
                        <template #reference>
                            <span v-show="scope.row.source === null">--</span>
                        </template>
                        <div>
                            <el-input v-model="data.qa.source" placeholder="来源名称" />
                            <el-input v-model="data.qa.sourceUrl" style="margin-top: 10px;" placeholder="输入对应的url" />
                            <el-button @click="setSource(scope.row)" style="margin-top: 10px;float:right">确定</el-button>
                        </div>
                    </el-popover>

                </div>
            </template>
        </el-table-column>

        <!-- <el-table-column show-overflow-tooltip="true" prop="source" label="周期" width="90" /> -->
        <el-table-column sortable label="通过率" width="90px">
            <template #default="scope">
                <div v-if="scope.row.status > 1">
                    <span @click="remember(scope.row, true)" class="cell-hover">√</span>
                    or
                    <span @click="remember(scope.row, false)" class="cell-hover">×</span>
                </div>
                <div v-else>
                    {{ scope.row.passRate }}
                </div>
            </template>
        </el-table-column>
        <el-table-column sortable prop="source" label="难度" width="90px">
            <template #default="scope">

                <el-popover :visible="difficultyPopover" placement="bottom" :hide-after="0" :width="130" trigger="click"
                    content="this is content, this is content, this is content">
                    <template #reference>
                        <div class="cell-hover">
                            <span v-if="scope.row.difficulty === null">
                                未知
                            </span>
                        </div>
                    </template>
                    <div>
                        <el-rate v-model="data.qa.difficulty" @change="setDifficulty(scope.row)"
                            :colors="{ 1: '#99A9BF', 2: '#F7BA2A', 3: '#FF9900' }" :max="3" show-text
                            :texts="['简单', '中等', '困难']" />
                    </div>
                </el-popover>
                <span v-if="scope.row.difficulty === '1'" style="color:#00af9b">
                    简单
                </span>
                <span v-if="scope.row.difficulty === '2'" style="color:#feb700">
                    中等
                </span>
                <span v-if="scope.row.difficulty === '3'" style="color:#f3173f">
                    困难
                </span>

            </template>

        </el-table-column>
        <el-table-column sortable prop="memoryLevel" label="进度">
            <template #default="scope">
                <el-progress :percentage="scope.row.memoryLevel / 9 * 100" :show-text="false" status="warning"
                    :stroke-width="8" />
            </template>

        </el-table-column>
    </el-table>
    <!-- 修改对话框 -->
    <QaDialog/>
    <!-- 分页 -->
    <el-pagination background layout="->,prev, pager, next" style="margin-top:10px" :total="pagination.total"
        :page-count="pagination.totalPage" :current-page="pagination.page" @current-change="pageChange" />
</template>
<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { Search } from '@element-plus/icons-vue'
import QuesTableBar from './quesTableBar.vue'
import QaDialog from './qaDialog.vue'
import { ElMessage } from 'element-plus'

// 搜索条件
let search = reactive({ 
    labelId: '',
    content: '',
    timeInterval: '',
    difficulty: '',
    remind: '',
})


let data = reactive({
    difficultyPopover: false,
    sourcePopover: false,
    tableData: [{}],
    qa: {
        difficulty: '',
        source: '',
        sourceUrl: '',
    },
    
})

// 分页
let pagination = reactive({
    page: 1, // 当前页
    total: 0, // 总条数
    limit: 15, // 每页显示限制
    totalPage: 0 // 总页数
})

// 分页
const pageChange = (p: number) => {
    pagination.page = p
    // 发起接口请求数据 , 请求参数中使用 currentPage.value 作为查询当前页码
    loadData();
}

// 编辑
function edit(row: object){
    bus.emit("row",{quesId:row.quesId,answerId:row.answerId});
}

// 设置溯源信息
function setSource(row: object) {

    // 检查是否可以提交
    if (data.qa.source.trim().length === 0) {
        ElMessage({
            message: '来源不能为空！',
            offset: 60,
            type: 'warning',
        })
        return;
    }
    if (data.qa.sourceUrl.trim().length === 0) {
        ElMessage({
            center: true,
            message: '来源地址不能为空！',
            offset: 60,
            type: 'warning'
        });
        return;
    }

    service.post("qa/ques/update", { quesId: row.quesId, source: data.qa.source, sourceUrl: data.qa.sourceUrl }).then((res) => {
        data.qa = { difficulty: '', source: '', sourceUrl: '' };
        loadData();
    }).catch(e => { })
    data.sourcePopover = false;
}

// 设置难度 
function setDifficulty(row: object) {
    service.post("qa/ques/update", { quesId: row.quesId, difficulty: data.qa.difficulty }).then((res) => {
        data.qa = { difficulty: '', source: '', sourceUrl: '' }

        loadData();
    }).catch(e => { })
    data.difficultyPopover = false;
}

// 是否还记得
function remember(row: object, flag: boolean) {
    console.log(row, flag);
    service.get("qa/ques/updateLevel", { params: { status: row.status, quesId: row.quesId, flag } }).then((res) => {
        loadData();
    }).catch(e => { })
}

function dateFormat(row: object) {
    return row.reviewOn.substring(5);
}
function loadData() {
    // page: pagination.page, limit: pagination.limit,
    service.get("qa/ques/list", { params: {...pagination,...search} }).then((res) => {
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

function filterTable(){
    service.get("qa/ques/remindQues").then((res) => {
        data.tableData = res.data.data;
        getStatusImgPath();
    }).catch(e => { })
}


onMounted(() => {
    
    loadData();
    bus.on('flush', (flag) => {
        // console.log("收到了",flag)
        if (flag) {
            loadData();
        }
    })
    bus.on('filterTable', (flag) => {
        // 过滤表格
        filterTable()
    })
    bus.on('searchData', (searchObj) => {
        search = {...search,...searchObj}
        console.log("条件变啦变啦！！",search);
        loadData();
    })
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
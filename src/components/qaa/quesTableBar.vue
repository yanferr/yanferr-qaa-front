<template>
    <!-- 搜索条件 -->
    <el-select @change="difficultyChange" clearable v-model="search.difficulty" class="m-2" placeholder="难度"
        style="width:75px;margin: 10px 0 10px 0">
        <el-option v-for="item in data.difficulty" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select @change="timeChange" clearable v-model="search.timeInterval" class="m-2" placeholder="时间"
        style="margin: 10px 0 10px 10px;width:75px">
        <el-option v-for="item in data.timeRange" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select @change="labelChange" filterable clearable :collapse-tags="true" v-model="search.labelId" class="m-2"
        placeholder="标签" style="margin: 10px 0 10px 10px; width:75px">
        <el-option v-for="item in data.labels" :key="item.labelId" :label="item.labelName" :value="item.labelId" />
    </el-select>
    <el-input style="margin: 10px 0 10px 10px; width:200px" placeholder="搜索题目内容或关键词" v-model="search.content"
        class="w-50 m-2" @keyup.esc="esc" @keyup.enter="enter" :prefix-icon="Search" />

    <!-- 只显示显示提醒问题 -->
    <img :alt="data.msg" v-show="!search.remind" @click="filterTable" class="cell-hover"
        src="../../assets/pic/status/status2.png"
        style="margin: 0 0 0 27px;width:20px;height: 20px;transform:translate(-20%,20%);" />
    <img :alt="data.msg" v-show="search.remind" @click="filterTable" class="cell-hover"
        src="../../assets/pic/status/all.png"
        style="margin: 0 0 0 27px;width:20px;height: 20px;transform:translate(-20%,20%);" />

    <!-- 新增 -->
    <img @click="data.dialogVisible = true" class="cell-hover" src="../../assets/pic/status/add.png"
        style="margin: 0 0 0 20px;width:20px;height: 20px;transform:translate(-20%,25%);" />


    <!-- 随机一题 -->
    <div style="float:right;margin:10px 0 10px 0; line-height: 35px;font-size:medium;">
        <img class="cell-hover" src="../../assets/pic/suiji.png"
            style="border-radius: 50%;width:20px;height: 20px;transform:translate(-20%,20%);" />
        <span class="cell-hover" style="text-align: center;display: inline;">随机一问</span>
    </div>

    <!-- 新增表单 -->
    <el-dialog draggable :close-on-click-modal="false" v-model="data.dialogVisible" title="新增问题" center width="30%">
        <el-input placeholder="输入问题" v-model="data.qa.ques"></el-input>
        <el-select collapse-tags collapse-tags-tooltip :popper-append-to-body="false" :default-first-option="true"
            v-model="data.qa.labelNames" multiple filterable allow-create placeholder="选择标签" autocomplete
            style="margin-top: 40px;">
            <el-option v-for="item in data.labels" :key="item.labelId" :label="item.labelName" :value="item.labelName">
            </el-option>
        </el-select>
        <el-input :rows="10" type="textarea" placeholder="输入答案" v-model="data.qa.answer" style="margin-top: 40px;">
        </el-input>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="data.dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { Search, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 搜索条件
let search = reactive({
    labelId: '',
    content: '',
    timeInterval: '',
    difficulty: '',
    remind: false,
})
// 新增回显
let data = reactive({
    msg: '只显示提醒问题',
    dialogVisible: false,
    difficulty: [{
        label: '简单',
        value: 1
    },
    {
        label: '中等',
        value: 2
    },
    {
        label: '困难',
        value: 3
    }
    ],
    timeRange: [{
        label: '今天',
        value: 1
    }, {
        label: '本周',
        value: 7
    }, {
        label: '本月',
        value: 30
    }],
    labels: [{ labelId: 0, labelName: '' }],
    qa: { labelNames: [], ques: '', answer: '' } // 新增
})

// 点击小闪电
function filterTable() {
    search.remind = !search.remind;
    data.msg = search.remind ? '显示所有问题' : '只显示提醒问题';
    bus.emit("searchData", { remind: search.remind })
}
// 搜索条件变化
function difficultyChange() {
    bus.emit("searchData", { difficulty: search.difficulty })
}
// 搜索条件变化
function labelChange() {
    bus.emit("searchData", { labelId: search.labelId })
}
// 搜索条件变化
function timeChange() {
    bus.emit("searchData", { timeInterval: search.timeInterval })
}
// 搜索条件变化
function enter() {
    bus.emit("searchData", { content: search.content })
}

function submit() {
    // 检查是否可以提交
    if (data.qa.ques.trim().length === 0) {
        ElMessage({
            message: '问题不能为空！',
            offset: 60,
            type: 'warning',
        })
        return;
    }
    if (data.qa.answer.trim().length === 0) {
        ElMessage({
            center: true,
            message: '答案不能为空！',
            offset: 60,
            type: 'warning'
        });
        return;
    }
    // 提交
    service.post('qa/ques/save', {
        ques: data.qa.ques,
        answer: data.qa.answer,
        labelNames: data.qa.labelNames
    }).then(res => { // 必须要用箭头函数
        console.log(res);
        if (res && res.data.code === 0) {
            ElMessage({
                message: '添加成功',
                offset: 60,
                type: 'success'
            });
            data.qa = { labelNames: [], ques: '', answer: '' };

        } else {
            alert("添加失败")
        }
        data.dialogVisible = false;
    }).catch(function (error) {
        alert("添加失败")
    });
    bus.emit('flush', true);  // 刷新
}

// 监听搜索框esc按键
function esc() {
    search.content = '';
}

function loadLabels() {
    service.get('qa/label/list')
        .then(res => {
            if (res && res.data.code === 0) {
                data.labels = res.data.page.list;
            } else {
                alert("标签数据加载失败")
            }
        })
}
onMounted(() => {
    // bus.emit('a', a)
    loadLabels();
})


</script>
<style scoped>
.cell-hover:hover {
    cursor: pointer;
}
</style>
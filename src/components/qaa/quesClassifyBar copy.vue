<template>
    <div class="div-bar">
        
    </div>
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
    newRemind: false,
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

// 监听搜索框esc按键
function esc() {
    search.content = '';
    bus.emit("searchData", { content: search.content })
}
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
            bus.emit('flush', true);  // 刷新
        } else {
            alert("添加失败")
        }
        data.dialogVisible = false;
    }).catch(function (error) {
        alert("添加失败")
    });

}



function loadLabels() {
    service.get('qa/label/list', { params: { limit: 999 } })
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
    bus.on("newRemind", (flag) => {
        data.newRemind = flag;
    })
})


</script>
<style scoped>
.div-bar {
    flex-grow: 1;
    text-align: left;
    /* overflow: overlay; */
}

.cell-hover:hover {
    cursor: pointer;
}
</style>
<template>
    <el-select clearable v-model="data.search.difficulty" class="m-2" placeholder="难度"
        style="width:75px;margin: 10px 0 10px 0">
        <el-option v-for="item in data.difficulty" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select clearable v-model="data.search.timeValue" class="m-2" placeholder="时间"
        style="margin: 10px 0 10px 10px;width:75px">
        <el-option v-for="item in data.timeRange" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select filterable clearable :collapse-tags="true" v-model="data.search.labelName" class="m-2" placeholder="标签"
        style="margin: 10px 0 10px 10px; width:75px">
        <el-option v-for="item in data.labels" :key="item.labelId" :label="item.labelName" :value="item.labelName" />
    </el-select>
    <el-input style="margin: 10px 0 10px 10px; width:200px" placeholder="搜索题目内容或关键词" v-model="data.search.content" class="w-50 m-2"
        @keyup.esc="esc" @keyup.enter="enter" :prefix-icon="Search" />
    <!-- 新增 -->
    <el-button plain type="success" style="margin: 10px 0 10px 10px;" :icon="Plus" round @click="data.dialogVisible = true">新增</el-button>

    <!-- 随机一问 -->
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


let data = reactive({
    dialogVisible: false,
    difficultyValue: '',
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
    timeValue: '',
    timeRange: [{
        label: '今天',
        value: 1
    }, {
        label: '本周',
        value: 2
    }, {
        label: '本月',
        value: 3
    }],
    labels: [{ labelId: 0, labelName: ''}],
    search: {  // 搜索条件
        labelName: '',
        content: '',
        timeValue: '',
        difficulty: '',
    },
    qa: { labelNames: [], ques: '', answer: '' } // 新增
})

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
            data.qa = {labelNames: [], ques: '', answer: ''};
            
        } else {
            alert("添加失败")
        }
    }).catch(function (error) {
        alert("添加失败")
    });
    data.dialogVisible=false;
    bus.emit('flush',true);  // 刷新
}

// 监听搜索框esc按键
function esc() {
    data.search.content = '';
}
// 监听搜索框enter按键
function enter() {
    bus.emit('a', data.search);
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
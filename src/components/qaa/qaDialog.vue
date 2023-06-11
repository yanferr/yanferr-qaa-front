<template>
    <el-dialog  v-model="data.dialogVisible" title="查看&编辑" style="width: 700px;" draggable
        :close-on-click-modal="false">
        <template #header="{ titleId, titleClass }">
            <h4 :id="titleId" :class="titleClass" style="text-align: left;">查看&编辑
                <el-popconfirm confirm-button-text="删除" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
                    title="确定删除吗?" @confirm="deleteOne">
                    <template #reference>
                        <el-icon class="cell-hover" style="margin-left: 30px;">
                            <Delete />
                        </el-icon>
                    </template>
                </el-popconfirm>
                <el-icon @click="data.simplification = !data.simplification"
                    class="cell-hover" style="margin-left: 20px;">
                    <More />
                </el-icon>
            </h4>

        </template>
        <el-form :model="form" label-width="120px">
            <el-form-item label="问题名称">
                <el-input v-model="form.qa.ques.ques" />
            </el-form-item>
            <el-form-item label="所属标签">
                <el-select collapse-tags collapse-tags-tooltip :default-first-option="true" v-model="form.optionsValue"
                    multiple filterable allow-create placeholder="选择标签" autocomplete>
                    <el-option style="width:100%" v-for="item in form.labels" :key="item.labelId" :label="item.labelName"
                        :value="item.labelName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提醒起止时间" v-show="data.simplification">
                <el-date-picker disabled v-model="timePicker" type="datetimerange" range-separator="至"
                    start-placeholder="Start date" end-placeholder="End date" />

            </el-form-item>
            <el-form-item label="加入记忆计划" v-show="data.simplification">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="问题难度" v-show="data.simplification">
                <el-radio-group v-model="form.qa.ques.difficulty">
                    <el-radio label="1">简单</el-radio>
                    <el-radio label="2">中等</el-radio>
                    <el-radio label="3">困难</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="溯源信息" v-show="data.simplification">
                <el-input v-model="form.qa.ques.source"></el-input>
            </el-form-item>
            <el-form-item label="溯源地址" v-show="data.simplification">
                <el-input v-model="form.qa.ques.sourceUrl"></el-input>
            </el-form-item>
            <el-form-item label="问题答案">
                <el-input :rows="10" v-model="form.qa.answer.answer" type="textarea" />
            </el-form-item>
            <el-form-item >
                <el-button @click="data.dialogVisible = false">取消</el-button>
                <el-button type="warning" @click="onSubmit">修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { More, Delete, InfoFilled } from '@element-plus/icons-vue'
import { componentSizeMap, ElMessage } from 'element-plus'


let timePicker = ref<[Date, Date]>([
    new Date(2000, 10, 10, 10, 10),
    new Date(2000, 10, 11, 10, 10),
])

let submit = reactive({
    quesId: null,
    ques: null,
    source: null,
    sourceUrl: null,
    answer: null,
    answerId: null,
    createTime: null,
    updateTime: null,
    memoryLevel: null,
    reviewOn: null,
    delayOn: null,
    passRate: null,
    difficulty: null,
})


// 表单回显的数据
let form = reactive({
    qa: { ques: { ques: '', difficulty: '', source: '', sourceUrl: '' }, answer: { answerId: '', answer: '' } },

    optionsValue: [], // el-select回显数据
    labels: [], // el-select 所有数据
})

// 传递过来的数据
let data = reactive({
    dialogVisible: false,
    simplification: false,
    qa: { quesId: '', answerId: '' },

})

// 删除逻辑（单个删除）
function deleteOne() {
    service.post("qa/ques/delete",
        JSON.stringify([data.qa.quesId]), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res && res.data.code === 0) {
                bus.emit('flush', true);  // 刷新
                data.dialogVisible = false;
                ElMessage({
                    message: '删除成功！',
                    offset: 60,
                    type: 'success',
                })
            } else {
                ElMessage({
                    message: '操作失败！',
                    offset: 60,
                    type: 'error',
                })
            };
        }).catch(function (error) {
            console.log(error);
        });
}

// 提交
function onSubmit() {
    service.post('qa/ques/save', {
        quesId: data.qa.quesId,
        ques: form.qa.ques.ques,
        difficulty: form.qa.ques.difficulty,
        source: form.qa.ques.source,
        sourceUrl: form.qa.ques.sourceUrl,
        answerId: data.qa.answerId,
        answer: form.qa.answer.answer,
        labelNames: form.optionsValue,
    }).then(res => { // 必须要用箭头函数
        console.log(res);
        if (res && res.data.code === 0) {
            ElMessage({
                message: '修改成功',
                offset: 60,
                type: 'success'
            });
            bus.emit('flush', true);  // 刷新
        } else {
            alert("修改失败")
        }
        data.dialogVisible = false;
    }).catch(function (error) {
        alert("修改失败")
    });


}

function initData() {
    service.get(`qa/ques/info/${data.qa.quesId}`).then((res) => {
        form.qa.ques = res.data.ques;
        timePicker.value[0] = res.data.ques.reviewOn;
        timePicker.value[1] = res.data.ques.delayOn;
    }).catch(e => { });

    service.get(`qa/answer/info/${data.qa.answerId}`).then((res) => {
        form.qa.answer = res.data.answer;
    }).catch(e => { })

    lablesWithQuesId();
    loadLabels();
}



function lablesWithQuesId() {
    service.get(`/qa/label/labels/${data.qa.quesId}`)
        .then(res => {
            form.optionsValue = [];
            var tep = res.data.data;
            // console.log("tep",res)
            for (var i = 0; i < tep.length; i++) {
                form.optionsValue.push(tep[i].labelName);
            }
            console.log(form.optionsValue)
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
}

function loadLabels() {
    service.get('qa/label/list', { params: { limit: 999 } })
        .then(res => {
            if (res && res.data.code === 0) {
                form.labels = res.data.page.list;
            } else {
                alert("标签数据加载失败")
            }
        })
}
onMounted(() => {
    bus.on('row', (row) => {
        data.qa.quesId = row.quesId;
        data.qa.answerId = row.answerId;
        initData();
        data.dialogVisible = true;
        // data.simplification = false;
    })

})
</script>
<style>
.cell-hover:hover {
    color: #007aff;
    cursor: pointer;
}
</style>
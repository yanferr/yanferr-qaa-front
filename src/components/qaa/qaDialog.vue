<template>
    <el-dialog :destroy-on-close="true" v-model="data.dialogTableVisible" title="查看&编辑" style="width: 700px;" draggable
        :close-on-click-modal="false">
        <el-form :model="form" label-width="120px">
            <el-form-item label="问题名称">
                <el-input v-model="form.ques.ques" />
            </el-form-item>
            <el-form-item label="所属标签">
                <el-select :default-first-option="true" v-model="form.optionsValue" multiple filterable allow-create placeholder="选择标签"
                    autocomplete>
                    <el-option style="width:100%" v-for="item in form.labels" :key="item.labelId"
                        :label="item.labelName" :value="item.labelName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提醒起止时间" v-show="data.simplification">
                <el-col :span="11">
                    <el-date-picker v-model="form.ques.reviewOn" type="date" placeholder="Pick a date"
                        style="width: 100%" />
                </el-col>
                <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-time-picker v-model="form.ques.delayOn" placeholder="Pick a time" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="加入记忆计划" v-show="data.simplification">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="问题难度" v-show="data.simplification">
                <el-radio-group v-model="form.resource">
                    <el-radio label="简单" />
                    <el-radio label="中等" />
                    <el-radio label="困难" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="溯源信息" v-show="data.simplification">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="溯源地址" v-show="data.simplification">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="问题答案">
                <el-input :rows="10" v-model="form.answer.answer" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit">取消</el-button>
                <el-button type="warning">修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { Search, Plus } from '@element-plus/icons-vue'
import { componentSizeMap, ElMessage } from 'element-plus'

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

let form = reactive({
    ques: {},
    answer: {},
    timePicker: [],
    optionsValue: [],
    labels: [],
})

// 传递过来的数据
let data = reactive({
    dialogTableVisible: false,
    simplification: false,
    qa: { quesId: '', answerId: '' },

})

function initData() {
    service.get(`qa/ques/info/${data.qa.quesId}`).then((res) => {
        form.ques = res.data.ques;
        form.ques.timePicker = [res.data.ques.reviewOn, res.data.ques.delayOn]
    }).catch(e => { });

    service.get(`qa/answer/info/${data.qa.answerId}`).then((res) => {
        form.answer = res.data.answer;
    }).catch(e => { })
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
    service.get('qa/label/list')
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
        lablesWithQuesId();
        loadLabels();
        data.dialogTableVisible = true
    })

})
</script>
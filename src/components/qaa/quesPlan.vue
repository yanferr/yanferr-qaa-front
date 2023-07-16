<template>
    <div class="div-plan-header">
        <el-row>
            <el-col :span="12">
                <h3 style="margin-bottom: 20px;width: 80px;">计划推荐</h3>
            </el-col>
            <el-col :span="12"><span class="cell-hover" style="float:right;margin-right: 20px;">查看更多</span></el-col>
        </el-row>
        <div class="div-plan">
            <div class="div-plan-inner">
                <el-row>
                    <!-- 头部 -->
                    <el-col :span="20">
                        <h4 clas="plan-text-nowrap-1">MqttsNet / thinglinks</h4>
                    </el-col>
                    <el-col :span="4">
                        <div style="float:right;margin-right:10px">
                            <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                                src="../../assets/touxiang1.png" />
                        </div>
                    </el-col>
                    <!-- 内容 -->
                    <span class="plan-text-nowrap-2" >蚂蚁集团研发的生僻字解决方案，致力于解决蚂蚁内部录入、显示、存储，还有一些高并发的解决方案...</span>
                    <!-- 底部 -->
                    <el-col :span="12" class="plan-text-nowrap-1">
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">Python</font>
                    </el-col>
                    <el-col :span="12" class="plan-text-nowrap-1">
                        <div style="float:right;margin-right:10px">

                            <el-icon style="transform:translate(0%,20%);">
                                <Star />
                            </el-icon><span style="font-size: smaller;margin-right: 10px;">72</span>
                            <el-icon style="transform:translate(0%,20%);">
                                <Connection />
                            </el-icon><span style="font-size: smaller;">25</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="div-plan-inner">
                <el-row>
                    <!-- 头部 -->
                    <el-col :span="20">
                        <h4  class="plan-text-nowrap-1" style="float:left;margin-left:10px;line-height: 35px;color:#98865b">
                            NeatLogic / neatlogic-cmdb</h4>
                    </el-col>
                    <el-col :span="4">
                        <div style="float:right;margin-right:10px">
                            <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                                src="../../assets/touxiang2.png" />
                        </div>
                    </el-col>
                    <!-- 内容 -->
                    <span class="plan-text-nowrap-2">neatlogic cmdb是一套强大的企业级配置管理平台，支持自动发现、自动采...</span>
                    <!-- 底部 -->
                    <el-col :span="16" class="plan-text-nowrap-1">
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">CMDB</font>
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">自动发现</font>
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">配置管理</font>
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">配置管理</font>
                    </el-col>
                    <el-col :span="8">
                        <div style="float:right;margin-right:10px">

                            <el-icon style="transform:translate(0%,20%);">
                                <Star />
                            </el-icon><span style="font-size: smaller;margin-right: 10px;">11</span>
                            <el-icon style="transform:translate(0%,20%);">
                                <Connection />
                            </el-icon><span style="font-size: smaller;">22</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="div-plan-inner">
                <el-row>
                    <!-- 头部 -->
                    <el-col :span="20">
                        <h4 style="float:left;margin-left:10px;line-height: 35px;color:#98865b">
                            第四范式 / OpenMLDB</h4>
                    </el-col>
                    <el-col :span="4">
                        <div style="float:right;margin-right:10px">
                            <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                                src="../../assets/touxiang3.png" />
                        </div>
                    </el-col>
                    <!-- 内容 -->
                    <span class="plan-text-nowrap-2">OpenMLDB是一个开源机器学习数据库，面向机器学习应用提供正确、高...</span>
                    <!-- 底部 -->
                    <el-col :span="16">
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">C++</font>
                    </el-col>
                    <el-col :span="8">
                        <div style="float:right;margin-right:10px">

                            <el-icon style="transform:translate(0%,20%);">
                                <Star />
                            </el-icon><span style="font-size: smaller;margin-right: 10px;">86</span>
                            <el-icon style="transform:translate(0%,20%);">
                                <Connection />
                            </el-icon><span style="font-size: smaller;">42</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="div-plan-inner">
                <el-row>
                    <!-- 头部 -->
                    <el-col :span="20">
                        <h4 style="float:left;margin-left:10px;line-height: 35px;color:#98865b">
                            Chobits / MDSPP</h4>
                    </el-col>
                    <el-col :span="4">
                        <div style="float:right;margin-right:10px">
                            <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                                src="../../assets/touxiang4.png" />
                        </div>
                    </el-col>
                    <!-- 内容 -->
                    <span class="plan-text-nowrap-2">MineDataStructure++. A C++ containers library that is as easy
                        to...</span>
                    <!-- 底部 -->
                    <el-col :span="16">
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">C++</font>
                    </el-col>
                    <el-col :span="8">
                        <div style="float:right;margin-right:10px">

                            <el-icon style="transform:translate(0%,20%);">
                                <Star />
                            </el-icon><span style="font-size: smaller;margin-right: 10px;">64</span>
                            <el-icon style="transform:translate(0%,20%);">
                                <Connection />
                            </el-icon><span style="font-size: smaller;">83</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="div-plan-inner">
                <el-row>
                    <!-- 头部 -->
                    <el-col :span="20">
                        <h4 class="plan-text-nowrap-1" style="float:left;margin-left:10px;line-height: 35px;color:#98865b">
                            CyrusZhou / MP_WeiXin_ChatGPT
                        </h4>
                    </el-col>
                    <el-col :span="4">
                        <div style="float:right;margin-right:10px">
                            <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                                src="../../assets/touxiang5.png" />
                        </div>
                    </el-col>
                    <!-- 内容 -->
                    <span class="plan-text-nowrap-2">微信公众号对接ChatGPT程序，实现异构数据源的整合，帮助企业构建数...</span>
                    <!-- 底部 -->
                    <el-col :span="16" class="plan-text-nowrap-1">
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">chatGPT</font>
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">chatgpt-bot</font>
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">weixin</font>
                    </el-col>
                    <el-col :span="8">
                        <div style="float:right;margin-right:10px">

                            <el-icon style="transform:translate(0%,20%);">
                                <Star />
                            </el-icon><span style="font-size: smaller;margin-right: 10px;">231</span>
                            <el-icon style="transform:translate(0%,20%);">
                                <Connection />
                            </el-icon><span style="font-size: smaller;">234</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="div-plan-inner">
                <el-row>
                    <!-- 头部 -->
                    <el-col :span="20">
                        <h4 style="float:left;margin-left:10px;line-height: 35px;color:#98865b">
                            智路理事会 / airos-edge</h4>
                    </el-col>
                    <el-col :span="4">
                        <div style="float:right;margin-right:10px">
                            <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                                src="../../assets/touxiang6.png" />
                        </div>
                    </el-col>
                    <!-- 内容 -->
                    <span class="plan-text-nowrap-2">智路OS是全球首个开源开放的智能网联路侧单元操作系统（简称”智路OS“）...</span>
                    <!-- 底部 -->
                    <el-col :span="16">
                        <font size="1" style="background-color: #ececec;margin: 10px 0 0 10px;">C++</font>
                    </el-col>
                    <el-col :span="8">
                        <div style="float:right;margin-right:10px">

                            <el-icon style="transform:translate(0%,20%);">
                                <Star />
                            </el-icon><span style="font-size: smaller;margin-right: 10px;">96</span>
                            <el-icon style="transform:translate(0%,20%);">
                                <Connection />
                            </el-icon><span style="font-size: smaller;">103</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted } from 'vue'
import { service, bus } from "../../utils"
import { Star, Connection } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


onMounted(() => {

})


</script>
<style scoped>
.div-plan-header {
    clear: both;
    z-index: 2;
    text-align: left;
    height: auto;

}

.div-plan {
    display: flex;
    flex-wrap: wrap;
}

.div-plan-inner {
    height: 115px;
    float: left;
    margin: 0 20px 20px 0;
    width: calc(33.33% - 14px);
    /* 减去margin-right的值 */
    box-sizing: border-box;
    box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.2), 0px 0px 50px rgb(255, 255, 255) inset;
}

.div-plan div:nth-child(3n) {
    margin: 0;
}

h4 {
    float: left;
    margin-left: 10px;
    line-height: 35px;
    color: #98865b;
}

.div-plan-inner:hover {
    /* 盒子悬浮时阴影 */
    box-shadow: 0px -3.5px 30px rgba(0, 0, 0, 0.2), 0px 0px 50px rgb(255, 255, 255) inset;
    cursor: pointer;
}
.plan-text-nowrap-1{
    width: 99%;
    /* 根据需要设置固定宽度或最大宽度 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.plan-text-nowrap-2 {
    width: 99%;
    display: -webkit-box;
    margin: 0 10px 0 10px;
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
    /* 根据需要设置固定宽度或最大宽度 */
}

.cell-hover:hover {
    color: black;
    cursor: pointer;
}
</style>
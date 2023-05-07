<template>
    <!-- 暗黑模式
        el-header   background-color:#282828
        .header-row-hover:hover { color: white; }
        el-row style="color:#b2bebb;"
    -->
    <el-header style="text-align: left;height: 50px;padding:0;background-color:#ffffff">
        <el-row style="color:#5c5c63;font-size:medium;line-height: 50px;">
            <el-col :span="4"></el-col>
            <el-col :span="1">
                <span><img style="height: 30px;transform:translate(20%,24%);" src="@/assets/pic/yanferr.png" /></span>
            </el-col>
            <el-col :span="11">
                <span class="header-row-hover" style="">学习</span>
                <span class="header-row-hover" style="margin-left:30px">题库</span>
                <span class="header-row-hover" style="margin-left:30px">竞赛</span>
                <span class="header-row-hover" style="margin-left:30px">讨论</span>
                <span class="header-row-hover" style="margin-left:30px">求职</span>
                <span class="header-row-hover" style="margin-left:30px">商店</span>
            </el-col>
            <el-col :span="4">
                <div style="float:right;margin-left:30px">
                    <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                        src="src\\assets\\pic\\touxiang.png" />
                </div>
                <div style="float:right">
                    <el-badge is-dot style="transform:translate(20%,30%);">
                        <span class="header-row-hover"><img style="height: 21px;transform:translate(20%,-56%);"
                                src="@/assets/pic/tixing.svg" /></span>
                    </el-badge>
                </div>
            </el-col>

            <el-col :span="4"></el-col>
        </el-row>
    </el-header>
</template>
<script lang="ts" setup>
</script>
<style>
.el-header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 999999;
    /* 阴影 */
    box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.2),0px 0px 50px rgb(255, 255, 255) inset;
}


.header-row-hover:hover {
    color: black;
    cursor: pointer;
}
</style>
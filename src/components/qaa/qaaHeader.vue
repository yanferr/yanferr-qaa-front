<template>
    <!-- 暗黑模式
        el-header   background-color:#282828
        .header-row-hover:hover { color: white; }
        el-row style="color:#b2bebb;"
    -->
    <div class="el-header">
        <el-row style="color:#5c5c63;font-size:medium;line-height: 50px;">
            <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>
            <!-- <el-col :span="1">
                
            </el-col> -->
            <el-col :xs="21" :sm="21" :md="20" :lg="12" :xl="12">
                <span><img style="height: 30px;transform:translate(20%,24%);" src="../../assets/yanferr.png" /></span>
                <span class="header-row-hover" style="margin-left:30px"> <router-link to="/">记录</router-link></span>
                <span class="header-row-hover" style="margin-left:30px"> <router-link to="/task">任务</router-link></span>
                <span class="header-row-hover" style="margin-left:30px">竞赛</span>
                <span class="header-row-hover" style="margin-left:30px">讨论</span>
                <span class="header-row-hover" style="margin-left:30px">求职</span>
                <span class="header-row-hover" style="margin-left:30px">商店</span>
            </el-col>
            <el-col :xs="3" :sm="3" :md="2" :lg="4" :xl="4">
                <div style="float:right;margin-left:30px">
                    <el-avatar class="header-row-hover" size="small" style="transform:translate(0%,20%);"
                        src="../../assets/touxiang.png" />
                </div>
                <div style="float:right">
                    <el-badge is-dot style="transform:translate(20%,30%);">
                        <span class="header-row-hover"><img style="height: 21px;transform:translate(20%,-56%);"
                                src="../../assets/tixing.svg" /></span>
                    </el-badge>
                </div>
            </el-col>

            <el-col :xs="0" :sm="0" :md="1" :lg="4" :xl="4"></el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>

</script>
<style>
.el-header {
    height: 50px;
    padding: 0;
    background-color: #ffffff;

    text-align:left;

    /* 流式布局 */
    flex-grow: 1;

    /* 阴影 */
    box-shadow: 0px 0.5px 4px rgba(0, 0, 0, 0.2), 0px 0px 50px rgb(255, 255, 255) inset;
}

a.router-link-active {
  color: inherit;
  text-decoration: none;
}
a.router-link-active:hover {
  color: inherit;
  text-decoration: none;
}

a, .green {
  color: #5c5c63;
}


.header-row-hover:hover {
    color: black;
    cursor: pointer;
    background-color: transparent;
}
a:hover {
  background-color: transparent;
}
</style>
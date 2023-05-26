<template>
    <el-divider />
    <div class="icp">{{ `© ${year} ${author} ` }}<a href="http://beian.miit.gov.cn/" target="_blank">{{ record }}</a></div>
</template>

<script lang="ts" setup>
let year = new Date().getFullYear();        // 一般都是最新的一年
let author = 'yanferr';					// 作者名
let record = '苏ICP备2023010341号-1';			// 备案号
</script>

<style>
.icp {
    padding: 0 0 10px 0;
    width: 100%;
    text-align: center;
    color: #bbbbbb;
}

.icp>a {
    color: #bbbbbb;
    text-decoration: none;
}

.icp>a:hover {
    color: black;
    text-decoration: none;
}
</style>

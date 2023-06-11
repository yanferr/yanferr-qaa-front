<template>
    <div class="progress-panel">
        <div class="header-row">
            <h2 style="text-align: left;">当前进度</h2>
            <div class="right-content">
                <p>这是一段示例文本。</p>
            </div>
        </div>

        <div class="content-wrapper">
            <div class="circle-progress">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="none" fill="none" />
                    <circle class="progress-circle" cx="50" cy="50" r="45" stroke="none" fill="none" />
                </svg>

                <div class="stats">
                    <div class="stat-item">
                        <span class="label">全部</span>
                        <span class="value solved-count">-</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">-------</span>
                        <span class="value total-count">-</span>
                    </div>
                    <div class="progress-percentage">-</div>
                </div>
            </div>
            <div class="section">
                <div class="upper-part">上半部分内容</div>
                <div class="lower-part">下半部分内容</div>
            </div>
            <div class="section">
                <div class="upper-part">上半部分内容</div>
                <div class="lower-part">下半部分内容</div>
            </div>
            <div class="section">
                <div class="upper-part">上半部分内容</div>
                <div class="lower-part">下半部分内容</div>
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
    document.addEventListener('DOMContentLoaded', function () {
        const solvedCount = 50; // 已解决问题数，根据实际情况修改
        const totalCount = 100; // 总问题数，根据实际情况修改

        const progressPercentage = (solvedCount / totalCount) * 100;
        const circleLength = 2 * Math.PI * 45; // 圆环长度，等于周长
        const progressLength = (circleLength * progressPercentage) / 100;

        document.querySelector('.solved-count').innerText = solvedCount;
        document.querySelector('.total-count').innerText = totalCount;
        document.querySelector('.progress-percentage').innerText = `${Math.round(progressPercentage)}%`;
        document.querySelector('.progress-circle').style.strokeDasharray = `${progressLength}, ${circleLength}`;
    });
})

</script>

<style scoped>
* {
    box-sizing: border-box;
}

.progress-panel {
    margin: 30px 0 0 30px;
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}

h2 {
    margin: 0 0 15px;
}

.label {
    color: #888;
}

.value {
    font-weight: bold;
}

.circle-progress {
    width: 300px;
    height: 200px;
    position: relative;
}


svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
}

circle {
    stroke-width: 4;
    stroke-linecap: round;
}

circle:nth-child(1) {
    stroke: #f5f5f5;
}

.progress-circle {
    stroke: #4caf50;
    stroke-dasharray: 0, 282.6;
    /* 282.6 = 2 * PI * 45 */
}


.stat-item {
    font-size: 14px;
    margin-right: 8px;
}

.stat-item:last-child {
    margin-right: 0;
}

/* ... */
.stats {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.stat-item {
    font-size: 14px;
}

.stat-item:last-child {
    margin-bottom: 0;
}

.label {
    display: block;
    color: #888;
    font-size: 12px;
}

.value {
    font-weight: bold;
    font-size: 16px;
}

.solved-count {
    font-size: 25px;
}

.progress-percentage {
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
    margin-top: 8px;
}

.content-wrapper {
    display: flex;
    align-items: center;
}

.side-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 24px;
    width: 100%;
}

.header-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
}

.header-row h2 {
    text-align: left;
}

.section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: calc(33.3333% - 8px);
    text-align: center;
}

.upper-part,
.lower-part {
    flex-basis: 50%;
}
</style>
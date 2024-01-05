<template>
    <!-- SP 监控页面 -->
    <div class=row>
        <template v-for="d in data">
            <v-card flat :title="d.title">
            <v-card-text>
                <v-data-table
                    :items="d.data"
                    :headers="d.headers"
                    density="compact"
                ></v-data-table>
            </v-card-text>
            </v-card>
        </template>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'SpMonitor',
    data() {
        return {
            pipelines:[],
            validSp: [],
            validSpCnt: [],
            errorTasks:[],
            data: [
                {
                    name: 'validChkSp',
                    api: 'validChkSp',
                    title: "SP计算的有效性检测结果",
                    data: [],
                    headers: [
                        {title: "SP名称", key: "procName"},
                        {title: "检测日期", key: "logdate"},
                        {title: "检测结果", key: "remark"},
                        {title: "检测时间", key: "updtDate"},
                    ]
                },
                {
                    name: "pipeline",
                    api: "pipeline",
                    title: "SP计算相关流水",
                    data: [],
                    headers: [
                        {title: "发生时间", key: "tradeDate"},
                        {title: "类别", key: "kind"},
                        {title: "主键", key: "keyId"},
                        {title: "备注", key: "remark"},
                    ]
                },
                {
                    name: "totalExec",
                    api: "totalExec",
                    title: "SP整体执行情况",
                    data: [],
                    headers: [
                        {title: "SP用户", key: "SP_OWNER"},
                        {title: "状态", key: "FLAG"},
                        {title: "任务数量", key: "CNT"},
                        {title: "开始时间", key: "START_TIME"},
                        {title: "结束时间", key: "END_TIME"},
                        {title: "运行耗时", key: "RUN_TIME"},
                    ]
                },
                {
                    name: "errorTasks",
                    api: "errorTasks",
                    title: "特殊任务：报错、重跑",
                    data: [],
                    headers: [
                        {title: "状态", key: "SPNAME"},
                        {title: "剩余次数", key: "FLAG"},
                        {title: "开始时间", key: "RETRY_CNT", cellProps: ({value}) => ({class: value > 0 ? 'bg-warning': ''})},
                        {title: "结束时间", key: "START_TIME"},
                        {title: "前置数据源", key: "END_TIME"},
                        {title: "运行频率", key: "RUN_FREQ"},
                    ]
                }
            ]
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            for(const row in this.data) {
                axios.get('/sp/' + this.data[row].api).then(res => {this.data[row].data = res.data});
            }
        }
    }
}
</script>
<style>

</style>
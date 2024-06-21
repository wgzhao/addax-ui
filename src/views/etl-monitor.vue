<template>
    <!-- 采集监控 -->
        <template v-for="d in data">
            <div class="v-row">
                <div class="v-col col-12">
            <v-card flat :title="d.title">
                <v-card-text>
                    <v-data-table :items="d.data" :headers="d.headers" density="compact" :sort-by="d.sortBy">
                    </v-data-table>
                </v-card-text>
            </v-card>
            </div>
            </div>
        </template>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {etlService} from '@/service/etlService'

const data = ref([
    {
        name: "accomplishList",
        api: "accomplishList",
        title: "数据源完成情况",
        data: [],
        sortBy: [{ key: "overPrec", order: "asc" }],
        headers: [
            { title: "启动", key: "dbStart" },
            { title: "数据源", key: "sysname" },
            {
                title: "整体情况", value: "",
                children: [
                    { title: "总数", key: "totalCnt" },
                    { title: "完成数", key: "overCnt" },
                    {
                        title: "完成率", key: "overPrec",
                        value: item => `${Math.round(item.overPrec * 100, 2)}%`,
                        cellProps: ({ value }) => ({ class: value == '100%' ? 'text-success' : 'text-warning' }),
                    },
                    { title: "运行", key: "runCnt" },
                    { title: "错误", key: "errCnt" },
                    { title: "未执行", key: "noCnt" },
                    { title: "未建表", key: "waitCnt" },
                ]
            },
            {
                title: "T-1 日", value: "",
                children: [
                    { title: "开始时间", key: "startTimeLtd" },
                    { title: "结束时间", key: "endTimeLtd" },
                    { title: "耗时(秒)", key: "runtimeLtd" }]
            },
            {
                title: "T 日", value: "",
                children: [
                    { title: "开始时间", key: "startTimeTd" },
                    { title: "结束时间", key: "endTimeTd" },
                    { title: "耗时", key: "runtimeTd" }]
            },
        ]
    },
    {
        name: "specialTask",
        api: "specialTask",
        title: "特殊任务提醒：错误、耗时过长、有重试、有拒绝行",
        data: [],
        sortBy: [{ key: "RUNTIME", order: "desc" }],
        headers: [
            { title: "任务名", key: "SPNAME" },
            { title: "状态", key: "FLAG" },
            { title: "剩余", key: "RETRY_CNT" },
            { title: "耗时", key: "RUNTIME", cellProps: ({ value }) => ({ class: value > 1000 ? 'text-warning' : '' }) },
            { title: "开始时间", key: "START_TIME" },
            { title: "结束时间", key: "END_TIME" },
        ]
    },
    {
        name: "rejectTask",
        api: "rejectTask",
        title: "采集拒绝行信息",
        data: [],
        sortBy: [{ key: "totalErr", order: "desc" }],
        headers: [
            { title: "任务名称", key: "jobname" },
            { title: "拒绝行", key: "totalErr" },
            { title: "拒绝行", key: "startTs" },
            { title: "拒绝行", key: "endTs" },
        ]
    },
    {
        name: "realtimeTask",
        api: "realtimeTask",
        title: "日间实时采集任务执行情况(最近1小时)",
        data: [],
        sortBy: [],
        headers: [
            { title: "最近一次", key: "LAST_TIMES" },
            { title: "下一次", key: "NEXT_TIMES" },
            { title: "任务名称", key: "SPNAME" },
            { title: "开始时间", key: "START_TIME" },
            { title: "结束时间", key: "END_TIME" },
        ]
    }
])


const getData = async () => {
    data.value[0]['data'] = etlService.fetchAccomplishList();
    data.value[1]['data'] = etlService.fetchSpecialTask();
    data.value[2]['data'] = etlService.fetchRejectTask();
    data.value[3]['data'] = etlService.fetchRealtimeTask();
}

onMounted(() => {
    getData()
})
</script>
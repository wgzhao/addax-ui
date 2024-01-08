<template>
    <!-- 数据服务 -->
    <v-card title="主表配置 -- 数据服务">
        <v-card-text>
            <div class="row">
                <v-data-table-virtual :items="data" :headers="headers" density="compact" height="300">
                    <template v-slot:item.action="{ item }">
                        <!-- add link for selectOption -->
                        <template v-for="act in actionList">
                            <v-btn class="m-1 p-0 btn btn-outline-primary" @click="doAction(item.dsId, act.comp)">
                                {{ act.title }}
                            </v-btn>
                        </template>
                    </template>
                </v-data-table-virtual>
            </div>
            <div class="row">
                <component :is="curComp" :d="param" :key="key"></component>
            </div>

        </v-card-text>
    </v-card>
</template>
<script setup>
import axios from 'axios';
import {ref, onMounted, markRaw } from 'vue'
// import components

import MainTableInfo from '@/components/dataservice/MainTableInfo.vue'
import DSTableDetail from '@/components/dataservice/DSTableDetail.vue'
const data = ref([])
const param = ref(null)
const key = ref(null)
const curComp = ref(null)   
const mti = markRaw(MainTableInfo)
const dst = markRaw(DSTableDetail)
const headers = ref([
                { title: "目标系统", value: "destSysid" },
                { title: "频率", value: "runFreq" },
                { title: "任务组", value: "taskGroup" },
                { title: "名称", value: "dsName" },
                { title: "状态", value: "flag" },
                { title: "剩余", value: "retryCnt" },
                { title: "开始时间", value: "startTime" },
                { title: "结束时间", value: "endTime" },
                { title: "耗时", value: "runtime" },
                { title: "操作", value: "action", "sortable": false },
            ])   
const actionList = ref([
    {comp: mti, title: "主表信息"},
    {comp: dst, title: "推送表"},
    {comp: "ScheduleLog", title:"调度日志"}
        ])   
const fetchData = ()  => {
            axios.get('/maintable/dataService/list').then(res => { data.value = res.data });
        }

const  doAction = (val, comp) => {
            key.value = val
            curComp.value = comp
            param.value = val
        }
onMounted(() => {
   fetchData() 
})
</script>
<style></style>
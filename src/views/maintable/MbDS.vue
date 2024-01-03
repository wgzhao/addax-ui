<template>
    <!-- 数据服务 -->
    <div class="row">
            <v-data-table-virtual
    :items = "data"
    :headers = "headers"
    density = "compact"
    height="300"
    >
    <template v-slot:item.action="{ item }">
                        <!-- add link for selectOption -->
                        <template v-for="l in actionList">
                            <v-btn class="m-1 p-0 btn btn-outline-primary" @click="doAction(item, l.value)">
                            {{ l.text }}
                            </v-btn>
                        </template>
                    </template>
    </v-data-table-virtual>
        </div>
        <div class="row">
            <component :is="dynamicComponent" :d="item"></component>
        </div>

</template>
<script>
import axios from 'axios';

// import components

import MainTableInfo from '@/components/dataservice/MainTableInfo.vue'
import DSTableDetail from '@/components/dataservice/DSTableDetail.vue'
export default {
    data() {
        return {
            data: [],
            item: [],
            dynamicComponent: null,
            headers: [
                {title: "目标系统", value: "destSysid"},
                {title: "频率", value: "runFreq"},
                {title: "任务组", value: "taskGroup"},
                {title: "名称", value: "dsName"},
                {title: "状态", value: "flag"},
                {title: "剩余", value: "retryCnt"},
                {title: "开始时间", value: "startTime"},
                {title: "结束时间", value: "endTime"},
                {title: "耗时", value: "runtime"},
                {title: "操作", value: "action", "sortable": false },
            ],
            actionList: [
                { text: "主表信息", value: "MainTableInfo" },
                { text: "推送表", value: "DSTableDetail" },
                { text: "调度日志", value: "ScheduleLog" },
            ],
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios.get('/maintable/dataService/list').then(res => {this.data = res.data});
        },
        doAction(val, comp) {
            if (comp == 'MainTableInfo') {
                axios.get('/maintable/dataService/detail/' + val.dsId).then(res => {this.item = res.data} );
            }
            else if (comp == 'DSTableDetail') {
                axios.get('/maintable/dataService/dsTable/' + val.dsId).then(res => {this.item = res.data});
            }

            this.dynamicComponent = comp;
        }
    },
    components: {MainTableInfo, DSTableDetail}
}
</script>
<style>
    
</style>
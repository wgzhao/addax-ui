<template>
    <!-- 数据服务推送表详情 -->
    <v-card flat title="推送表--新版">
        <v-data-table
        :items="data"
        :headers="dsHeaders"
        density="compact">
    </v-data-table>
    </v-card>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios';
const props = defineProps(['d'])
const search=ref()
const data = ref([])
const dsHeaders = ref([
            {title: "ID", value: "tblId"},
            {title: "目标库用户", value: "destOwner"},
            {title: "目标库表名", value: "destTablename"},
            {title: "源库的表或查询脚本", value: "souTable"},
            {title: "源筛选条件(trino置空筛选logdate)", value: "souFilter", width:"10%"},
            {title: "前置SQL", value: "preSql"},
            {title: "后置SQL", value: "postSql"},
            {title: "额外的字段映射<br>(多个字段用;分隔)", value: "colMap", width:"10%"},
            {title: "状态", value: "flag"},
            {title: "hdp", value: "souIshdp"},
            {title: "开始时间", value: "startTime"},
            {title: "结束时间", value: "endTime"},
            {title: "配置信息", value:"Action"}
            ])
const fetchData = () => {
    axios.get('/maintable/dataService/dsTable/' + props.d)
    .then(res => { data.value = res.data; return res.data; });
}

fetchData()
</script>
<style>
    
</style>
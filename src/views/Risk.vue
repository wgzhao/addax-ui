<template>
    <!-- 风险点监测-->

        <v-card title="系统风险检测结果">
            <v-card-text>
            <v-data-table :items="sysRisk" :headers="sysRiskHeaders" items-per-page="30" density="compact">
            </v-data-table>
        </v-card-text>
    </v-card>


        <v-card flat title="ODS采集源库的字段变更提醒(T-1日结构与T日结构对比)">
            <v-data-table :items="odsFieldChange" :headers="odsFieldChangeHeaders" items-per-page="10" density="compact"
                item-value="name" class="table table-borderless table-sm">
            </v-data-table>
        </v-card>



        <v-card flat title="短信发送情况">
            <template v-slot:text>
                <v-text-field density="compact" v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
                    variant="outlined" hide-details></v-text-field>
            </template>
            <v-data-table :items="smsDetail" :headers="smsDetailHeaders" items-per-page="20" density="compact"
                :search="search">
            </v-data-table>
        </v-card>

</template>
<script setup>
import axios from 'axios';
import { ref, onUnmounted } from 'vue';

// 系统风险
const sysRisk = ref([]);

const sysRiskHeaders = [
    { title: "类别", key: "chkKind" },
    { title: "名称", key: "chkName" },
    { title: "风险提示", key: "chkContent" },
];

// ods采集源库的字段变更提醒
const odsFieldChange = ref([]);

const odsFieldChangeHeaders = [
    { title: "连接名", key: "souDbConn" },
    { title: "用户名", key: "owner" },
    { title: "表名", key: "tableName" },
    { title: "字段名  ", key: "columnName" },
    {
        title: "变更详情", value: "changed", align: "center",
        children: [
            { title: "类型", key: "dataType", value: item => `${item.dataTypeLast} -> ${item.dataType}` },
            { title: "长度", key: "dataLen", value: item => `${item.dataLengthLast} -> ${item.dataLength}` },
            { title: "精度", key: "dataPrec", value: item => `${item.dataPrecisionLast} -> ${item.dataPrecision}` },
            { title: "小数位", key: "dataScale", value: item => `${item.dataScaleLast} -> ${item.dataScale}` }
        ]
    },
    { title: "现状更新时间", key: "dwCltDate" },
    { title: "升级前更新时间", key: "dwCltDateLast" },
];

// 短信发送情况
const search = ref(null);
const smsDetail = ref([]);
const smsDetailHeaders = [
    {
        title: "短信内容", value: "msg", width: "70%",
        cellProps: ({ value }) => ({ class: value.includes('失败') ? 'bg-danger' : '' })
    },
    { title: "发送时间", value: "dwCltDate" }
];

// 获取数据
const fetchData = () => {
    axios.get('/risk/sysRisk').then(res => {
        sysRisk.value = res.data;
    });
    axios.get('/risk/odsFieldChange').then(res => {
        odsFieldChange.value = res.data;
    });
    axios.get('/risk/smsDetail').then(res => {
        smsDetail.value = res.data;
    });
}

const timer = setInterval(() => {
    fetchData();
}, 1000 * 60 * 1);

onUnmounted(() => {
    clearInterval(timer);
});

fetchData();
</script>
<style></style>
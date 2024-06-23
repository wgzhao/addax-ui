<template>
    <!-- 风险点监测-->
    <template v-for="t in titles">
        <div class="v-row">
            <div class="v-col v-col-12">
                <v-card :title="t.title">
                    <v-card-text>
                    <template v-slot:text v-if="t.item == 'smsDetail'">
                        <v-text-field density="compact" v-model="search" label="Search" prepend-inner-icon="mdi-magnify"
                            single-line variant="outlined" hide-details></v-text-field>
                    </template>
                    <v-data-table :items="data[t.item]" :headers="headers[t.item]" items-per-page="30" density="compact">
                    </v-data-table>
                </v-card-text>
                </v-card>
            </div>
        </div>
    </template>
</template>
<script setup>
import RiskService from '@/service/riskService'

import { ref, onUnmounted } from 'vue';

const titles = [
    { item: "sysRisk", title: "系统风险检测结果" },
    { item: "odsFieldChange", title: "ODS采集源库的字段变更提醒(T-1日结构与T日结构对比)" },
    { item: "smsDetail", title: "短信发送情况" },
]

const data = ref({
    sysRisk: [],
    odsFieldChange: [],
    smsDetail: [],
}
)
const headers = {
    sysRisk: [
        { title: "类别", key: "chkKind" },
        { title: "名称", key: "chkName" },
        { title: "风险提示", key: "chkContent" },
    ],
    odsFieldChange: [
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
    ],
    smsDetail: [
        {
            title: "短信内容", value: "msg", width: "70%",
            cellProps: ({ value }) => ({ class: value.includes('失败') ? 'bg-danger' : '' })
        },
        { title: "发送时间", value: "dwCltDate" }
    ],
}
// 系统风险


// 短信发送情况
const search = ref(null);

// 获取数据
const fetchData = () => {
    RiskService.sysRisks().then(res => {
        data.value['sysRisk'] = res.data;
        // sysRisk.value = res.data;
    });
    RiskService.fieldsChanges().then(res => {
        data.value['odsFieldChange'] = res.data;
        // odsFieldChange.value = res.data;
    });
    RiskService.smsDetails().then(res => {
        data.value['smsDetail'] = res.data;
        // smsDetail.value = res.data;
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
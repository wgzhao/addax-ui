<template>
    <!-- 风险点监测-->
    <div class="row">
        <v-card title="系统风险检测结果">
            <v-card-text>
            <v-data-table :items="sysRisk" :headers="sysRiskHeaders" items-per-page="30" density="compact">
            </v-data-table>
        </v-card-text>
    </v-card>
    </div>
    <div class="row">
        <v-card flat title="ODS采集源库的字段变更提醒(T-1日结构与T日结构对比)">
            <v-data-table :items="odsFieldChange" :headers="odsFieldChangeHeaders" items-per-page="10" density="compact"
                item-value="name" class="table table-borderless table-sm">
            </v-data-table>
        </v-card>
    </div>
    <div class="p-2"></div>
    <div class="row">
        <v-card flat title="短信发送情况">
            <template v-slot:text>
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
                    variant="outlined" hide-details></v-text-field>
            </template>
            <v-data-table :items="smsDetail" :headers="smsDetailHeaders" items-per-page="20" density="compact"
                :search="search">
            </v-data-table>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'Risk',
    data() {
        return {
            sysRisk: [],
            odsFieldChange: [],
            smsDetail: [],
            search: null,
            sysRiskHeaders: [
                { title: "类别", key: "chkKind" },
                { title: "名称", key: "chkName" },
                { title: "风险提示", key: "chkContent" },
            ],
            odsFieldChangeHeaders: [
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
            smsDetailHeaders: [
                {
                    title: "短信内容", value: "msg", width: "70%",
                    cellProps: ({ value }) => ({ class: value.includes('失败') ? 'bg-danger' : '' })
                },
                { title: "发送时间", value: "dwCltDate" }
            ]

        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('/risk/sysRisk').then(res => {
                this.sysRisk = res.data;
            });
            axios.get('/risk/odsFieldChange').then(res => {
                this.odsFieldChange = res.data;
            });
            axios.get('/risk/smsDetail').then(res => {
                this.smsDetail = res.data;
            });
        }
    }


}
</script>
<style></style>
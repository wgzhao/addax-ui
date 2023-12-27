<template>
    <!-- 风险点监测-->
    <div class="row">
        <div class="col-5 col-ms">
            <div class="header text-center">
                <h5>系统风险检测结果</h5>
            </div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead>
                    <th>类别</th>
                    <th>名称</th>
                    <th>风险提示</th>
                </thead>
                <tbody>
                    <template v-for="d in sysRisk">
                        <tr>
                            <td>{{ d.chkKind }}</td>
                            <td>{{ d.chkName }}</td>
                            <td>{{ d.chkContent }}</td>
                        </tr>
                    </template>
                </tbody>
                </table>
        </div>
        <div class="col-7 col-ms">
            <div class="header text-center">
                <h5>ODS采集源库的字段变更提醒(T-1日结构与T日结构对比)</h5>
            </div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead class="text-center align-middle">
                    <th>连接名</th>
                    <th>用户名</th>
                    <th>表名</th>
                    <th>字段名</th>
                    <th colspan="4" class="text-wrapper">升级前 (data_type,data_length,data_precision,data_scale)</th>
                    <th colspa="4" class="text-wrapper">现状 (data_type,data_length,data_precision,data_scale)</th>
                    <th>现状更新时间</th>
                    <th>升级前更新时间</th>
                </thead>
                <tbody>
                    <template v-for="d in odsFieldChange">
                        <tr>
                            <td>{{ d.souDbConn }}</td>
                            <td>{{ d.owner }}</td>
                            <td>{{ d.tableName }}</td>
                            <td>{{ d.columnName }}</td>
                            <td>{{ d.dataType }}</td>
                            <td>{{ d.dataTypeLast }}</td>
                            <td>{{ d.hiveType }}</td>
                            <td>{{ d.hiveTypeLast }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
    <div class="p-2"></div>
    <div class="row">
        <div class="col-6 col-ms">
            <div class="header text-center">
                <h5>短信发送情况</h5>
            </div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead class="text-center align-middle">
                    <th>短信内容</th>
                    <th>发送时间</th>
                </thead>
                <tbody>
                    <template v-for="d in smsDetail">
                        <tr>
                            <td>{{ d.msg }}</td>
                            <td>{{ d.dwCltDate }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
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
<style>
    
</style>
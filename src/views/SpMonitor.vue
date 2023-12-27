<template>
    <!-- SP 监控页面 -->
    <div class=row>
        <div class="col-sm-6">
            <div class="row">
                <!-- bar chart-->
            </div>
            <div class="row">
                <div class="header text-center">SP计算的有效性检测结果</div>
                <table class="table table-stripped table-sm">
                    <thead>
                        <th>SP名称</th>
                        <th>检测日期</th>
                        <th>检测结果</th>
                        <th>检测时间</th>
                    </thead>
                    <tbody>
                        <template v-for="d in validSp">
                        <tr>
                            <td>{{ d.procName }}</td>
                            <td>{{ d.logdate}}</td>
                            <td>{{ d.remark }}</td>
                            <td>{{ d.updtDate }}</td>
                        </tr>
                        </template>
                    </tbody>
                </table>
            </div>

            <div class="row">
                <div class="header text-center">SP计算的记录数检测结果</div>
                <table class="table table-stripped table-sm">
                    <thead>
                        <th>SP名称</th>
                        <th>检测日期</th>
                        <th>源表记录数</th>
                        <th>目标表记录数</th>
                    </thead>
                    <tbody>
                        <template v-for="d in validSpCnt">
                        <tr>
                            <td>{{  d.procName }}</td>
                            <td>{{ d.logdate}}</td>
                            <td>{{ d.souCnt }}</td>
                            <td>{{ d.destCnt }}</td>
                        </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="header"><h3>SP计算相关流水</h3></div>
            </div>
            <div class="row">
                    <div class="header text-center"><h3>SP整体执行情况</h3></div>
                    <table class="table table-stripped table-sm">
                        <thead>
                            <th>SP用户</th>
                            <th>状态</th>
                            <th>任务数量</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>运行耗时</th>
                        </thead>
                        <tbody>
                            <template v-for="d in validSpCnt">
                            <tr>
                                <td>{{ d.SP_OWNER }}</td>
                                <td>{{ d.FLAG }}</td>
                                <td>{{ d.CNT }}</td>
                                <td>{{ d.START_TIME }}</td>
                                <td>{{ d.END_TIME }}</td>
                                <td>{{ d.RUN_TIME }}</td>
                            </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="header text-center"><h3>特殊任务：报错、重跑</h3></div>
                    <table class="table table-stripped table-sm">
                        <thead>
                            <th class="w-20">名称</th>
                            <th>状态</th>
                            <th>剩余次数</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>前置数据源</th>
                            <th>运行频率</th>
                        </thead>
                        <tbody>
                            <template v-for="d in errorTasks">
                                <tr :class="d.RETRY_CNT > 0 ? 'table-info': ''">
                                <td>{{ d.SPNAME }}</td>
                                <td>{{ d.FLAG }}</td>
                                <td>{{ d.RETRY_CNT }}</td>
                                <td>{{ d.START_TIME }}</td>
                                <td>{{ d.END_TIME }}</td>
                                <td>{{ d.NEED_SOU }}</td>
                                <td>{{ d.RUN_FREQ }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
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
            errorTasks:[]
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            axios.get("/sp/validChkSp").then(resp => this.validSp = resp.data);
            axios.get("/sp/totalExec").then(resp => this.validSpCnt = resp.data);
            axios.get("/sp/errorTasks").then(resp => this.errorTasks = resp.data);
        }
    }
    
}
</script>
<style>
    
</style>
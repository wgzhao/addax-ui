<template>
    <!-- 任务组监控 -->
    <div class="row">
        <div class="col-4 col-sm">
            <div class="header text-center">
                <h5>生成任务组的任务</h5>
            </div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead>
                    <tr class="text-center">
                        <th rowspan="2" class="align-middle">任务组</th>
                        <th rowspan="2" class="align-middle">所属类别</th>
                        <th rowspan="2" class="align-middle">存在标志</th>
                        <th rowspan="2" class="align-middle">标志生成时间</th>
                        <th rowspan="2">总数</th>
                        <th colspan="4">运行成功的任务情况</th>
                        <th colspan="2">正在执行的任务情况</th>
                        <th colspan="2">其他任务数</th>
                    </tr>
                    <tr class="text-center">
                        <th>任务数</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>运行耗时</th>
                        <th>正在执行</th>
                        <th>开始时间</th>
                        <th>未执行</th>
                        <th>执行失败</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="d in totalExecs">
                        <tr>
                            <td>{{ d.taskGroup }}</td>
                            <td>{{ d.kind }}</td>
                            <td>{{ d.bflag }}</td>
                            <td>{{ d.flagTime }}</td>
                            <td>{{ d.allcnt }}</td>
                            <td>{{ d.ycnt }}</td>
                            <td>{{ d.startTime }}</td>
                            <td>{{ d.endTime }}</td>
                            <td>{{ d.runtime }}</td>
                            <td>{{ d.rcnt }}</td>
                            <td>{{ d.startTimeR }}</td>
                            <td>{{ d.ncnt }}</td>
                            <td>{{ d.ecnt }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="col-5 col-sm">
            <div class="header text-center">
                <h5>任务组调起的后续服务</h5>
            </div>
            <table class="table table-stripped table-bordered table-hover table-sm mb-1 p-0">
                <thead>
                    <tr class="text-center">
                        <th rowspan="2" class="align-middle">类别</th>
                        <th rowspan="2" class="align-middle">类别</th>
                        <th colspan="3">任务执行情况</th>
                        <th rowspan="2" class="align-middle">错误提醒</th>
                    </tr>
                    <tr>
                        <th>执行状态</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="d in totalExecs">
                        <tr class="text-center">
                            <td>{{ d.kind2 }}</td>
                            <td class="text-wrapper w-20" width="10%">{{ d.dsName }}</td>
                            <td>{{ d.flag2 }}</td>
                            <td>{{ d.startTime2 }}</td>
                            <td>{{ d.endTime2 }}</td>
                            <td>{{ d.errmsg }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="col-3 col-sm">
            <div class="header text-center">任务组生成时间</div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead>
                    <tr class="text-center">
                        <th>任务组</th>
                        <th>生成时间</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="d in flagGenTimes">
                        <tr class="text-center">
                            <td>{{ d.fid }}</td>
                            <td>{{ d.dwCltDate }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <div class="p-2"></div>

    <div class="row">
        <div class="col-4 col-sm">
            <div class="header text-center"><h5>数据服务执行情况</h5></div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead>
                    <th>任务组</th>
                    <th>服务名称</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>耗时</th>
                    <th>完成率</th>
                    <th>正在推送的表 </th>
                </thead>
                <tbody>
                    <template v-for="d in dataServiceExecTime">
                        <tr>
                            <td>{{ d.TASK_GROUP }}</td>
                            <td>{{ d.DS_NAME }}</td>
                            <td>{{ (new Date(d.START_TIME)).toLocaleString() }}</td>
                            <td>{{ (new Date(d.END_TIME)).toLocaleString() }}</td>
                            <td>{{ d.RUNTIME }}</td>
                            <td>{{ d.PREC }}</td>
                            <td>{{ d.DEST_TABLENAME }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="col-4 col-sm">
            <div class="header text-center"><h5>数据服务执行时间超长</h5></div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead>
                    <th>类别</th>
                    <th>名称</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>耗时</th>
                </thead>
                <tbody>
                    <template v-for="d in dataServiceExecTimeout">
                        <tr>
                            <td>{{ d.KIND }}</td>
                            <td>{{ d.DS_NAME }}</td>
                            <td>{{ d.START_TIME }}</td>
                            <td>{{ d.END_TIME }}</td>
                            <td>{{ d.RUNTIME }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="col-4 col-sm">
            <div class="header text-center"><h5>按照目标系统的任务完成情况</h5></div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead>
                    <th>系统名称</th>
                    <th>总任务数</th>
                    <th>今日任务</th>
                    <th>已完成数</th>
                    <th>错误数</th>
                </thead>
                <tbody>
                    <template v-for="d in targetComplete">
                        <tr>
                            <td>{{ d.DEST_SYSNAME }}</td>
                            <td>{{ d.TOTAL_CNT }}</td>
                            <td>{{ d.TD_TASK }}</td>
                            <td>{{ d.TD_OK }}</td>
                            <td>{{ d.TD_ERR }}</td>
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
    name: 'TaskGroup',
    data() {
        return {
            totalExecs: [],
            flagGenTimes: [],
            dataServiceExecTime: [],
            dataServiceExecTimeout: [],
            targetComplete: [],
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios.get('/taskGroup/totalExec').then(resp => {
                this.totalExecs = resp.data
            });
            axios.get('/taskGroup/flagGenTime').then(resp => {
                this.flagGenTimes = resp.data
            });
            axios.get('/taskGroup/dataServiceExecTime').then(resp => {
                this.dataServiceExecTime = resp.data
            });
            axios.get('/taskGroup/dataServiceExecTimeout').then(resp => {
                this.dataServiceExecTimeout = resp.data
            });
            axios.get('/taskGroup/targetComplete').then(resp => {
                this.targetComplete = resp.data
            });
        }
    }

}
</script>
<style></style>
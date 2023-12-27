<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="header text-center"><h4>数据源完成情况</h4></div>
                <table class="table table-bordered table-striped table-sm m-1" >
                    <thead>
                        <tr class="text-center">
                            <th colspan="2">数据源</th>
                            <th colspan="7">整体情况</th>
                            <th colspan="3">T-1 日</th>
                            <th colspan="3">T 日</th>
                        </tr>
                        <tr class="text-center">
                            <th>启动</th>
                            <th>数据源</th>
                            <th>总数</th>
                            <th>完成数</th>
                            <th>完成率</th>
                            <th>运行</th>
                            <th>错误</th>
                            <th>未执行</th>
                            <th>未建表</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>耗时(Sec)</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                            <th>耗时</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="d in impEtlOverprec">
                            <tr :class=" d.overPrec >= 1 ? 'table-success': 'table-warning'">
                                <td>{{ d.dbStart }}</td>
                                <td>{{ d.sysname }}</td>
                                <td>{{ d.totalCnt }}</td>
                                <td>{{ d.overCnt }}</td>
                                <td>{{ Math.round(d.overPrec * 100,2) }}%</td>
                                <td>{{ d.runCnt }}</td>
                                <td>{{ d.errCnt }}</td>
                                <td>{{ d.noCnt }}</td>
                                <td>{{ d.waitCnt }}</td>
                                <td>{{ d.startTimeLtd }} </td>
                                <td>{{ d.endTimeLtd }}</td>
                                <td>{{ d.runtimeLtd }}</td>
                                <td>{{ d.startTimeTd  }}</td>
                                <td>{{ d.endTimeTd  }}</td>
                                <td>{{ d.runtimeTd  }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
        </div>
    </div>
    <div class="p-2" ></div>
    <div class="row">
        <div class="col-sm-12">
            <div class="header text-center"><h4>特殊任务提醒：错误、耗时过长、有重试、有拒绝行</h4></div>

            <div class="adv-table">
                <table class="table table-striped table-ms">
                    <thead>
                        <tr>
                            <th>任务名</th>
                            <th>状态</th>
                            <th>剩余</th>
                            <th>耗时</th>
                            <th>开始时间</th>
                            <th>结束时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="d in specialTasks" >
                        <tr>
                            <td>{{ d.SPNAME }}</td>
                            <td>{{ d.FLAG }}</td>
                            <td>{{ d.RETRY_CNT }}</td>
                            <td><span :class=" d.RUNTIME  > 1000 ? 'bg-warning': ''" >{{ d.RUNTIME }}</span></td>
                            <td>{{ d.START_TIME }}</td>
                            <td>{{ d.END_TIME }}</td>
                        </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="p-2" ></div>
    <div class="row">
        <div class="col-sm-12">
            <div class="header text-center"><h4>采集拒绝行信息</h4></div>
            <table class="table table-sm">
                <thead>
                    <template v-for="item in rejectTasks['columns']">
                    <th>{{ item }}</th>
                    </template>
                </thead>
                <tbody>
                    <template v-for="d in rejectTasks['data']">
                    <tr>
                        <td>{{ d.jobname }}</td>
                        <td>{{ d.totalErr }}</td>
                        <td>{{ d.startTs }}</td>
                        <td>{{ d.endTs }}</td>
                    </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
    <div class="p-2" ></div>

    <div class="row">
        <div class="col-sm-12">
            <div class="header text-center"><h4>日间实时采集任务执行情况(最近1小时>)</h4></div>
            <table class="table table-sm">
                <thead>
                    <th>最近一次</th>
                    <th>下一次</th>
                    <th>任务名称</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                </thead>
                <tbody>
                    <template v-for="d in realtimeTasks">
                    <tr>
                        <td>{{ d.LAST_TIMES }}</td>
                        <td>{{ d.NEXT_TIMES}}</td>
                        <td>{{ d.SPNAME }}</td>
                        <td>{{ d.START_TIME }}</td>
                        <td>{{ d.END_TIME }}</td>
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
    data() {
        return {
            impEtlOverprec: [],
            specialTasks: [],
            realtimeTasks: [],
            rejectTasks: {
                "columns": ["任务名称", "拒绝行", "拒绝行", "拒绝行"],
                "data": []
            },
            currentPage: 1,
            totalPages: null,
            pageSize: 10,
            filters: {
                name: {value: '', keys: ['dbStart']}
            }
        }
    },
    created() {
        this.fetchEtlData()
    },

    filters: {
    },
    methods: {
        fetchEtlData() {
            axios.get('/etl/accomplishList')
                .then(resp => {
                    this.impEtlOverprec = resp.data
                    this.totalPages = Math.floor(this.impEtlOverprec.length / this.pageSize);
                    return resp
                })
                .catch(error => {
                    return error
                });

            axios.get('/etl/specialTask').then(resp => this.specialTasks = resp.data);
            axios.get('/etl/realtimeTask').then(resp => this.realtimeTasks = resp.data);
            axios.get('/etl/taskReject').then(resp => this.rejectTasks["data"] = resp.data);
        },

        formatDate(value) {
            return new Date(value).toLocaleDateString('zh-CN', 'YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>

    <!-- <div class="row">
        <VTable :data="impEtlOverprec" :pageSize="pageSize" 
            :currentPage.sync="currentPage"
            @totalPagesChanged="totalPages = $event"
            :filters = "filters"
            >
            <template #head>
                <tr>
                    <th>启动</th>
                            <th>数据源</th>
                </tr>
            </template>
            <template #body="{rows}">
                <tr v-for="row in rows">
                    <td>{{ row.dbStart }}</td>
                    <td>{{  row.sysname }}</td>
                </tr>
            </template>
            </VTable>
            <VTPagination
                v-model:currentPage="currentPage"
                :total-pages="totalPages"
                :boundary-links="true"
            />
    </div> -->
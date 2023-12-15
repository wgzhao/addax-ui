<template>
    <div class="row">
        <div class="col-sm-12">
            <div class="header">数据源完成情况</div>
            <div class="adv-table">
                <table class="display table table-bordered table-striped" id="etl-complete-summary">
                    <thead>
                        <tr>
                            <th colspan="2">数据源</th>
                            <th colspan="7">整体情况</th>
                            <th colspan="3">T-1 日</th>
                            <th colspan="3">T 日</th>
                        </tr>
                        <tr>
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
                            <tr>
                                <td>{{ d.dbStart }}</td>
                                <td>{{ d.sysname }}</td>
                                <td>{{ d.totalCnt }}</td>
                                <td>{{ d.overCnt }}</td>
                                <td>{{ d.overPrec }}</td>
                                <td>{{ d.runCnt }}</td>
                                <td>{{ d.errCnt }}</td>
                                <td>{{ d.noCnt }}</td>
                                <td>{{ d.waitCnt }}</td>
                                <td>{{ formatDate(d.startTimeLtd) }} </td>
                                <td>{{ formatDate(d.endTimeLtd) }}</td>
                                <td>{{ d.runtimeLtd }}</td>
                                <td>{{ d.startTimeTd | formatDate }}</td>
                                <td>{{ d.endTimeTd | formatDate }}</td>
                                <td>{{ d.runtimeTd | formatDate }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <div class="header">特殊任务提醒：错误、耗时过长、有重试、有拒绝行</div>

            <div class="adv-table">
                <table class="display table table-bordered table-striped" id="etl-error-summary">
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
                        <tr>
                            <td>hadoop_ODSOA_ALBUMP</td>
                            <td>N</td>
                            <td>3</td>
                            <td>2000</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>hadoop_ODSCS_TEST</td>
                            <td>N</td>
                            <td>1</td>
                            <td>83</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            impEtlOverprec: []
        }
    },
    created() {
        this.fetchEtlData()
    },

    filters: {
    },
    methods: {
        fetchEtlData() {
            axios.get('/etl/list')
                .then(resp => {
                    this.impEtlOverprec = resp.data
                    return resp
                })
                .catch(error => {
                    return error
                })
        },

        formatDate(value) {
            return new Date(value).toLocaleDateString('zh-CN', 'YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>
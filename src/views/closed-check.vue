<template>
    <!-- 盘后检查 -->
    <div class="row">
        <div class="col-12">
            <div class="header text-center"><h4>采集表记录数异常</h4></div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead class="text-center">
                    <th>异常级别</th>
                    <th>表名</th>
                    <th>T-1记录数</th>
                    <th>T日记录数</th>
                    <th>记录比对差额</th>
                </thead>
                <tbody>
                    <template v-for="d in abnormalRecord">
                        <tr>
                            <td>{{ d.ERR_KIND }}</td>
                            <td>{{ d.TBLNAME }}</td>
                            <td>{{ d.CNT_LTD}}</td>
                            <td>{{ d.CNT_TD }}</td>
                            <td>{{ d.CNT_ERR }}</td>
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
            abnormalRecord: [],
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('/closeCheck/abnormalRecord').then(res => {
                this.abnormalRecord = res.data;
            });
        }
    }
}
</script>
<style>
    
</style>
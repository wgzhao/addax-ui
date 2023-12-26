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
                        <th>检测日期</th>
                        <th>检测时间</th>
                    </thead>
                    <tbody>
                        <template v-for="d in validSp">
                        <tr>
                            <td>{{  d.procName }}</td>
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

            </div>

        </div>
        <div class="col-sm-6">
            <div class="row">
                <div class="header"><h3>SP计算相关流水</h3></div>
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
        }
    },
    methods: {
        initData() {
            axios.get("impChkSp/validChkSp").then(resp => this.validSp = resp.data);

        }
    }
    
}
</script>
<style>
    
</style>
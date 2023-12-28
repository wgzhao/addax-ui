<template>
    <!-- 其他实时 -->
    <div class="row">
        <div class="col-12">
            <div class="header text-center"><h4>计划任务执行情况</h4></div>
            <table class="table table-stripped table-bordered table-hover table-sm">
                <thead class="text-center">
                    <th>计划类型</th>
                    <th>计划名称</th>
                    <th colspan="6">命令列表</th>
                </thead>
                <tbody>
                    <template v-for="d in planAll">
                        <tr>
                            <td>{{ d.pnTypeName }}</td>
                            <td>{{ d.spname }}</td>
                            <td>{{ d.c1 }}</td>
                            <td>{{ d.c2 }}</td>
                            <td>{{ d.c3 }}</td>
                            <td>{{ d.c4 }}</td>
                            <td>{{ d.c5 }}</td>
                            <td>{{ d.c6 }}</td>
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
    name: 'Realtime',
    data() {
        return {
            planAll: [],
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('/realtime/planAll').then(res => {
                this.planAll = res.data;
            });
        }
    }
    
}
</script>
<style>
    
</style>
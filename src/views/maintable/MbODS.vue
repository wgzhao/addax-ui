<template>
    <!-- 主表配置 -- ODS 采集配置-->
    <div class="row">
        <div class="col-6">
            <table class="table table-sm">
                <thead class="text-center">
                    <th>目标用户</th>
                    <th>系统名称</th>
                    <th>源用户</th>
                    <th>目标表名</th>
                    <th>状态</th>
                    <th>剩余</th>
                    <th>耗时</th>
                    <th with="30%">操作</th>
                </thead>
                <tbody>
                    <template v-for="d in ods">
                        <tr>
                            <td>{{ d.destOwner }}</td>
                            <td>{{ d.sysName }}</td>
                            <td>{{ d.souOwner }}</td>
                            <td>{{ d.destTablename }}</td>
                            <td>{{ d.flag }}</td>
                            <td>{{ d.retryCnt }}</td>
                            <td>{{ d.runtime }}</td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="mainTableInfo(d)">主表信息</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="">字段对比</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="">命令列表</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="">使用场景</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="">datax结果</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="">命令日志</button>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="">调度日志</button>
                            </td>
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
    name: 'MbODS',
    data() {
        return {
            ods: [],
            flag: "",
            filter: ""
        }
    },
    mounted() {
        this.fetchData();
    },
    computed: {
        filterOds() {
            const result = this.filter === ""
                ? this.ods
                : this.ods.filter(
                    wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                );
            return result;
        }
    },
    methods: {
        fetchData() {
            axios.get('/maintable/ods/list').then(res => {
                this.ods = res.data;
            });
        },
        filterOds() {
            const result = this.filter === ""
                ? this.ods
                : this.ods.filter(
                    wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                );
            return result;
        },
        mainTableInfo(d) {
            this.$router.push({ path: '/maintable/ods/info', query: { id: d.id } });
        }
    },
}
</script>
<style>
    
</style>
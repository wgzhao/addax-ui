<template >
    <!-- 数据中心采集及数据服务系统清单-->
    <!-- search input -->
    <div class="row">
        <div class="col-4">
            <div class="input-group mb-3">
                <input v-model="filter" class="form-control" placeholder="输入关键字" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" @click="fetchData">
                        <i class="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-5">
            <div class="header text-center">
                <h4>数据中心采集及数据服务系统清单</h4>
            </div>
            <table class="table table-striped table-bordered table-hover table-sm">
                <thead class="text-center">
                    <th>类别</th>
                    <th>系统编号</th>
                    <th>系统名称</th>
                    <th>连接串</th>
                    <th>登录用户</th>
                </thead>
                <tbody>
                    <template v-for="d in etlAndDs">
                        <tr class="text-wrap">
                            <td>{{ d.sysKind }}</td>
                            <td>{{ d.sysid }}</td>
                            <td>{{ d.sysName }}</td>
                            <td><code>{{ d.dbConstr }}</code></td>
                            <td>{{ d.dbUser }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="col-4">
            <div class="header text-center">
                <h4>数据中心采集表清单(显示100条)</h4>
            </div>
            <table class="table table-striped table-bordered table-hover table-sm">
                <thead class="text-center">
                    <th>系统名称</th>
                    <th>源用户</th>
                    <th>源表名</th>
                    <th>源表筛选</th>
                    <th>目标用户</th>
                    <th>目标表名</th>
                </thead>
                <tbody>
                    <template v-for="d in etlInfo">
                        <tr>
                            <td>{{ d.sysName }}</td>
                            <td>{{ d.souOwner }}</td>
                            <td>{{ d.souTablename }}</td>
                            <td><code>{{ d.souFilter }}</code></td>
                            <td>{{ d.destOwner }}</td>
                            <td>{{ d.destTablename }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div class="col-4">

            <div class="header text-center">
                <h4>数据中心数据推送表清单(显示100条)</h4>
            </div>
            <table class="table table-striped table-bordered table-hover table-sm">
                <thead class="text-center">
                    <th>任务组</th>
                    <th>目标表</th>
                    <th>推送开始时间</th>
                    <th>推送结束时间</th>
                </thead>
                <tbody>
                    <template v-for="d in dsInfo">
                        <tr>
                            <td>{{ d.DS_NAME }}</td>
                            <td>{{ d.TBLNAME }}</td>
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
    name: 'SystemInfo',
    data() {
        return {
            etlAndDs: [],
            etlInfo: [],
            dsInfo: [],
            filter: ''
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            if (this.filter !== '') {
                axios.get('/systemInfo/etlAndDs?q=' + this.filter).then(res => {
                    this.etlAndDs = res.data;
                });
                axios.get('/systemInfo/etlInfo?q=' + this.filter).then(res => {
                    this.etlInfo = res.data;
                });
                axios.get('/systemInfo/dsInfo?q=' + this.filter).then(res => {
                    this.dsInfo = res.data;
                });
            } else {
                axios.get('/systemInfo/etlAndDs').then(res => {
                    this.etlAndDs = res.data;
                });
                axios.get('/systemInfo/etlInfo').then(res => {
                    this.etlInfo = res.data;
                });
                axios.get('/systemInfo/dsInfo').then(res => {
                    this.dsInfo = res.data;
                });
            }
        }
    },
    computed: {
        filterEtlAndDs() {
            const result = this.filter === ""
                ? this.etlAndDs
                : this.etlAndDs.filter(
                    wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                );
            return result;
        },
        filterEtlInfo() {
            const result = this.filter === ""
                ? this.etlInfo
                : this.etlInfo.filter(
                    wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                );
            return result;
        },
        filterDsInfo() {
            const result = this.filter === ""
                ? this.dsInfo
                : this.dsInfo.filter(
                    wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                );
            return result;
        }
    }

}
</script>
<style ></style>
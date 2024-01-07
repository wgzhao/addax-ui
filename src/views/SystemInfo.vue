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
        <div class="header text-center">
            <h4>数据中心采集及数据服务系统清单</h4>
        </div>
        <v-data-table 
            :items="etlAndDs" 
            :headers="etlAndDsHeaders" 
            items-per-page="10" 
            density="compact"
            >
        </v-data-table>
    </div>

    <div class="row">
        <div class="header text-center">
            <h4>数据中心采集表清单(显示100条)</h4>
        </div>
        <v-data-table :items="etlInfo" :headers="etlInfoHeaders" items-per-page="10" density="compact">
        </v-data-table>
    </div>

    <div class="wo">

        <div class="header text-center">
            <h4>数据中心数据推送表清单(显示100条)</h4>
        </div>
        <v-data-table :items="dsInfo" :headers="dsInfoHeaders" items-per-page="20" density="compact">
        </v-data-table>
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
            filter: '',
            etlAndDsHeaders: [
                { title: "类别", key: "sysKind" },
                { title: "系统编号", key: "sysid" },
                { title: "系统名称", key: "sysName" },
                { title: "连接串", key: "dbConstr", cellProps: {class: "code"} },
                { title: "登录用户", key: "dbUser" },

            ],
            etlInfoHeaders: [
                { title: "系统名称", key: "sysName" },
                { title: "源用户", key: "souOwner" },
                { title: "源表名", key: "souTablename" },
                { title: "源表筛选", key: "souFilter" },
                { title: "目标用户", key: "destOwner" },
                { title: "目标表名", key: "destTablename" },
            ],
            dsInfoHeaders: [
                { title: "任务组", key: "DS_NAME" },
                { title: "目标表", key: "TBLNAME" },
                { title: "推送开始时间", key: "START_TIME" },
                { title: "推送结束时间", key: "END_TIME" },
            ]
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
<style scoped>
.v-table {
    font-size: 0.8rem;
}
</style>
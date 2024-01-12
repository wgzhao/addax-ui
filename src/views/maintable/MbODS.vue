<template>
    <!-- 主表配置 -- ODS 采集配置-->
    <div class="row">
        <div class="col-6">
            <v-card flat title="主表配置 - ODS 采集配置">
                <template v-slot:text>
                    <v-row justify="center" align="center">
                        <v-col cols="col-4">
                            <v-text-field v-model="search" density="compact" label="Search"
                                prepend-inner-icon="fa-solid fa-magnifying-glass" single-line variant="outlined"
                                hide-details></v-text-field>
                        </v-col>
                        <v-col cols="auto">
                            <button type="button" density="compact" class="btn btn-primary btn-sm"
                                @click="dynamicComponent = 'BatchAdd'">批量新增表</button>
                        </v-col>
                        <v-col cols="auto">
                            <button type="button" density="compact" class="btn btn-primary btn-sm"
                                @click="doEtl('source')">启动表更新</button>
                        </v-col>
                        <v-col cols="auto">
                            <button type="button" density="compact" class="btn btn-primary btn-sm"
                                @click="doEtl('sp')">启动采集</button>
                        </v-col>
                    </v-row>
                </template>
                <v-card-text>
                    <v-data-table density="default" :items="ods" :headers="headers" item-value="name" :search="search">
                        <template v-slot:item.action="{ item }">
                            <!-- add link for selectOption -->
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-dots-vertical" v-bind="props">
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item slim density="compact" v-for="(op, i) in selectOptions" :key="i"
                                        @click="doAction(item, op.value)">
                                        <v-list-item-title class="text-button">{{ op.text }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
        <div class="col-6">
            <component :is="dynamicComponent" :d="item"></component>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import MainTableInfo from '@/components/ods//MainTable.vue';
import FieldsCompare from '@/components/ods/FieldsCompare.vue';
import CmdList from '@/components/ods/CmdList.vue';
import TableUsed from '@/components/ods/TableUsed.vue';
import AddaxResult from '@/components/ods/AddaxResult.vue';
import BatchAdd from '@/components/ods/BatchAdd.vue';
import LogFiles from '@/components/ods/LogFiles.vue';

export default {
    name: 'MbODS',
    data() {
        return {
            ods: [],
            flag: "",
            filter: "",
            search: "",
            item: "",
            dynamicComponent: null,
            select: { text: "主表信息", value: "MainTableInfo" },
            selectOptions: [
                { text: "主表信息", value: "MainTableInfo" },
                { text: "字段对比", value: "FieldsCompare" },
                { text: "命令列表", value: "CmdList" },
                { text: "使用场景", value: "TableUsed" },
                { text: "addax结果", value: "AddaxResult" },
                { text: "命令日志", value: "LogFiles1" },
                { text: "调度日志", value: "LogFiles2" },
            ],
            rowSelect: null,
            groupBy: [
                {
                    key: "destOwner",
                    order: 'asc'
                },
                {
                    key: "sysName",
                    order: 'asc'
                },
                {
                    key: 'souOwner',
                    order: 'asc'
                },
            ],
            headers: [
                { "title": "目标用户", "align": "center", "sortable": false, "value": "destOwner" },
                { "title": "系统名称", "value": "sysName", align: "center" },
                { "title": "源用户", "value": "souOwner", align: "center" },
                { "title": "目标表名", "value": "destTablename", align: "center" },
                { "title": "状态", "value": "flag", align: "center" },
                { "title": "剩余", "value": "retryCnt", align: "center" },
                { "title": "耗时", "value": "runtime", align: "center" },
                { "title": "操作", "value": "action", "sortable": false, align: "center" },
            ],
        };
    },
    mounted() {
        this.fetchData();
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
                : this.ods.filter(wo => Object.values(wo).join("").toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1);
            return result;
        },
        doAction(val, comp) {
            // clear item
            this.item = "";
            if (comp == "FieldsCompare") {
                axios.get('/maintable/ods/fieldCompare/' + val.tid).then(res => {
                    this.item = res.data;
                })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (comp == 'CmdList') {
                axios.get('/maintable/ods/cmdList/' + val.tid).then(res => {
                    this.item = res.data;
                })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (comp == 'TableUsed') {
                axios.get('/maintable/ods/tableUsed', {
                    params: {
                        tablename: val.destOwner + '.' + val.destTablename,
                        sysId: val.sysid
                    }
                }).then(res => { this.item = res.data; });
            } else if (comp == 'AddaxResult') {
                axios.get('/maintable/ods/addaxResult/' + val.spname)
                    .then(res => { this.item = res.data });
            } else if (comp == "LogFiles1") {
                // 命令日志
                axios.get("/log/logFiles/" + val.spname)
                    .then(res => { this.item = res.data; return res.data });
                comp = "LogFiles";
            } else if (comp == "LogFiles2") {
                // 调度日志
                axios.get("/log/logFiles/" + "tuna_sp_etl_" + val.tid)
                    .then(res => { this.item = res.data; return res.data });
                comp = "LogFiles";
            }
            else {
                this.item = val;
            }
            this.dynamicComponent = comp;
            // console.log(this.item);
        },

        getContent(f) {
            axios.get("/log/logFileContent", {
                params: {
                    f: f
                }
            })
                .then(res => { fContent.value = res.data; return res.data; });
        },
        doEtl(ctype) {
            axios.post("/maintable/ods/startEtl", {
                "ctype": ctype
            }).then(res => alert("启动成功"))
                .catch(res => alert("启动失败" + res))

        }
        // mainTableInfo(d) {
        //     this.$router.push({ path: '/maintable/ods/info', query: { id: d.id } });
        // }
    },
    components: { MainTableInfo, FieldsCompare, CmdList, TableUsed, AddaxResult, BatchAdd, LogFiles }
}
</script>
<style></style>
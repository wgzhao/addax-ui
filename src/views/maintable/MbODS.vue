<template>
    <!-- 主表配置 -- ODS 采集配置-->
    <div class="row">
        <div class="col-6">
            <v-card flat title="主表配置 - ODS 采集配置">
                <template v-slot:text>
                    <v-row justify="center" align="center">
                        <v-col cols="col-4">
                            <v-text-field v-model="search" density="compact" label="Search"
                                prepend-inner-icon="mdi-magnify" single-line variant="outlined"
                                hide-details
                                @keyup.enter="searchOds"
                                @click:append-inner="searchOds"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn  variant="tonal" prepend-icon="mdi-plus"
                                @click="dynamicComponent = 'BatchAdd'">批量新增表</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn variant="tonal" prepend-icon="mdi-play" 
                                @click="doEtl('source')">启动表更新</v-btn>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn variant="tonal" prepend-icon="mdi-play"
                                @click="doEtl('sp')">启动采集</v-btn>
                        </v-col>
                    </v-row>
                </template>
                <v-card-text>
                    <v-data-table-server 
                        density="default" 
                        :items="ods" 
                        :headers="headers" 
                        v-model:item-per-page="itemsPerPage"
                        :items-length="totalItems"
                        item-value="name" 
                        :loading="loading"
                        @update:options="loadItems"
                        >
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
                    </v-data-table-server>
                </v-card-text>
            </v-card>
        </div>
        <div class="col-6">
            <component :is="tabs[dynamicComponent]" :d="item"></component>
        </div>
      <!-- action response -->
        <v-dialog v-model="alert.show" width="auto">
        <v-card>
            <v-toolbar :color="alert.color" :title="alert.title"></v-toolbar>
            <v-card-text><pre>{{ alert.text }}</pre></v-card-text>
        </v-card>
        </v-dialog>
     </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import OdsService from '@/service/odsService'
import LogService from '@/service/logService'
import MainTableInfo from '@/components/ods//MainTable.vue';
import FieldsCompare from '@/components/ods/FieldsCompare.vue';
import CmdList from '@/components/ods/CmdList.vue';
import TableUsed from '@/components/ods/TableUsed.vue';
import AddaxResult from '@/components/ods/AddaxResult.vue';
import BatchAdd from '@/components/ods/BatchAdd.vue';
import LogFiles from '@/components/ods/LogFiles.vue';

import {createSort} from '@/utils'
import { stringifyQuery } from 'vue-router';

const ods = ref([],)
const search = ref("")
const item = ref("")
const itemsPerPage = ref(10)
const totalItems = ref(0)
const loading = ref(true)
const dynamicComponent = ref(null)
const tabs = {
    MainTableInfo,
    FieldsCompare,
    CmdList,
    TableUsed,
    AddaxResult,
    BatchAdd,
    LogFiles,
}
const selectOptions = [
    { text: "主表信息", value: "MainTableInfo" },
    { text: "字段对比", value: "FieldsCompare" },
    { text: "命令列表", value: "CmdList" },
    { text: "使用场景", value: "TableUsed" },
    { text: "addax结果", value: "AddaxResult" },
    { text: "命令日志", value: "LogFiles1" },
    { text: "调度日志", value: "LogFiles2" },
]
const headers =  [
    { "title": "目标用户", "align": "center", "sortable": false, "value": "destOwner", sort: "asc" },
    { "title": "系统名称", "value": "sysName", align: "center" },
    { "title": "源用户", "value": "souOwner", align: "center", sort: "asc" },
    { "title": "目标表名", "value": "destTablename", align: "center", sort: "asc" },
    { "title": "状态", "value": "flag", align: "center" },
    { "title": "剩余", "value": "retryCnt", align: "center" },
    { "title": "耗时", "value": "runtime", align: "center" },
    { "title": "操作", "value": "action", "sortable": false, align: "center" },
]
const alert = ref({show: false,color: "",icon: "",text: ""})

const doAction = (val, comp) => {
    // clear item
    item.value = "";
    console.log("invoke " + comp);
    if (comp == "FieldsCompare") {
        OdsService.fetchFieldsCompare(val.tid)
        .then(res => {
            item.value = res.data;
        })
        .catch(err => {
                console.log(err);
        });

    } else if (comp == 'CmdList') {
        OdsService.fetchCmdList(val.tid)
        .then(res => {
            item.value = res.data;
        })
        .catch(err => {
            console.log(err);
        });
    } else if (comp == 'TableUsed') {
        OdsService.fetchTableUsed(val.destOwner + '.' + val.destTablename,
                val.sysid).then(res => { item.value = res.data; });
    } else if (comp == 'AddaxResult') {
        OdsService.fetchAddaxResult(val.spname)
            .then(res => { item.value = res.data });
    } else if (comp == "LogFiles1") {
        // 命令日志
        LogService.getLogFiles(val.spname)
            .then(res => { item.value = res.data; return res.data });
        comp = "LogFiles";
    } else if (comp == "LogFiles2") {
        // 调度日志
        LogService.getLogFiles("tuna_sp_etl_" + val.tid)
            .then(res => { item.value = res.data; return res.data });
        comp = "LogFiles";
    }
    else {
        item.value = val;
    }
    console.log("change dynamic component to " + comp);
    dynamicComponent.value = comp;
}

const doEtl = (ctype) =>  {
    axios.post("/maintable/ods/startEtl", {
        "ctype": ctype
    }).then(res => {
        alert.value.show = true;
        alert.value.color = "success";
        alert.value.icon = "mdi-check-circle";
        alert.value.title = "启动成功";
        alert.value.text = res.data;
    } )
    .catch(res => {
        alert.value.show = true;
        alert.value.color = "error";
        alert.value.icon = "mdi-alert-circle";
        alert.value.title = "启动失败";
        alert.value.text = res.data;
    })

}
const loadItems =  ({page, itemsPerPage, sortBy}) => {
    loading.value = true;
    // const sort = createSort(sortBy)
    OdsService.fetchOdsList(page -1, itemsPerPage, search.value).then(res => {
        ods.value = res.data["content"];
        totalItems.value = res.data["totalPages"];
        loading.value = false;
    });
    
}

const searchOds = () => {
    loadItems({page: 0, itemsPerPage: itemsPerPage.value, sortBy: null});
}
</script>
<style></style>
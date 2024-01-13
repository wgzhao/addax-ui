<template>
    <!-- 数据服务推送表详情 -->
    <v-card flat title="推送表--新版">
        <v-data-table :items="data" :headers="dsHeaders" density="compact" loading-text="Loading......">
            <template v-slot:item.actions="{ item }">
                <div class="btn-group-sm" role="group" arial-label="Actions">
                    <template v-for="(act, idx) in actions">
                        <button type="button" class="btn btn-outline-primary" @click="doAction(item, idx)">{{ act.title
                        }}</button>
                    </template>
                </div>
            </template>
        </v-data-table>
    </v-card>
    <!-- Dialog -->
    <!-- 字段-->
    <v-dialog v-model="dialog[0]">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-data-table-virtual
                    :headers="fieldsHeaders"
                    :items = "childData"
                    height="400"
                    density="compact"
                >
                </v-data-table-virtual>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" block @click="dialog[0] = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- json -->
    <v-dialog v-model="dialog[1]" width="auto">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <HighCode lang="json"  height="400"  font-size="0.9rem" 
                    :copy="false" :codeValue="childData">
                </HighCode>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" block @click="dialog[1] = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- 日志 -->
    <v-dialog v-model="dialog[2]" persistent width="auto">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <ul>
                <template v-for="f in childData">
                <li><a href="#" @click="getContent(f)">{{ f }}</a></li>
                </template>
                </ul>
                <v-spacer></v-spacer>
                <!-- file content-->
                <div v-if="fContent">
                    <pre>{{ fContent }}</pre>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" block @click="dialog[2] = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>
<script setup>
import { ref, onMounted } from 'vue'
import {HighCode} from 'vue-highlight-code'
import 'vue-highlight-code/dist/style.css'
import axios from 'axios';
const props = defineProps(['d'])
const dialog = ref([false, false, false,false])
const formTitle = ref("")
const data = ref([])
const apiPrefix = ref("/maintable/dataService/")

const dsHeaders = ref([
    { title: "ID", value: "tblId", width: "2%" },
    { title: "目标库用户", value: "destOwner" },
    { title: "目标库表名", value: "destTablename" },
    { title: "源库的表或查询脚本", value: "souTable" },
    { title: "源筛选条件(trino置空筛选logdate)", value: "souFilter", width: "10%" },
    { title: "前置SQL", value: "preSql" },
    { title: "后置SQL", value: "postSql" },
    { title: "额外的字段映射<br>(多个字段用;分隔)", value: "colMap", width: "10%" },
    { title: "状态", value: "flag" },
    { title: "hdp", value: "souIshdp" },
    { title: "开始时间", value: "startTime" },
    { title: "结束时间", value: "endTime" },
    { title: "配置信息", value: "actions", width: "10%" }
])
const actions = ref([
    { title: "字段", type: "fields", comp: "DSTableFields", api: "dsTableFields/" },
    { title: "JSON", type: "jobConf", comp: "JobConf", api: "jobConf/" },
    { title: "日志", type: "logFiles", comp: "LogFiles", api: "logFiles/" },
])

const fetchData = () => {
    axios.get(apiPrefix.value + 'dsTable/' + props.d)
        .then(res => { data.value = res.data; return res.data; });
}

onMounted(() => {
    fetchData()
})
const childData = ref([])
const fContent = ref(null)
// 字段对比相关信息
const fieldsHeaders = ref([
        {
            title: "目标表", value: "", align: "center", children: [
                { title: "字段名", key: "COLUMN_NAME" },
                { title: "字段类型", key: "DATA_TYPE" },
                { title: "字段长度", key: "DATA_LENGTH" },
                { title: "数值型长度", key: "DATA_PRECISION" },
                { title: "数值型精度", key: "DATA_SCALE" },
            ]
        },
        {
            title: "源表", value: "", align: "center", children: [
                { title: "字段名", key: "COL_NAME" },
                { title: "字段类型", key: "COL_TYPE" },
            ]
        }
    ])
// actions
const doAction = (item, idx) => {
    if (idx == 0) {
        formTitle.value = item.destTablename + " 字段对比"
        axios.get(apiPrefix.value + actions.value[idx].api + item.tblId)
            .then(res => { childData.value = res.data; return res.data; });
    } else if (idx == 1) {
        formTitle.value = item.destTablename + "  的采集任务配置"
        childData.value = item.dsJson
    } else if (idx == 2) {
        let spName = "tuna_addax_" + item.destTablename;
        formTitle.value =  spName + " 的运行日志" 
        axios.get("/log/" + actions.value[idx].api + "tuna_addax_" + item.tblId)
            .then(res => {childData.value = res.data; return res.data});
    }
    dialog.value[idx] = true;
    // dialog.value = true

}

const getContent = (f) => {
    axios.get("/log" + "logFileContent", {
        params: {
            f: f
        }
        })
        .then(res => { fContent.value = res.data; return res.data; });
}
</script>
<style></style>
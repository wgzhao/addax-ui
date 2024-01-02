<template>
    <!-- 主表配置 -- ODS 采集配置-->
    <div class="row">
        <div class="col-12">
            <v-card flat title="主表配置 -- ODS 采集配置">

                <template v-slot:text>
                    <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line
                        variant="outlined" hide-details></v-text-field>

                    <v-select :items="selectOptions" density="compact" label="操作" item-title="text" item-value="value"
                        return-object v-model="select">
                    </v-select>



                </template>
                <v-data-table 
                    density="compact" 
                    :items="ods" 
                    :headers="headers" 
                    item-value="name" 
                    :search="search"
                    hover="true">
                    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                        <tr>
                            <td :colspan="columns.length">
                                <VBtn size="small" variant="text" @click="toggleGroup(item)"
                                    :icon="isGroupOpen ? '$expand' : '$next'"></VBtn>
                                {{ item.value }}
                            </td>
                        </tr>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <!-- add link for selectOption -->
                        <template v-for="l in selectOptions">
                            <v-btn class="m-1 p-0 btn btn-outline-primary" @click="doAction(item, l.value)">
                            {{ l.text }}
                            </v-btn>
                        </template>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </div>
    <div class="row">
            <component :is="dynamicComponent" :d="item"></component>
            <!-- <MainTableInfo v-if="showFlag['mainTableInfo']" :d="item"></MainTableInfo>
            <FieldsCompare v-if="showFlag['fieldsCompare']" :d="item"></FieldsCompare> -->
    </div>
</template>

<script>
import axios from 'axios';
import MainTableInfo from '@/components/ods//MainTable.vue';
import FieldsCompare from '@/components/ods/FieldsCompare.vue';
import CmdList from '@/components/ods/CmdList.vue';

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
                { text: "使用场景", value: "usage" },
                { text: "datax结果", value: "dataxResult" },
                { text: "命令日志", value: "cmdLog" },
                { text: "调度日志", value: "scheduleLog" },
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
                {
                    "title": "目标用户",
                    "align": "start",
                    "sortable": false,
                    "value": "destOwner"
                },
                { "title": "系统名称", "value": "sysName" },
                { "title": "源用户", "value": "souOwner" },
                { "title": "目标表名", "value": "destTablename" },
                { "title": "状态", "value": "flag" },
                { "title": "剩余", "value": "retryCnt" },
                { "title": "耗时", "value": "runtime" },
                { "title": "操作", "value": "action", "sortable": false },
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
            }else if (comp == 'CmdList') {
                axios.get('/maintable/ods/cmdList/' + val.tid).then(res => {
                    this.item = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
            }
             else {
                this.item = val;
            }
            this.dynamicComponent = comp;
            // console.log(this.item);
        }
        // mainTableInfo(d) {
        //     this.$router.push({ path: '/maintable/ods/info', query: { id: d.id } });
        // }
    },
    components: {MainTableInfo, FieldsCompare, CmdList }
}
</script>
<style></style>
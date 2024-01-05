<template>
    <div class="row h-75">
        <v-card>
            <v-tabs v-model="tab" bg-color="info">
                <template v-for="(val, idx) in headers">
                <v-tab :value="idx">{{ val.title}}</v-tab>
                </template>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <template v-for="(val, idx) in headers">
                      <v-window-item :value="idx">
                        <v-data-table density="compact" v-if="val.data" :items="val.data" :headers="val.headers"></v-data-table>
                    </v-window-item>
                    </template>
                </v-window>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Demo',
    data() {
        return {
            tab: null,
            data: [
                {
                    name: "one",
                    headers: [
                        {
                            title: 'Dessert (100g serving)',
                            align: 'start',
                            sortable: false,
                            key: 'name',
                        },
                        { title: 'Calories', key: 'calories', align: 'end' },
                        { title: 'Fat (g)', key: 'fat', align: 'end' },
                        { title: 'Carbs (g)', key: 'carbs', align: 'end' },
                        { title: 'Protein (g)', key: 'protein', align: 'end' },
                        { title: 'Iron (%)', key: 'iron', align: 'end' }
                    ],
                    data: [
                        {
                            name: 'Frozen Yogurt',
                            calories: 159,
                            fat: 6.0,
                            carbs: 24,
                            protein: 4.0,
                            iron: '1',
                        },
                        {
                            name: 'Jelly bean',
                            calories: 375,
                            fat: 0.0,
                            carbs: 94,
                            protein: 0.0,
                            iron: '0',
                        },
                        {
                            name: 'KitKat',
                            calories: 518,
                            fat: 26.0,
                            carbs: 65,
                            protein: 7,
                            iron: '6',
                        },
                        {
                            name: 'Eclair',
                            calories: 262,
                            fat: 16.0,
                            carbs: 23,
                            protein: 6.0,
                            iron: '7',
                        }]
                },
                {
                    name: "two",
                    headers: [{title: "name", key: "name"}, {title: "spcies", key: "spcies"}, {title: "diet", key: "diet"}, {title: "habitat", key: "habitat"}],
                    data: [
                        {
                            name: 'African Elephant',
                            species: 'Loxodonta africana',
                            diet: 'Herbivore',
                            habitat: 'Savanna, Forests',
                        },
                        {
                            name: 'African Elephant',
                            species: 'Loxodonta africana',
                            diet: 'Herbivore',
                            habitat: 'Savanna, Forests',
                        },
                        {
                            name: 'African Elephant',
                            species: 'Loxodonta africana',
                            diet: 'Herbivore',
                            habitat: 'Savanna, Forests',
                        },
                    ]
                }
            ],

            headers:  [{
                    name: "totalExec",
                    api: "totalExec",
                    title: "生成任务组的任务",
                    data: [],
                    headers: [
                        { title: "任务组", key: "taskGroup" },
                        { title: "所属类别", key: "kind" },
                        { title: "存在标志", key: "bflag" },
                        { title: "标志生成时间", key: "flagTime" },
                        { title: "总数", key: "allcnt" },
                        {
                            title: "运行成功的任务情况", value: "", children: [
                                { title: "任务数", key: "ycnt" },
                                { title: "开始时间", key: "startTime" },
                                { title: "结束时间", key: "endTime" },
                                { title: "运行耗时", key: "runtime" },
                            ]
                        },
                        {
                            title: "正在执行的任务情况", value: "", children: [
                                { title: "正在执行", key: "rcnt" },
                                { title: "开始时间", key: "startTimeR" },
                            ]
                        },
                        {
                            title: "其他任务数", value: "", children: [
                                { title: "未执行", key: "ncnt" },
                                { title: "执行失败", key: "ecnt" }
                            ]
                        },
                    ]
                },
                {
                    name: "totalExecsMore",
                    api: "totalExec",
                    title: "任务组调起的后续服务",
                    data: [],
                    headers: [
                        {title: "类别", key: "kind2"},
                        {title: "类别", key: "dsName"},
                        {title: "任务执行情况", value: "", children: [
                            {title: "执行状态", key: "flag2"},
                            {title: "开始时间", key: "startTime2"},
                            {title: "结束时间", key: "endTime2"}
                        ]},
                        {title: "错误提醒", key: "errmsg"},
                    ]
                },
                {
                    name: "flagGenTimes",
                    api: "flagGenTimes",
                    title: "任务组生成时间",
                    data: [],
                    headers: [
                        {title: "任务组", key: "fid"},
                        {title: "生成时间", key: "dwCltDate"}
                    ]
                },
                {
                    name: "dataServiceExecTime",
                    api: "dataServiceExecTime",
                    title: "数据服务执行情况",
                    data: [],
                    headers: [
                        {title: "任务组", key: "TASK_GROUP"},
                        {title: "服务名称", key: "DS_NAME"},
                        {title: "开始时间", key: "START_TIME"},
                        {title: "结束时间", key: "END_TIME"},
                        {title: "耗时", key: "RUNTIME"},
                        {title: "完成率", key: "PREC"},
                        {title: "正在推送的表", key: "DEST_TABLENAME"},
                    ]
                },
                {
                    name: "dataServiceExecTimeout",
                    api: "dataServiceExecTimeout",
                    title: "数据服务执行时间超长",
                    data: [],
                    headers: [
                        {title: "类别", key: "KIND"},
                        {title: "名称", key: "DS_NAME"},
                        {title: "开始时间", key: "START_TIME"},
                        {title: "结束时间", key: "END_TIME"},
                        {title: "耗时", key: "RUNTIME"},
                    ]
                },
                {
                    name: "targetComplete",
                    api: "targetComplete",
                    title: "按照目标系统的任务完成情况",
                    data: [],
                    headers: [
                        {title: "系统名称", key: "DEST_SYSNAME"},
                        {title: "总任务数", key: "TOTAL_CNT"},
                        {title: "今日任务", key: "TD_TASK"},
                        {title: "已完成数", key: "TD_OK"},
                        {title: "错误数", key: "TD_ERR"},
                    ]
                }
            ]
        }
    },
    mounted() {
        // this.fetchData();
    },
    watch: {
        tab(val) {
            if ( ! this.headers[val].data.length > 0)  {
            const url = '/taskGroup/' + this.headers[val].api
            axios.get(url).then(res => {this.headers[val].data = res.data});
            } else {
                console.log("has data");
            }
        }
    },
    methods: {
    }
}
</script>
<style></style>
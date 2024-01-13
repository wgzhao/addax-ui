<template>
    <!-- 命令列表 -->
    <v-card flat title="命令列表">
        <div v-if="d.length == 0">无数据</div>
        <div v-else>
            <v-data-table 
                :headers="headers" 
                :items="d" 
                density="compact"
                v-model:expanded="expanded"
                show-expand
                item-value="comText"
                >

            <template v-slot:item.flag="{ value }">
                <v-chip :color="getColor(value)">{{ value }}</v-chip>
            </template>
            <template v-slot:expanded-row="{columns, item}">
            <tr>
                <td :colspan="columns.length">
                    <HighCode :lang="item.comKind == 'addax' ? 'json': 'sql'" height="400"
                    :copy="false" :codeValue="item.comText">
                </HighCode>
                </td>
            </tr>
            </template>
            </v-data-table>
        </div>
    </v-card>
</template>
<script>
import {HighCode} from 'vue-highlight-code'
import 'vue-highlight-code/dist/style.css'
export default {
    name: 'CmdList',
    props: ['d'],
    data() {
        return {
            expanded: [],
            headers: [
                { title: "执行顺序", key: "comIdx" },
                { title: "命令类型", key: "comKind" },
                { title: "执行开始时间", key: "startTime" },
                { title: "执行结束时间", key: "endTime" },
                { title: "状态", key: "flag" },
                { title: "操作", key: "" },
                { title: "", key: 'data-table-expand'},
            ]
        }
    },
    methods: {
        getColor(flag) {
            if (flag == "Y") {
                return "green"
            } else if (flag == "N") {
                return "red"
            } else {
                return "blue"
            }
        },
    },
    components: {
        HighCode
    }
}
</script>
<style></style>
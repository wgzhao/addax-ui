<template>
    <!-- 命令列表 -->
    <v-card density="compact" >
        <v-card-title>
            HADOOP存储过程  {{   props.header }}    的命令执行列表
        </v-card-title>
        <v-card-text>
            <v-data-table-virtual  :items=" props.form " :headers=" headers " density="compact" :expanded="expanded"
                show-expand >
                <template v-slot:expanded-row="{columns, item}">
                    <tr>
                        <td :colspan=" columns.length ">
                            <HighCode lang="sql"  theme="light" height="400"  font-size="0.9rem" :copy="false" :codeValue="item.comText">
                            </HighCode>
                        </td>
                    </tr>
                </template>
            </v-data-table-virtual>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref } from 'vue'
import {HighCode} from 'vue-highlight-code'
import 'vue-highlight-code/dist/style.css'

const props = defineProps(['form', 'header'])
const expanded = ref([])
const headers = ref([
    { title: "执行顺序", key: "comIdx" },
    { title: "命令类型", key: "comKind" },
    { title: "执行开始时间", key: "startTime" },
    { title: "执行结束时间", key: "endTime" },
    { title: "状态", key: "flag" },
    { title: "", key: "data-table-expand" }
])
</script>
<style></style>
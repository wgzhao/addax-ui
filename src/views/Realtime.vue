<template>
    <!-- 其他实时 -->
    <div class="v-row">
        <div class="v-col col-12">
            <v-card flat title="计划任务执行情况" class="justify-center">
                <v-card-text>
                    <v-data-table :items="planAll" :headers="headers" items-per-page="20" density="compact"
                        color="cyan-lighten-3">
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import axios from 'axios'

const planAll = ref([])
const headers =  [
    { title: "计划类型", key: "pnTypeName" },
    { title: "计划名称", key: "spname" },
    {
        title: "命令列表", value: "", align: "center",
        children: [
            { title: "CMD1", key: "c1" },
            { title: "CMD2", key: "c2" },
            { title: "CMD3", key: "c3" },
            { title: "CMD4", key: "c4" },
            { title: "CMD5", key: "c5" },
            { title: "CMD6", key: "c6" },
        ]
    }
]
     
 axios.get('/realtime/planAll').then(res => {planAll.value = res.data});

</script>
<style></style>
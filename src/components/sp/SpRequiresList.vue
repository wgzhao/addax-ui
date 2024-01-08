<template>
    <v-card title="直接前置依赖执行情况">
        <v-card-text>
            <v-data-table
                :items="props.form"
                :headers="headers"
                disable-pagination
                
                >
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script setup>
import {ref} from 'vue'
const props = defineProps(['form', 'header','need'])
const headers = ref([
    {title: "编号", key: "NEEDS"},
    {title: "名称", key: "NEEDS_NAME"},
    {title: "状态", key: "NEEDS_FLAG"},
    {title: "结束时间", key: "NEEDS_END_TIME"},
])

</script>
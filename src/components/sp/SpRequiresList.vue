<template>
    <v-card title="直接前置依赖执行情况">
        <v-card-text>
            <v-data-table-virtual
                :items="data"
                :headers="headers"
                >
            </v-data-table-virtual>
        </v-card-text>
    </v-card>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import SpService from '@/service/spService'
const props = defineProps(['spId'])
const headers = ref([
    {title: "编号", key: "NEEDS"},
    {title: "名称", key: "NEEDS_NAME"},
    {title: "状态", key: "NEEDS_FLAG"},
    {title: "结束时间", key: "NEEDS_END_TIME"},
])
const data = ref([])
const fetchData = () => {
    SpService.fetchSpPrequires(props.spId).then(res => data.value = res.data);
}
onMounted(() => {
    fetchData()
})
</script>
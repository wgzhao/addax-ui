<template>
<!-- 根据 SPNAME 获取 Addax 最近15条采集信息 -->
<v-card flat title="按照名称显示最近15条记录">
<v-data-table-virtual v-if="d"
    :items="d"
    :headers = "headers"
    density="compact"
    class="elevation-1"
    >
</v-data-table-virtual>

</v-card>
</template>
<script>
export default {
    name: 'AddaxResult',
    props: ['d'],
    data() {
        return {
            headers: [
            { title: "日期", value: "startDay"},
            { title: "名称", value: "spname"},
            { title: "任务开始时间", value: "startTime"},
            { title: "任务结束时间", value: "endTime"},
            { title: "运行耗时", value: "runtime"},
            { title: "速度（字节）", value: "byteSpeed"},
            { title: "速度（行）", value: "recSpeed"},
            { title: "总记录数", value: "totalRec"},
            { title: "错误记录数", value: "totalErr"},
            ],
        }
    }
}
</script>
<style>
    
</style>
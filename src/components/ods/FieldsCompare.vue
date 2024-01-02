<template>
    <!-- 字段对比 -->
    <v-card flat title="字段对比">
        <div v-if="d.length == 0">无数据</div>
        <div v-else>
        <v-data-table
            :headers="headers"
            :items="d"
            density="compact">
        </v-data-table>
            </div>
    </v-card>
</template>
<script>
export default {
    props: ['d'],
    data() {
        return {
            data: this.d,
            headers: [
                {
                    title:"序号",
                    value: "IDX"
                },
                {
                    title: "目标表",
                    align: "center",
                    children: [
                        { title: "字段名", value: "COL_NAME"},
                        { title: "字段类型", value: "COL_TYPE_FULL"},
                        { title: "字段备注", value: "COL_COMMENT"},
                        { title: "表备注", value: "TBL_COMMENT"},
                    ]
                },
                {
                    title: "源表",
                    align: "center",
                    children: [
                        {title: "字段名", value: "COLUMN_NAME_ORIG"},
                        {title: "字段类型", value: "DATA_TYPE"},
                        {title: "字段长度", value: "DATA_LENGTH"},
                        {title: "数值长度", value: "DATA_PRECISION"},
                        {title: "数值精度", value: "DATA_SCALE"},
                        {title: "字段备注", value: "COLUMN_COMMENT"},
                        {title: "表备注", value: "TABLE_COMMENT"},
                    ]
                },
                {
                    title: "映射信息",
                    align: "center",
                    children: [
                        {title: "映射类型", value: "DEST_TYPE"},
                        {title: "完整类型", value: "DEST_TYPE_FULL"},
                    ]

                }
            ],
        }
    },
}
</script>
<style>
</style>
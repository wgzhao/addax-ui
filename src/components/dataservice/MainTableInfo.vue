<template>
    <!-- 数据服务主表配置--新版-->
   <v-card flat title="数据服务主表配置--新版">
    <v-form fast-fail @submit.prevent>
            <v-container>
                <v-row  no-gutters>
                    <v-col cols="12" md="3" class="m-0">
                        <v-text-field v-model="d.dsId" label="数据服务编号"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.bupdate" label="是否更新表结构"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.taskGroup" label="任务组"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.destSysid" label="目标库系统编号"></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.destOwner" label="目标表所在用户"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.colMap" label="额外的字段映射"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.flag" label="运行状态"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.retryCnt" label="错误重试次数"></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.paramSou" label="参数组"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.paralNum" label="执行并发数"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.runFreq" label="运行频率"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.maxRuntime" label="允许最长耗时"></v-text-field>
                    </v-col>
                </v-row>


                <v-row  no-gutters>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.pnType" label="计划类型"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.pnInterval" label="计划间隔时间"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.pnRange" label="计划间隔时间范围"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.pnFixed" label="计划定点时间"></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.realtimeFixed" label="实时定点"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.preSql" class="code" label="推送前执行SQL"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.postSql" class="code" label="推送成功执行SQL"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.prewSqlNew" class="code" label="推送前实际SQL"></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.postSqlNew" label="推送成功实际SQL"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.preSh" label="推送前执行shell"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.postSh" label="推送成功执行shell"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.startTime" label="运行开始时间"></v-text-field>
                    </v-col>
                </v-row>

                <v-row  no-gutters>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.endTime" label="运行结束时间"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="d.runtime" label="运行耗时"></v-text-field>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col cols="12" md="12">
                        <v-textarea v-model="d.needs" class="code" label="涉及源表"></v-textarea>
                    </v-col>
                    </v-row>
                    <v-row no-gutters>
                    <v-col cols="12" md="12">
                        <v-textarea v-model="d.remark" label="备注信息"></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        </v-card>
</template>
<script>
export default {
    name: 'MainTableInfo',
    props: ['d']
    
}
</script>
<style>
    
</style>
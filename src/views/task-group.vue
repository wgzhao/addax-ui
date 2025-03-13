<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="gray">
      <template v-for="(val, idx) in headers">
        <v-tab :value="idx">
          <v-icon color="gray" start icon="mdi-dialpad"></v-icon>
          {{ val.title }}
        </v-tab>
      </template>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <template v-for="(val, idx) in headers">
          <v-window-item :value="idx">
            <div class="v-row">
              <div class="v-col v-col-12">
                <v-data-table
                  density="compact"
                  v-if="data[val.name].length > 0"
                  :items="data[val.name]"
                  :headers="val.headers"
                  items-per-page="20"
                  hover
                  no-data-text="暂无数据"
                ></v-data-table>
              </div>
            </div>
          </v-window-item>
        </template>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup>
  import { ref, watchEffect } from 'vue'
  import TaskGroupService from '@/service/taskGroupService'

  const tab = ref(0)
  const data = ref({
    totalExec: [],
    totalExecsMore: [],
    flagGenTimes: [],
    dataServiceExecTime: [],
    dataServiceExecTimeout: [],
    targetComplete: []
  })
  const headers = [
    {
      name: 'totalExec',
      api: 'totalExec',
      title: '生成任务组的任务',
      headers: [
        { title: '任务组', key: 'taskGroup' },
        { title: '所属类别', key: 'kind' },
        { title: '存在标志', key: 'bflag' },
        { title: '标志生成时间', key: 'flagTime' },
        { title: '总数', key: 'allcnt' },
        {
          title: '运行成功的任务情况',
          value: '',
          align: 'center',
          children: [
            { title: '任务数', key: 'ycnt' },
            { title: '开始时间', key: 'startTime' },
            { title: '结束时间', key: 'endTime' },
            { title: '运行耗时', key: 'runtime' }
          ]
        },
        {
          title: '正在执行的任务情况',
          value: '',
          align: 'center',
          children: [
            { title: '正在执行', key: 'rcnt' },
            { title: '开始时间', key: 'startTimeR' }
          ]
        },
        {
          title: '其他任务数',
          value: '',
          align: 'center',
          children: [
            { title: '未执行', key: 'ncnt' },
            { title: '执行失败', key: 'ecnt' }
          ]
        }
      ]
    },
    {
      name: 'totalExecsMore',
      api: 'totalExec',
      title: '任务组调起的后续服务',
      headers: [
        { title: '类别', key: 'kind2' },
        { title: '类别', key: 'dsName' },
        {
          title: '任务执行情况',
          value: '',
          align: 'center',
          children: [
            { title: '执行状态', key: 'flag2' },
            { title: '开始时间', key: 'startTime2' },
            { title: '结束时间', key: 'endTime2' }
          ]
        },
        { title: '错误提醒', key: 'errmsg' }
      ]
    },
    {
      name: 'flagGenTimes',
      api: 'flagGenTime',
      title: '任务组生成时间',
      headers: [
        { title: '任务组', key: 'fid' },
        { title: '生成时间', key: 'dwCltDate' }
      ]
    },
    {
      name: 'dataServiceExecTime',
      api: 'dataServiceExecTime',
      title: '数据服务执行情况',
      headers: [
        { title: '任务组', key: 'TASK_GROUP' },
        { title: '服务名称', key: 'DS_NAME' },
        { title: '开始时间', key: 'START_TIME' },
        { title: '结束时间', key: 'END_TIME' },
        { title: '耗时', key: 'RUNTIME' },
        { title: '完成率', key: 'PREC' },
        { title: '正在推送的表', key: 'DEST_TABLENAME' }
      ]
    },
    {
      name: 'dataServiceExecTimeout',
      api: 'dataServiceExecTimeout',
      title: '数据服务执行时间超长',
      headers: [
        { title: '类别', key: 'KIND' },
        { title: '名称', key: 'DS_NAME' },
        { title: '开始时间', key: 'START_TIME' },
        { title: '结束时间', key: 'END_TIME' },
        { title: '耗时', key: 'RUNTIME' }
      ]
    },
    {
      name: 'targetComplete',
      api: 'targetComplete',
      title: '按照目标系统的任务完成情况',
      headers: [
        { title: '系统名称', key: 'DEST_SYSNAME' },
        { title: '总任务数', key: 'TOTAL_CNT' },
        { title: '今日任务', key: 'TD_TASK' },
        { title: '已完成数', key: 'TD_OK' },
        { title: '错误数', key: 'TD_ERR' }
      ]
    }
  ]

  watchEffect(async () => {
    TaskGroupService.fetchTotalExec().then((res) => {
      data.value['totalExec'] = res.data
      data.value['totalExecsMore'] = res.data
    })

    TaskGroupService.fetchFlagGenTime().then((res) => {
      data.value['flagGenTimes'] = res.data
    })

    TaskGroupService.fetchDataServiceExecTime().then((res) => {
      data.value['dataServiceExecTime'] = res.data
    })

    TaskGroupService.fetchDataServiceExecTimeout().then((res) => {
      data.value['dataServiceExecTimeout'] = res.data
    })

    TaskGroupService.fetchTargetComplete().then((res) => {
      data.value['targetComplete'] = res.data
    })
  })
</script>
<style></style>

<template>
  <v-container fluid class="pa-6">
    <v-row dense>
      <!-- 数据源完成情况（占用全宽） -->
      <v-col cols="12">
        <v-card flat :title="headers[0].title" class="mb-4">
          <v-card-text>
            <v-data-table :items="data.accomplishList" :headers="headers[0].headers" density="compact"
              :sort-by="headers[0].sortBy" class="elevation-1" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 特殊任务提醒和采集拒绝行信息（左右分栏） -->
      <v-col cols="12" md="6">
        <v-card flat :title="headers[1].title" class="mb-4">
          <v-card-text>
            <v-data-table :items="data.specialTask" :headers="headers[1].headers" density="compact"
              :sort-by="headers[1].sortBy" class="elevation-1" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat :title="headers[2].title" class="mb-4">
          <v-card-text>
            <v-data-table :items="data.rejectTask" :headers="headers[2].headers" density="compact"
              :sort-by="headers[2].sortBy" class="elevation-1" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 日间实时采集任务（占用全宽） -->
      <v-col cols="12">
        <v-card flat :title="headers[3].title">
          <v-card-text>
            <v-data-table :items="data.realtimeTask" :headers="headers[3].headers" density="compact"
              :sort-by="headers[3].sortBy" class="elevation-1" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { monitorService } from '@/service/monitorService'

const data = ref({
  accomplishList: [],
  specialTask: [],
  rejectTask: [],
  realtimeTask: []
})

const headers = [
  {
    name: 'accomplishList',
    api: 'accomplishList',
    title: '数据源完成情况',
    sortBy: [{ key: 'overPrec', order: 'asc' }],
    headers: [
      {
        title: '启动',
        key: 'dbStart',
        value: (item) => {
          if (!item.dbStart) return '-'
          const strValue = String(item.dbStart)

          // Single digit (e.g., 7 → 07:00)
          if (strValue.length === 1) {
            return `0${strValue}:00`
          }
          // Two digits (e.g., 12 → 12:00)
          else if (strValue.length === 2) {
            return `${strValue}:00`
          }
          // Three digits (e.g., 120 → 01:20)
          else if (strValue.length === 3) {
            return `0${strValue.charAt(0)}:${strValue.substring(1)}`
          }
          // Four digits (e.g., 2203 → 22:03)
          else if (strValue.length === 4) {
            return `${strValue.substring(0, 2)}:${strValue.substring(2)}`
          }

          return item.dbStart
        }
      },
      { title: '数据源', key: 'sysname' },
      {
        title: '整体情况',
        align: 'center',
        value: '',
        children: [
          { title: '总数', key: 'totalCnt' },
          { title: '完成数', key: 'overCnt' },
          {
            title: '完成率',
            key: 'overPrec',
            value: (item) => `${Math.round(item.overPrec * 100)}%`,
            cellProps: ({ value }) => ({
              class: value === '100%' ? 'text-success' : 'text-warning'
            })
          },
          { title: '运行', key: 'runCnt' },
          { title: '错误', key: 'errCnt' },
          { title: '未执行', key: 'noCnt' },
          { title: '未建表', key: 'waitCnt' }
        ]
      },
      {
        title: 'T-1 日',
        align: 'center',
        value: '',
        children: [
          { title: '开始时间', key: 'startTimeLtd' },
          { title: '结束时间', key: 'endTimeLtd' },
          { title: '耗时(秒)', key: 'runtimeLtd' }
        ]
      },
      {
        title: 'T 日',
        align: 'center',
        value: '',
        children: [
          { title: '开始时间', key: 'startTimeTd' },
          { title: '结束时间', key: 'endTimeTd' },
          { title: '耗时', key: 'runtimeTd' }
        ]
      }
    ]
  },
  {
    name: 'specialTask',
    api: 'specialTask',
    title: '特殊任务提醒：错误、耗时过长、有重试、有拒绝行',
    sortBy: [{ key: 'RUNTIME', order: 'desc' }],
    headers: [
      { title: '任务名', key: 'SPNAME' },
      { title: '状态', key: 'FLAG' },
      { title: '剩余', key: 'RETRY_CNT' },
      {
        title: '耗时',
        key: 'RUNTIME',
        cellProps: ({ value }) => ({
          class: value > 1000 ? 'text-warning' : ''
        })
      },
      { title: '开始时间', key: 'START_TIME' },
      { title: '结束时间', key: 'END_TIME' }
    ]
  },
  {
    name: 'rejectTask',
    api: 'rejectTask',
    title: '采集拒绝行信息',
    sortBy: [{ key: 'totalErr', order: 'desc' }],
    headers: [
      { title: '任务名称', key: 'jobname' },
      { title: '拒绝行', key: 'totalErr' },
      { title: '开始时间', key: 'startTs' },
      { title: '结束时间', key: 'endTs' }
    ]
  },
  {
    name: 'realtimeTask',
    api: 'realtimeTask',
    title: '日间实时采集任务执行情况(最近1小时)',
    sortBy: [],
    headers: [
      { title: '最近一次', key: 'LAST_TIMES' },
      { title: '下一次', key: 'NEXT_TIMES' },
      { title: '任务名称', key: 'SPNAME' },
      { title: '开始时间', key: 'START_TIME' },
      { title: '结束时间', key: 'END_TIME' }
    ]
  }
]

const getData = async () => {
  try {
    const [accomplishList, specialTask, rejectTask, realtimeTask] = await Promise.all([
      monitorService.fetchAccomplishList(),
      monitorService.fetchSpecialTask(),
      monitorService.fetchRejectTask(),
      monitorService.fetchRealtimeTask()
    ])
    data.value.accomplishList = accomplishList.data
    data.value.specialTask = specialTask.data
    data.value.rejectTask = rejectTask.data
    data.value.realtimeTask = realtimeTask.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getData()
})
</script>

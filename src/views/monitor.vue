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

    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { monitorService } from '@/service/monitor-service'

const data = ref({
  accomplishList: [],
  specialTask: [],
  rejectTask: [],
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
        key: 'start_at',
      },
      { title: '数据源', key: 'sys_name' },
      {
        title: '整体情况',
        align: 'center',
        value: '',
        children: [
          { title: '总数', key: 'total_cnt' },
          { title: '完成数', key: 'succ_cnt' },
          {
            title: '完成率',
            key: 'overPrec',
            value: (item) => `${Math.round(item.succ_cnt / item.total_cnt * 100)}%`,
            cellProps: ({ value }) => ({
              class: value === '100%' ? 'text-success' : 'text-warning'
            })
          },
          { title: '运行', key: 'run_cnt' },
          { title: '错误', key: 'fail_cnt' },
          { title: '未执行', key: 'no_run_cnt' },
          { title: '未建表', key: 'no_create_table_cnt' }
        ]
      },
      {
        title: 'T-1 日',
        align: 'center',
        value: '',
        children: [
          { title: '开始时间', key: 'y_begin_at' },
          { title: '结束时间', key: 'y_finish_at' },
          { title: '耗时(秒)', key: 'y_take_secs' }
        ]
      },
      {
        title: 'T 日',
        align: 'center',
        value: '',
        children: [
          { title: '开始时间', key: 't_begin_at' },
          { title: '结束时间', key: 't_finish_at' },
          { title: '耗时', key: 't_take_secs' }
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
  }
]

const getData = async () => {
  try {
    const [accomplishList, specialTask, rejectTask] = await Promise.all([
      monitorService.fetchAccomplishList(),
      monitorService.fetchSpecialTask(),
      monitorService.fetchRejectTask(),
    ])
    data.value.accomplishList = accomplishList.data
    data.value.specialTask = specialTask.data
    data.value.rejectTask = rejectTask.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getData()
})
</script>

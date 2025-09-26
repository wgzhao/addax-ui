<template>
  <v-data-table
    :items="data"
    :headers="headers"
    density="compact"
    :sort-by="[{ key: 'pnType', order: 'asc' }]"
  >
    <template v-slot:item.pnType="{ value }">
      {{ getType(value) }}
    </template>
    <template v-slot:item.flag="{ value }">
      <v-chip :color="getColor(value)">{{ value }}</v-chip>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
  import type { DataTableHeader } from 'vuetify'
  import Requests from '@/utils/requests'
  import { onMounted, ref } from 'vue'

  const headers: DataTableHeader[] = [
    { title: '计划任务', key: 'pnType' },
    { title: '时间定点', key: 'pnFixed' },
    { title: '执行间隔（分钟）', key: 'pnInterval' },
    { title: '间隔时间范围', key: 'pnRange' },
    { title: '状态', key: 'flag' },
    { title: '符合', key: 'bexit' },
    { title: '执行开始时间', key: 'startTime' },
    { title: '执行结束时间', key: 'endTime' },
    { title: '耗时', key: 'runtime' },
    { title: '操作', key: '', value: 'actions' }
  ]
  const data = ref()

  function getType(val: number) {
    if (val == 0) {
      return '每天'
    }
    if (val == 2) {
      return '交易当天'
    }
    if (val == 3) {
      return '交易日或标志'
    }
    return val
  }

  function getColor(flag: string) {
    if (flag == 'Y') {
      return 'green'
    } else if (flag == 'N') {
      return 'red'
    } else {
      return 'blue'
    }
  }

  onMounted(() => {
    Requests.get('/plan/list').then((res) => {
      data.value = res.data
    })
  })
</script>
<route lang="json">
{
  "meta": {
    "title": "计划任务",
    "icon": "mdi-calendar-clock",
    "requiresAuth": true
  }
}
</route>
<style></style>

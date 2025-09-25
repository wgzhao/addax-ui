<template>
  <v-data-table
    :items="tasks"
    :headers="headers"
    item-value="id"
    density="compact"
    :loading="loading"
  >
    <template v-slot:item.action="{ item }">
      <v-btn small color="primary" @click="$emit('executeTask', item.id)">采集</v-btn>
      <!-- 可扩展更多任务相关操作按钮 -->
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
const props = defineProps<{ tasks: any[] }>()
const loading = ref(false)
const headers = [
  { title: '任务ID', key: 'id', align: 'center', width: '10%' },
  { title: '表名', key: 'tableName', align: 'center', width: '20%' },
  { title: '状态', key: 'status', align: 'center', width: '10%' },
  { title: '采集时间', key: 'collectTime', align: 'center', width: '20%' },
  { title: '操作', key: 'action', align: 'center', width: '20%' }
]
</script>

<style scoped>
</style>

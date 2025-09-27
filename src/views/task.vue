<template>
  <v-card flat title="采集任务管理">
    <v-card-text>
      <!-- 采集任务列表与操作区 -->
      <TaskList :tasks="tasks" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import TaskList from '@/components/task/TaskList.vue'
  import taskCenter from '@/stores/task-center'

  // 任务中心 Store 的任务列表
  const tasks = computed(() => taskCenter.tasks.value)


</script>

<route lang="json">
{
  "meta": {
    "title": "采集任务管理",
    "icon": "mdi-database-cog",
    "requiresAuth": true
  }
}
</route>

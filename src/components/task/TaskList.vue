<template>
  <v-row align="center" class="mb-2">
    <v-btn icon @click="refreshTaskStatus" :loading="loading" class="ml-2" title="手动刷新">
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-row>
  <v-data-table :items="taskStatus" :headers="headers" item-value="id" density="compact" :loading="loading">
    <template v-slot:item.status="{ item }">
      <v-chip
        :color="getStatusColor(item.status)"
        size="small"
        class="font-weight-bold"
        text-color="white"
      >
        {{ getStatusText(item.status) }}
      </v-chip>
    </template>
    <template v-slot:item.progress="{ item }">
      <v-progress-linear
        :model-value="parseProgress(item.progress)"
        height="16"
        color="primary"
        striped
        rounded
        style="min-width: 80px"
      >
        <template #default>
          <span style="font-size: 12px; color: #333">{{ parseProgress(item.progress) }}%</span>
        </template>
      </v-progress-linear>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn small color="primary" @click="$emit('executeTask', item.id)">采集</v-btn>
      <!-- 可扩展更多任务相关操作按钮 -->
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import taskService from '@/service/task-service';
import { ref, watch, defineProps, onMounted, onUnmounted } from 'vue'
import type { DataTableHeader } from 'vuetify'
// const props = defineProps<{ tasks: any[] }>()
const loading = ref(false)
const headers: DataTableHeader[] = [
  { title: '任务ID', key: 'id', align: 'center', width: '10%' },
  { title: '表名', key: 'tbl', align: 'center', width: '20%' },
  { title: '状态', key: 'status', align: 'center', width: '10%' },
  { title: '采集时间', key: 'start_time', align: 'center', width: '20%' },
  { title: ' 进展', key: 'progress', align: 'center', width: '20%' }
]


const taskStatus = ref<any[]>([])

let localTimer: any = null

function refreshTaskStatus() {
  loading.value = true
  taskService.getAllTaskStatus().then((res) => {
    const oldList = taskStatus.value
    const newList = Array.isArray(res) ? res : []
    const oldMap = new Map<string, any>()
    oldList.forEach((item, idx) => oldMap.set(item.id, { item, idx }))
    // 记录需要追加的新任务
    const toAdd: any[] = []
    newList.forEach(newItem => {
      const found = oldMap.get(newItem.id)
      if (found && found.item) {
        // 只用后端进度覆盖本地进度
        found.item.progress = newItem.progress
      } else {
        toAdd.push(newItem)
      }
    })
    if (toAdd.length > 0) {
      oldList.splice(oldList.length, 0, ...toAdd)
    }
    loading.value = false
  })
}


function startLocalProgress() {
  if (localTimer) clearInterval(localTimer)
  localTimer = setInterval(() => {
    taskStatus.value.forEach(item => {
      // 只对运行中且进度小于100的任务做本地推进
      if (item.status === 'R' && parseProgress(item.progress) < 100) {
        // 每次推进1-2%，可根据需要调整
        let next = parseProgress(item.progress) + Math.floor(Math.random() * 2) + 1
        if (next > 100) next = 100
        item.progress = next
      }
    })
  }, 200)
}


onMounted(() => {
  refreshTaskStatus()
  startLocalProgress()
})




onUnmounted(() => {
  if (localTimer) clearInterval(localTimer)
})

function getStatusColor(status: string) {
  if (status === 'E') return 'red'
  if (status === 'R') return 'blue'
  if (status === 'W') return 'orange'
  return 'grey'
}
function getStatusText(status: string) {
  if (status === 'E') return '错误'
  if (status === 'R') return '运行中'
  if (status === 'W') return '等待'
  return status
}
function parseProgress(progress: any) {
  // 支持字符串或数字
  if (typeof progress === 'string') {
    const num = parseInt(progress)
    return isNaN(num) ? 0 : num
  }
  if (typeof progress === 'number') return progress
  return 0
}

</script>

<style scoped></style>

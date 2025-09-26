<template>
  <v-card flat title="采集任务管理">
    <v-card-text>
      <!-- 采集任务列表与操作区 -->
      <TaskList :tasks="tasks" @executeTask="handleExecuteTask" />
      <TaskEtlProgress
        v-model:visible="etlProgressVisible"
        :title="etlProgressTitle"
        :message="etlProgressMessage"
        :inProgress="etlInProgress"
        :results="etlResults"
        :currentProcessingInfo="currentProcessingInfo"
        @close="closeEtlProgress"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import taskService from '@/service/task-service'
  import { notify } from '@/stores/notifier'
  import TaskList from '@/components/task/TaskList.vue'
  import TaskEtlProgress from '@/components/task/TaskEtlProgress.vue'

  const tasks = ref([])
  const etlProgressVisible = ref(false)
  const etlInProgress = ref(false)
  const etlProgressTitle = ref('')
  const etlProgressMessage = ref('')
  const currentProcessingInfo = ref('')
  const etlResults = ref([])

  function handleExecuteTask(taskId: number) {
    showEtlProgress('手工采集', '正在执行采集任务...')
    updateEtlProgress('正在执行采集任务...', `处理任务: ${taskId}`)
    taskService
      .executeTask(taskId, 300000)
      .then(() => {
        addEtlResult(`任务 ${taskId} 采集成功`, true)
        updateEtlProgress('采集完成')
        finishEtlProgress()
      })
      .catch((res) => {
        const errorMsg = res || '未知错误'
        addEtlResult(`任务 ${taskId} 采集失败: ${errorMsg}`, false)
        updateEtlProgress('采集失败')
        finishEtlProgress()
      })
  }

  function showEtlProgress(title: string, message: string) {
    etlProgressTitle.value = title
    etlProgressMessage.value = message
    etlInProgress.value = true
    etlResults.value = []
    currentProcessingInfo.value = ''
    etlProgressVisible.value = true
  }

  function updateEtlProgress(message: string, processingInfo?: string) {
    etlProgressMessage.value = message
    if (processingInfo) {
      currentProcessingInfo.value = processingInfo
    }
  }

  function addEtlResult(message: string, success: boolean) {
    etlResults.value.push({ message, success })
  }

  function finishEtlProgress() {
    etlInProgress.value = false
    currentProcessingInfo.value = ''
  }

  function closeEtlProgress() {
    etlProgressVisible.value = false
    etlInProgress.value = false
    etlResults.value = []
    etlProgressTitle.value = ''
    etlProgressMessage.value = ''
    currentProcessingInfo.value = ''
  }
</script>

<style scoped>
  /* 可根据实际需求补充样式 */
</style>

<template>
  <!-- 其他实时 -->
  <div class="v-row">
    <div class="v-col col-12">
      <v-card flat title="计划任务执行情况" class="justify-center">
        <v-card-text>
          <v-data-table
            :items="planAll"
            :headers="headers"
            items-per-page="20"
            density="compact"
            color="cyan-lighten-3"
          ></v-data-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import RealtimeService from '@/service/realtimeService'

  const planAll = ref([])
  const headers = [
    { title: '计划类型', value: 'pnTypeName' },
    { title: '计划名称', value: 'spname' },
    {
      title: '命令列表',
      value: '',
      align: 'center' as const,
      children: [
        { title: 'CMD1', value: 'c1' },
        { title: 'CMD2', value: 'c2' },
        { title: 'CMD3', value: 'c3' },
        { title: 'CMD4', value: 'c4' },
        { title: 'CMD5', value: 'c5' },
        { title: 'CMD6', value: 'c6' }
      ]
    }
  ]

  onMounted(() => {
    RealtimeService.fetchPlanAll().then((res) => (planAll.value = res.data))
  })
</script>
<style></style>

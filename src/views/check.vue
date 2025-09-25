<template>
  <!-- 盘后检查 -->
  <v-card title="采集表记录数异常">
    <v-card-text>
      <v-data-table density="compact" :headers="headers" :items="abnormalRecord"></v-data-table>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import closeCheckService from '@/service/close-check-service'

  const abnormalRecord = ref([])
  const headers = [
    { title: '异常级别', value: 'ERR_KIND' },
    { title: '表名', value: 'TBLNAME' },
    { title: 'T-1记录数', value: 'CNT_LTD' },
    { title: 'T日记录数', value: 'CNT_TD' },
    { title: '记录比对差额', value: 'CNT_ERR' }
  ]

  onMounted(() => {
    closeCheckService.fetchAbnormalRecord().then((res) => {
      abnormalRecord.value = res.data
    })
  })
</script>
<style></style>

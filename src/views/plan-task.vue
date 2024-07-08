<template>
  <!-- 计划任务 -->
  <v-data-table :items="data" :headers="headers" density="compact">
  </v-data-table>
</template>
<script setup lang="ts">
import { ref } from "vue";

const headers = [
  { key: "runFreq", title: "频率", width: "5%" },
  { key: "flag", title: "状态", width: "5%" },
  { key: "spName", title: "SP 名称", width: "20%" },
  { key: "startTime", title: "开始时间", width: "10%" },
  { key: "endTime", title: "结束时间", width: "10%" },
  { key: "runtime", title: "耗时(秒)", width: "5%" },
  { key: "actions", title: "操作", value: "" }
];
const options = {
  response: true,
  select: false,
  paging: true,
  searching: true,
  info: true,
  lengthChange: true,
  pageLength: 10,
  lengthMenu: [
    [10, 25, 50, -1],
    [10, 25, 50, "All"]
  ],
  buttons: ["copy", "excel", "pdf"],
  dom: "Bfrltip"
};

const data = ref();
</script>

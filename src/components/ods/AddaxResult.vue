<template>
  <!-- 根据 SPNAME 获取 Addax 最近15条采集信息 -->
  <dialog-comp title="按照名称显示最近15条记录" v-model="dialog">
    <v-data-table-virtual v-if="d" :items="d" :headers="headers" density="compact" class="elevation-1">
    </v-data-table-virtual>
  </dialog-comp>
</template>
<script setup lang="ts">
import { ref } from "vue";
import DialogComp from './DialogComp.vue'

defineProps(["d"]);
const dialog = defineModel({ required: true, default: true })

const headers = ref([
  { title: "日期", value: "startDay" },
  { title: "名称", value: "spname" },
  { title: "任务开始时间", value: "startTime" },
  { title: "任务结束时间", value: "endTime" },
  { title: "运行耗时", value: "runtime" },
  { title: "速度（字节）", value: "byteSpeed" },
  { title: "速度（行）", value: "recSpeed" },
  { title: "总记录数", value: "totalRec" },
  { title: "错误记录数", value: "totalErr" },
]);
</script>
<style>
</style>

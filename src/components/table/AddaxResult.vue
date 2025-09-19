<template>
  <!-- 根据 SPNAME 获取 Addax 最近15条采集信息 -->
  <!-- <dialog-comp title="按照名称显示最近15条记录" v-model="dialog"> -->
  <v-data-table-virtual v-if="tid" :items="results" :headers="headers" density="compact" class="elevation-1">
  </v-data-table-virtual>
  <!-- </dialog-comp> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import DialogComp from "./DialogComp.vue";
import OdsService from "@/service/tableService";

const props = defineProps({ tid: String });

// const dialog = defineModel({ required: true, default: true });

const headers = [
  { title: "日期", value: "runDate" },
  { title: "任务开始时间", value: "startAt" },
  { title: "任务结束时间", value: "endAt" },
  { title: "运行耗时", value: "takeSecs" },
  { title: "字节/秒", value: "byteSpeed" },
  { title: "行/秒", value: "recSpeed" },
  { title: "总记录数", value: "totalRecs" },
  { title: "错误记录数", value: "totalErrors" }
];

const results = ref([]);

onMounted(() => {
  OdsService.fetchAddaxResult(props.tid).then(res => {
    results.value = res.data;
  });
});
</script>
<style></style>

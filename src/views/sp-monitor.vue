<template>
  <!-- SP 监控页面 -->
  <template v-for="d in data">
    <div class="v-row">
      <div class="v-col v-col-12 mt-2 mb-2">
        <v-card :title="d.title">
          <v-card-text>
            <v-data-table
              :items="d.data"
              :headers="d.headers"
              density="default"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </template>
</template>
<script setup>
import { ref, onUnmounted } from "vue";
import SpMonitorService from "@/service/spMonitorService";

const data = ref([
  {
    name: "validChkSp",
    title: "SP计算的有效性检测结果",
    data: [],
    headers: [
      { title: "SP名称", key: "procName", align: "center" },
      { title: "检测日期", key: "logdate" },
      { title: "检测结果", key: "remark" },
      { title: "检测时间", key: "updtDate" }
    ]
  },
  {
    name: "pipeline",
    title: "SP计算相关流水",
    data: [],
    headers: [
      { title: "发生时间", key: "tradeDate" },
      { title: "类别", key: "kind" },
      { title: "主键", key: "keyId" },
      { title: "备注", key: "remark" }
    ]
  },
  {
    name: "totalExec",
    title: "SP整体执行情况",
    data: [],
    headers: [
      { title: "SP用户", key: "SP_OWNER" },
      { title: "状态", key: "FLAG" },
      { title: "任务数量", key: "CNT" },
      { title: "开始时间", key: "START_TIME" },
      { title: "结束时间", key: "END_TIME" },
      { title: "运行耗时", key: "RUN_TIME" }
    ]
  },
  {
    name: "errorTasks",
    api: "errorTasks",
    title: "特殊任务：报错、重跑",
    data: [],
    headers: [
      { title: "状态", key: "SPNAME" },
      { title: "剩余次数", key: "FLAG" },
      {
        title: "开始时间",
        key: "RETRY_CNT",
        cellProps: ({ value }) => ({ class: value > 0 ? "bg-warning" : "" })
      },
      { title: "结束时间", key: "START_TIME" },
      { title: "前置数据源", key: "END_TIME" },
      { title: "运行频率", key: "RUN_FREQ" }
    ]
  }
]);

const initData = () => {
  SpMonitorService.fetchValidChkSp().then(res => {
    data.value[0].data = res;
  });
  SpMonitorService.fetchPipeline().then(res => {
    data.value[1].data = res;
  });
  SpMonitorService.fetchTotalExec().then(res => {
    data.value[2].data = res;
  });
  SpMonitorService.fetchErrorTasks().then(res => {
    data.value[3].data = res;
  });
};

initData();

const timer = setInterval(() => {
  fetchData();
}, 1000 * 60);

onUnmounted(() => {
  clearInterval(timer);
});
</script>
<style></style>

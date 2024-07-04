<template>
  <!-- 命令列表 -->
  <v-card density="compact">
    <v-card-title> HADOOP存储过程 的命令执行列表 </v-card-title>
    <v-card-text>
      <v-data-table-virtual
        :items="data"
        :headers="headers"
        density="compact"
        :expanded="expanded"
        show-expand
      >
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <HighCode
                lang="sql"
                height="400"
                font-size="0.9rem"
                :copy="false"
                :codeValue="item.comText"
              >
              </HighCode>
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { spService } from "@/service/spService";
import { HighCode } from "vue-highlight-code";
import "vue-highlight-code/dist/style.css";

const props = defineProps(["spId"]);
const expanded = ref([]);
const headers = ref([
  { title: "执行顺序", key: "comIdx" },
  { title: "命令类型", key: "comKind" },
  { title: "执行开始时间", key: "startTime" },
  { title: "执行结束时间", key: "endTime" },
  { title: "状态", key: "flag" },
  { title: "", key: "data-table-expand" }
]);
const data = ref();

const fetchData = () => {
  spService.fetchSpCmdList(props.spId).then(res => (data.value = res.data));
};

onMounted(() => {
  console.log("fetch data......");
  fetchData();
});
</script>
<style></style>

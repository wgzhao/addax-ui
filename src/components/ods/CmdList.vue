<template>
  <!-- 命令列表 -->
  <dialog-comp title="命令列表" v-model="dialog">
    <v-data-table
      :headers="headers"
      :items="cmds"
      density="compact"
      no-data-text="无数据"
      v-model:expanded="expanded"
      show-expand
      item-value="comText"
      hide-default-footer
    >
      <template v-slot:item.flag="{ value }">
        <v-chip :color="getColor(value)">{{ value }}</v-chip>
      </template>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <highlightjs
              :language="item.comKind === 'addax' ? 'json' : 'sql'"
              height="400"
              :copy="false"
              :code="item.comText"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </dialog-comp>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import OdsService from "@/service/maintable/odsService";
import DialogComp from "./DialogComp.vue";

const dialog = defineModel({ required: true, default: true });
const props = defineProps(["d"]);
interface Item {
  comIdx: number;
  comKind: string;
  startTime: string;
  endTime: string;
  flag: string;
  comText: string;
}

const cmds = ref<Item[]>();
const expanded = ref([]);
const headers = [
  { title: "执行顺序", key: "comIdx" },
  { title: "命令类型", key: "comKind" },
  { title: "执行开始时间", key: "startTime" },
  { title: "执行结束时间", key: "endTime" },
  { title: "状态", key: "flag" },
  { title: "操作", key: "" },
  { title: "", key: "data-table-expand" }
];

function getColor(flag: string) {
  if (flag === "Y") {
    return "green";
  } else if (flag === "N") {
    return "red";
  } else {
    return "blue";
  }
}

onMounted(() => {
  OdsService.fetchCmdList(props.d)
    .then(res => {
      cmds.value = res.data;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>
<style></style>

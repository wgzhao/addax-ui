<template>
  <!-- 字段对比 -->
  <!-- <dialog-comp title="字段对比" v-model="dialog"> -->
  <v-data-table :headers="headers" :items="fields" hide-default-footer density="compact" no-data-text="无数据">
    <template v-slot:item="{ item }">
      <tr>
        <td rowspan="3">{{ item.idx }}</td>
      </tr>
      <tr class="bg-gray">
        <td>源表</td>
        <td>{{ item.column_name_orig }}</td>
        <td>{{ item.data_type }}</td>
        <td>{{ item.data_length }}</td>
        <td>{{ item.data_precision }}</td>
        <td>{{ item.data_scale }}</td>
        <td>{{ item.column_comment }}</td>
        <td>{{ item.table_comment }}</td>
      </tr>
      <tr class="bg-gray-500">
        <td>目标表</td>
        <td>{{ item.col_name }}</td>
        <td>{{ item.col_type_full }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{ item.col_comment }}</td>
        <td>{{ item.tbl_comment }}</td>
      </tr>
    </template>
  </v-data-table>
  <!-- </dialog-comp> -->
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import OdsService from "@/service/maintable/odsService";
// import DialogComp from "./DialogComp.vue";

const props = defineProps({ tid: String });

interface Item {
  idx: number;
  column_name_orig: string;
  data_type: string;
  data_length: number;
  data_precision: number;
  data_scale: number;
  column_comment: string;
  table_comment: string;
  col_name: string;
  col_type_full: string;
  col_comment: string;
  tbl_comment: string;
}
const fields = ref<Item>();

const headers = ref([
  { title: "序号", key: "idx" },
  { title: "表来源", key: "" },
  { title: "字段名", key: "column_name_orig" },
  { title: "字段类型", key: "data_type" },
  { title: "字段长度", key: "data_length" },
  { title: "数值长度", key: "data_precision" },
  { title: "数值精度", key: "data_scale" },
  { title: "字段备注", key: "column_comment" },
  { title: "表备注", key: "table_comment" }
]);

const headers1 = ref([
  {
    title: "序号",
    value: "idx"
  },
  {
    title: "目标表",
    align: "center",
    children: [
      { title: "字段名", value: "col_name" },
      { title: "字段类型", value: "col_type_full" },
      { title: "字段备注", value: "col_comment" },
      { title: "表备注", value: "tbl_comment" }
    ]
  },
  {
    title: "源表",
    align: "center",
    children: [
      { title: "字段名", value: "column_name_orig" },
      { title: "字段类型", value: "data_type" },
      { title: "字段长度", value: "data_length" },
      { title: "数值长度", value: "data_precision" },
      { title: "数值精度", value: "data_scale" },
      { title: "字段备注", value: "column_comment" },
      { title: "表备注", value: "table_comment" }
    ]
  }
  // {
  //     title: "映射信息",
  //     align: "center",
  //     children: [
  //         {title: "映射类型", value: "DEST_TYPE"},
  //         {title: "完整类型", value: "DEST_TYPE_FULL"},
  //     ]

  // }
]);
onMounted(() => {
  OdsService.fetchFieldsCompare(props.tid)
    .then(res => {
      fields.value = res.data;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>
<style></style>

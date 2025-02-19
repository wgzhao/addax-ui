<template>
  <!-- 字段对比 -->
  <!-- <dialog-comp title="字段对比" v-model="dialog"> -->
    <v-data-table
      :headers="headers"
      :items="fields"
      hide-default-footer
      density="compact"
      no-data-text="无数据"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td rowspan="3">{{ item.IDX }}</td>
        </tr>
        <tr class="bg-gray">
          <td>源表</td>
          <td>{{ item.COLUMN_NAME_ORIG }}</td>
          <td>{{ item.DATA_TYPE }}</td>
          <td>{{ item.DATA_LENGTH }}</td>
          <td>{{ item.DATA_PRECISION }}</td>
          <td>{{ item.DATA_SCALE }}</td>
          <td>{{ item.COLUMN_COMMENT }}</td>
          <td>{{ item.TABLE_COMMENT }}</td>
        </tr>
        <tr class="bg-gray-500">
          <td>目标表</td>
          <td>{{ item.COL_NAME }}</td>
          <td>{{ item.COL_TYPE_FULL }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ item.COL_COMMENT }}</td>
          <td>{{ item.TBL_COMMENT }}</td>
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
  IDX: number;
  COLUMN_NAME_ORIG: string;
  DATA_TYPE: string;
  DATA_LENGTH: number;
  DATA_PRECISION: number;
  DATA_SCALE: number;
  COLUMN_COMMENT: string;
  TABLE_COMMENT: string;
  COL_NAME: string;
  COL_TYPE_FULL: string;
  COL_COMMENT: string;
  TBL_COMMENT: string;
}
const fields = ref<Item>();

const headers = ref([
  { title: "序号", key: "IDX" },
  { title: "表来源", key: "" },
  { title: "字段名", key: "COLUMN_NAME_ORIG" },
  { title: "字段类型", key: "DATA_TYPE" },
  { title: "字段长度", key: "DATA_LENGTH" },
  { title: "数值长度", key: "DATA_PRECISION" },
  { title: "数值精度", key: "DATA_SCALE" },
  { title: "字段备注", key: "COLUMN_COMMENT" },
  { title: "表备注", key: "TABLE_COMMENT" }
]);

const headers1 = ref([
  {
    title: "序号",
    value: "IDX"
  },
  {
    title: "目标表",
    align: "center",
    children: [
      { title: "字段名", value: "COL_NAME" },
      { title: "字段类型", value: "COL_TYPE_FULL" },
      { title: "字段备注", value: "COL_COMMENT" },
      { title: "表备注", value: "TBL_COMMENT" }
    ]
  },
  {
    title: "源表",
    align: "center",
    children: [
      { title: "字段名", value: "COLUMN_NAME_ORIG" },
      { title: "字段类型", value: "DATA_TYPE" },
      { title: "字段长度", value: "DATA_LENGTH" },
      { title: "数值长度", value: "DATA_PRECISION" },
      { title: "数值精度", value: "DATA_SCALE" },
      { title: "字段备注", value: "COLUMN_COMMENT" },
      { title: "表备注", value: "TABLE_COMMENT" }
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
      fields.value = res;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>
<style></style>

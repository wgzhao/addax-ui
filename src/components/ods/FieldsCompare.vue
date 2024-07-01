<template>
  <!-- 字段对比 -->
  <v-dialog min-width="800" v-model="dialog">
    <v-card>
      <v-list-item class="px-6" height="88">
        <template #title>
          字段对比
        </template>
        <template #append>
          <v-btn class="text-none" color="primary" text="close" variant="text"
                 @click="dialog=false"></v-btn>
        </template>
      </v-list-item>
      <v-card-text>
        <div v-if="d.length === 0">无数据</div>
        <div v-else>
          <v-data-table :headers="headers" :items="d" density="compact">
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
              <tr class="bg-secondary">
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
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps(["d"]);

const dialog = defineModel({ required: true, default: true });

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
</script>
<style></style>

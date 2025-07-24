<template>
  <!-- 推送表字段详情-->

  <v-data-table-virtual :headers="headers" height="400"> </v-data-table-virtual>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

const props = defineProps(["param"]);
const data = ref([]);
const headers = ref([
  {
    title: "目标表",
    value: "",
    align: "center",
    children: [
      { title: "字段名", key: "column_name" },
      { title: "字段类型", key: "data_type" },
      { title: "字段长度", key: "data_length" },
      { title: "数值型长度", key: "data_precision" },
      { title: "数值型精度", key: "data_scale" }
    ]
  },
  {
    title: "源表",
    value: "",
    align: "center",
    children: [
      { title: "字段名", key: "COL_NAME" },
      { title: "字段类型", key: "COL_TYPE" }
    ]
  }
]);
const fetchData = () => {
  axios.get("/maintable/dataService/dsTableFields/" + props.param).then(res => {
    data.value = res.data;
    return res;
  });
};

onMounted(() => {
  fetchData();
});
</script>
<style></style>

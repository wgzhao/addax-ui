<template>
  <!-- 推送表字段详情-->

  <v-data-table-virtual :headers="headers" height="400"> </v-data-table-virtual>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const props = defineProps(["param"]);
const data = ref([]);
const dialog = ref(true);
const headers = ref([
  {
    title: "目标表",
    value: "",
    align: "center",
    children: [
      { title: "字段名", key: "COLUMN_NAME" },
      { title: "字段类型", key: "DATA_TYPE" },
      { title: "字段长度", key: "DATA_LENGTH" },
      { title: "数值型长度", key: "DATA_PRECISION" },
      { title: "数值型精度", key: "DATA_SCALE" },
    ],
  },
  {
    title: "源表",
    value: "",
    align: "center",
    children: [
      { title: "字段名", key: "COL_NAME" },
      { title: "字段类型", key: "COL_TYPE" },
    ],
  },
]);
const fetchData = () => {
  axios
    .get("/maintable/dataService/dsTableFields/" + props.param)
    .then((res) => {
      data.value = res.data;
      return res.data;
    });
};

onMounted(() => {
  fetchData();
});
</script>
<style></style>
